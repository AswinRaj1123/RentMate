import { Request, Response } from 'express';
import Property, { IProperty } from '../models/property.model';
import User, { UserRole } from '../models/user.model';
import mongoose from 'mongoose';

// Create a new property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const { 
      title, description, propertyType, address, price, 
      size, bedrooms, bathrooms, amenities, availableFrom, shareable 
    } = req.body;

    // Check if user exists and is a landlord
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== UserRole.LANDLORD && user.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'Only landlords can create property listings' });
    }

    // Process uploaded images if any
    const images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      (req.files as Express.Multer.File[]).forEach(file => {
        images.push(`/uploads/properties/${file.filename}`);
      });
    }

    // Create property
    const property = await Property.create({
      title,
      description,
      propertyType,
      owner: req.userId,
      address,
      price,
      size,
      bedrooms,
      bathrooms,
      amenities: amenities || [],
      images,
      availableFrom: new Date(availableFrom),
      shareable: shareable || false
    });

    res.status(201).json({
      success: true,
      property
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create property',
      error: error.message
    });
  }
};

// Get all properties with filtering and pagination
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const {
      city, state, minPrice, maxPrice, bedrooms, bathrooms,
      propertyType, available, sortBy, order, page = 1, limit = 10, shareable
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (city) filter['address.city'] = new RegExp(city as string, 'i');
    if (state) filter['address.state'] = new RegExp(state as string, 'i');
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);
    if (propertyType) filter.propertyType = propertyType;
    if (available === 'true') filter.isAvailable = true;
    if (shareable === 'true') filter.shareable = true;

    // Build sort options
    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }

    // Calculate pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const properties = await Property.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('owner', 'firstName lastName email');

    // Get total count for pagination info
    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      properties
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch properties',
      error: error.message
    });
  }
};

// Get a single property
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid property ID format' });
    }

    const property = await Property.findById(id)
      .populate('owner', 'firstName lastName email phoneNumber');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      success: true,
      property
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch property',
      error: error.message
    });
  }
};

// Update a property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid property ID format' });
    }

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Find property
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership or admin rights
    if (property.owner.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'You do not have permission to update this property' });
    }

    // Process new uploaded images if any
    let updatedImages = [...property.images];
    if (req.files && Array.isArray(req.files)) {
      (req.files as Express.Multer.File[]).forEach(file => {
        updatedImages.push(`/uploads/properties/${file.filename}`);
      });
    }

    // If client wants to remove specific images
    const { removeImages } = req.body;
    if (removeImages && Array.isArray(removeImages)) {
      updatedImages = updatedImages.filter(img => !removeImages.includes(img));
    }

    // Update property with new data
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: updatedImages,
        // Only admins can update these fields
        ...(req.userRole === UserRole.ADMIN ? {
          isVerified: req.body.isVerified,
          isPromoted: req.body.isPromoted
        } : {})
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      property: updatedProperty
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update property',
      error: error.message
    });
  }
};

// Delete a property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid property ID format' });
    }

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Find property
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership or admin rights
    if (property.owner.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'You do not have permission to delete this property' });
    }

    // Delete property
    await Property.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Property successfully deleted'
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to delete property',
      error: error.message
    });
  }
};
