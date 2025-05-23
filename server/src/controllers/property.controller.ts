import { Request, Response } from 'express';
import Property, { PropertyType } from '../models/property.model';
import { UserRole } from '../models/user.model';

/**
 * Create a new property
 * @route POST /api/properties
 * @access Private (Landlord only)
 */
export const createProperty = async (req: Request, res: Response) => {
  try {
    // Check if user is a landlord
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only landlords can create properties'
      });
    }

    const propertyData = {
      ...req.body,
      landlord: req.userId
    };

    // Handle images if they were uploaded
    if (req.files && Array.isArray(req.files)) {
      propertyData.images = req.files.map(
        (file: Express.Multer.File) => `/uploads/properties/${file.filename}`
      );
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all properties with filtering
 * @route GET /api/properties
 * @access Public
 */
export const getProperties = async (req: Request, res: Response) => {
  try {
    const {
      city,
      state,
      minRent,
      maxRent,
      bedrooms,
      bathrooms,
      propertyType,
      furnished,
      petFriendly,
      parking,
      availableFrom,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter: any = { isAvailable: true };

    if (city) filter.city = new RegExp(city as string, 'i');
    if (state) filter.state = new RegExp(state as string, 'i');
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };
    if (propertyType) filter.propertyType = propertyType;
    if (furnished) filter.furnished = furnished === 'true';
    if (petFriendly) filter.petFriendly = petFriendly === 'true';
    if (parking) filter.parking = parking === 'true';
    if (availableFrom)
      filter.availableFrom = { $lte: new Date(availableFrom as string) };

    // Handle rent range
    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(filter)
      .populate('landlord', 'name email')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limitNum),
      data: properties
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get a single property
 * @route GET /api/properties/:id
 * @access Public
 */
export const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'landlord',
      'name email phone'
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update a property
 * @route PUT /api/properties/:id
 * @access Private (Landlord only)
 */
export const updateProperty = async (req: Request, res: Response) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the landlord of this property or an admin
    if (
      property.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    const updateData = { ...req.body };

    // Handle images if they were uploaded
    if (req.files && Array.isArray(req.files)) {
      const newImages = req.files.map(
        (file: Express.Multer.File) => `/uploads/properties/${file.filename}`
      );
      
      // Append new images to existing ones
      updateData.images = [...property.images, ...newImages];
    }

    property = await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete a property
 * @route DELETE /api/properties/:id
 * @access Private (Landlord only)
 */
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the landlord of this property or an admin
    if (
      property.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get properties by landlord
 * @route GET /api/properties/landlord/:landlordId
 * @access Public
 */
export const getLandlordProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({
      landlord: req.params.landlordId,
      isAvailable: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get my properties (for landlords)
 * @route GET /api/properties/my-properties
 * @access Private (Landlord only)
 */
export const getMyProperties = async (req: Request, res: Response) => {
  try {
    // Check if user is a landlord
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only landlords can access this route'
      });
    }

    const properties = await Property.find({
      landlord: req.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};