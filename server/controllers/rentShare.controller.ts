import { Request, Response } from 'express';
import mongoose from 'mongoose';
import RentShare, { RentShareStatus } from '../models/rentShare.model';
import User, { UserRole } from '../models/user.model';

// Create a new rent share listing
export const createRentShare = async (req: Request, res: Response) => {
  try {
    const {
      property,
      preferences,
      description
    } = req.body;

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the rent share listing
    const rentShare = await RentShare.create({
      user: req.userId,
      property: property || null,
      preferences,
      description
    });

    res.status(201).json({
      success: true,
      rentShare
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create rent share listing',
      error: error.message
    });
  }
};

// Get all rent share listings with filtering and pagination
export const getAllRentShares = async (req: Request, res: Response) => {
  try {
    const {
      city, state, minPrice, maxPrice,
      moveInDateAfter, moveInDateBefore,
      status, page = 1, limit = 10
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (city) filter['preferences.location.city'] = new RegExp(city as string, 'i');
    if (state) filter['preferences.location.state'] = new RegExp(state as string, 'i');
    
    if (minPrice || maxPrice) {
      filter['preferences.priceRange'] = {};
      if (minPrice) filter['preferences.priceRange.min'] = { $gte: Number(minPrice) };
      if (maxPrice) filter['preferences.priceRange.max'] = { $lte: Number(maxPrice) };
    }

    if (moveInDateAfter || moveInDateBefore) {
      filter['preferences.moveInDate'] = {};
      if (moveInDateAfter) filter['preferences.moveInDate'].$gte = new Date(moveInDateAfter as string);
      if (moveInDateBefore) filter['preferences.moveInDate'].$lte = new Date(moveInDateBefore as string);
    }

    if (status) filter.status = status;

    // Calculate pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const rentShares = await RentShare.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'firstName lastName email')
      .populate('property', 'title address price images');

    // Get total count for pagination info
    const total = await RentShare.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: rentShares.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      rentShares
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch rent share listings',
      error: error.message
    });
  }
};

// Get a single rent share listing
export const getRentShareById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid rent share ID format' });
    }

    const rentShare = await RentShare.findById(id)
      .populate('user', 'firstName lastName email')
      .populate('property', 'title address price images')
      .populate('matches', 'user preferences description');

    if (!rentShare) {
      return res.status(404).json({ message: 'Rent share listing not found' });
    }

    res.status(200).json({
      success: true,
      rentShare
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch rent share listing',
      error: error.message
    });
  }
};

// Update a rent share listing
export const updateRentShare = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid rent share ID format' });
    }

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Find rent share listing
    const rentShare = await RentShare.findById(id);
    if (!rentShare) {
      return res.status(404).json({ message: 'Rent share listing not found' });
    }

    // Check ownership or admin rights
    if (rentShare.user.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'You do not have permission to update this listing' });
    }

    // Update rent share listing
    const updatedRentShare = await RentShare.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      rentShare: updatedRentShare
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update rent share listing',
      error: error.message
    });
  }
};

// Delete a rent share listing
export const deleteRentShare = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid rent share ID format' });
    }

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Find rent share listing
    const rentShare = await RentShare.findById(id);
    if (!rentShare) {
      return res.status(404).json({ message: 'Rent share listing not found' });
    }

    // Check ownership or admin rights
    if (rentShare.user.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'You do not have permission to delete this listing' });
    }

    // Delete rent share listing
    await RentShare.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Rent share listing successfully deleted'
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to delete rent share listing',
      error: error.message
    });
  }
};

// Find potential matches for a rent share listing
export const findMatches = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid rent share ID format' });
    }

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Find rent share listing
    const rentShare = await RentShare.findById(id);
    if (!rentShare) {
      return res.status(404).json({ message: 'Rent share listing not found' });
    }

    // Check ownership
    if (rentShare.user.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'You do not have permission to find matches for this listing' });
    }

    // Build query to find potential matches
    const query: any = {
      _id: { $ne: id }, // Exclude the current listing
      user: { $ne: req.userId }, // Exclude user's own listings
      status: RentShareStatus.LOOKING, // Only looking for matches
      'preferences.location.city': new RegExp(rentShare.preferences.location.city, 'i'),
      'preferences.location.state': new RegExp(rentShare.preferences.location.state, 'i'),
    };

    // Price range overlap
    query.$or = [
      { 
        'preferences.priceRange.min': { 
          $lte: rentShare.preferences.priceRange.max 
        },
        'preferences.priceRange.max': { 
          $gte: rentShare.preferences.priceRange.min 
        }
      }
    ];

    // Find potential matches
    const matches = await RentShare.find(query)
      .populate('user', 'firstName lastName email')
      .populate('property', 'title address price images');

    // Update the rent share listing with potential matches
    rentShare.matches = matches.map(match => match._id);
    await rentShare.save();

    res.status(200).json({
      success: true,
      matches
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to find matches',
      error: error.message
    });
  }
};
