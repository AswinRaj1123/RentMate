const { Property } = require('../models/property.model');
const { UserRole } = require('../models/user.model');

/**
 * Create a new property
 * @route POST /api/properties
 * @access Private (Landlord only)
 */
const createProperty = async (req, res) => {
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
        (file) => `/uploads/properties/${file.filename}`
      );
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all properties
 * @route GET /api/properties
 * @access Public
 */
const getProperties = async (req, res) => {
  try {
    // Initialize query object
    const queryObj = { isAvailable: true };

    // Filter by property type
    if (req.query.propertyType) {
      queryObj.propertyType = req.query.propertyType;
    }

    // Filter by city
    if (req.query.city) {
      queryObj.city = new RegExp(req.query.city, 'i');
    }

    // Filter by price range
    if (req.query.minRent || req.query.maxRent) {
      queryObj.rent = {};
      if (req.query.minRent) queryObj.rent.$gte = Number(req.query.minRent);
      if (req.query.maxRent) queryObj.rent.$lte = Number(req.query.maxRent);
    }

    // Filter by bedrooms
    if (req.query.bedrooms) {
      queryObj.bedrooms = { $gte: Number(req.query.bedrooms) };
    }

    // Filter by bathrooms
    if (req.query.bathrooms) {
      queryObj.bathrooms = { $gte: Number(req.query.bathrooms) };
    }

    // Filter by amenities
    if (req.query.amenities) {
      const amenities = req.query.amenities.split(',');
      queryObj.amenities = { $all: amenities };
    }

    // Filter by furnished
    if (req.query.furnished) {
      queryObj.furnished = req.query.furnished === 'true';
    }

    // Filter by pet friendly
    if (req.query.petFriendly) {
      queryObj.petFriendly = req.query.petFriendly === 'true';
    }

    // Filter by parking
    if (req.query.parking) {
      queryObj.parking = req.query.parking === 'true';
    }

    // Build the query
    let query = Property.find(queryObj).populate('landlord', 'name email phone');

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Execute query
    const properties = await query;

    // Get total count for pagination
    const total = await Property.countDocuments(queryObj);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit)
      },
      data: properties
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single property by ID
 * @route GET /api/properties/:id
 * @access Public
 */
const getProperty = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update property
 * @route PUT /api/properties/:id
 * @access Private (Property owner or Admin only)
 */
const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (
      property.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this property'
      });
    }

    // Handle images if they were uploaded
    if (req.files && Array.isArray(req.files)) {
      // Append new images
      const newImages = req.files.map(
        (file) => `/uploads/properties/${file.filename}`
      );
      req.body.images = [...property.images, ...newImages];
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete property
 * @route DELETE /api/properties/:id
 * @access Private (Property owner or Admin only)
 */
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (
      property.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get properties for current landlord
 * @route GET /api/properties/my-properties
 * @access Private (Landlord only)
 */
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.userId });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get properties by landlord ID
 * @route GET /api/properties/landlord/:id
 * @access Public
 */
const getLandlordProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      landlord: req.params.id,
      isAvailable: true
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getLandlordProperties
};
