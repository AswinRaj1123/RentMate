import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
  Divider,
  Stack,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  CircularProgress,
  Paper,
  IconButton,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

import { Property, PropertySearchParams, PropertyService } from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';

// Styled components
const FilterBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const PropertyListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  // Filter states
  const [filters, setFilters] = useState<PropertySearchParams>({
    city: searchParams.get('location')?.split(',')[0] || '',
    state: searchParams.get('location')?.split(',')[1]?.trim() || '',
    propertyType: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') as string) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') as string) : undefined,
    bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms') as string) : undefined,
    bathrooms: searchParams.get('bathrooms') ? parseInt(searchParams.get('bathrooms') as string) : undefined,
    sortBy: 'createdAt',
    order: 'desc',
    page,
    limit,
  });

  // Price range state
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice || 500,
    filters.maxPrice || 5000,
  ]);

  // Fetch properties
  const { data, isLoading, isError, refetch } = useQuery(
    ['properties', filters],
    () => PropertyService.getProperties(filters),
    {
      keepPreviousData: true,
    }
  );

  // Update filters when search params change
  useEffect(() => {
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (location || type || minPrice || maxPrice) {
      const newFilters: PropertySearchParams = { ...filters };
      
      if (location) {
        const [city, state] = location.split(',').map(part => part.trim());
        newFilters.city = city;
        if (state) newFilters.state = state;
      }
      
      if (type && type !== 'all') newFilters.propertyType = type;
      if (minPrice) newFilters.minPrice = parseInt(minPrice);
      if (maxPrice) newFilters.maxPrice = parseInt(maxPrice);
      
      setFilters(newFilters);
      setPriceRange([
        parseInt(minPrice || '500'),
        parseInt(maxPrice || '5000'),
      ]);
    }
  }, [searchParams]);

  // Update query params when filters change
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleFilterChange = (name: keyof PropertySearchParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to page 1 when filters change
    }));
    setPage(1);
  };

  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setPriceRange([min, max]);
  };

  const handlePriceRangeChangeCommitted = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page: 1,
    }));
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setFilters(prev => ({
      ...prev,
      page: value,
    }));
  };

  const toggleFavorite = (propertyId: string) => {
    if (favoriteProperties.includes(propertyId)) {
      setFavoriteProperties(favoriteProperties.filter(id => id !== propertyId));
    } else {
      setFavoriteProperties([...favoriteProperties, propertyId]);
    }
    // TODO: Implement actual favorite API call when backend supports it
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit,
      sortBy: 'createdAt',
      order: 'desc',
    });
    setPriceRange([500, 5000]);
    setPage(1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Available Properties
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Browse our selection of quality properties for rent
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 80 } }}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Box>

            <Box sx={{ 
              display: { xs: showFilters ? 'block' : 'none', md: 'block' }
            }}>
              <FilterBox elevation={2}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Filters
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <TextField
                      label="City"
                      value={filters.city || ''}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      size="small"
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      label="State"
                      value={filters.state || ''}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      size="small"
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="property-type-label">Property Type</InputLabel>
                    <Select
                      labelId="property-type-label"
                      value={filters.propertyType || ''}
                      label="Property Type"
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      size="small"
                    >
                      <MenuItem value="">All Types</MenuItem>
                      <MenuItem value="apartment">Apartment</MenuItem>
                      <MenuItem value="house">House</MenuItem>
                      <MenuItem value="condo">Condo</MenuItem>
                      <MenuItem value="townhouse">Townhouse</MenuItem>
                      <MenuItem value="studio">Studio</MenuItem>
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography gutterBottom>Price Range</Typography>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      onChangeCommitted={handlePriceRangeChangeCommitted}
                      valueLabelDisplay="auto"
                      min={500}
                      max={10000}
                      step={100}
                      valueLabelFormat={(value) => `$${value}`}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">${priceRange[0]}</Typography>
                      <Typography variant="body2">${priceRange[1]}</Typography>
                    </Box>
                  </Box>

                  <FormControl fullWidth>
                    <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
                    <Select
                      labelId="bedrooms-label"
                      value={filters.bedrooms || ''}
                      label="Bedrooms"
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      size="small"
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value={1}>1+</MenuItem>
                      <MenuItem value={2}>2+</MenuItem>
                      <MenuItem value={3}>3+</MenuItem>
                      <MenuItem value={4}>4+</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="bathrooms-label">Bathrooms</InputLabel>
                    <Select
                      labelId="bathrooms-label"
                      value={filters.bathrooms || ''}
                      label="Bathrooms"
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      size="small"
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value={1}>1+</MenuItem>
                      <MenuItem value={2}>2+</MenuItem>
                      <MenuItem value={3}>3+</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                      labelId="sort-by-label"
                      value={filters.sortBy || 'createdAt'}
                      label="Sort By"
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      size="small"
                    >
                      <MenuItem value="createdAt">Newest</MenuItem>
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="size">Size</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="order-label">Order</InputLabel>
                    <Select
                      labelId="order-label"
                      value={filters.order || 'desc'}
                      label="Order"
                      onChange={(e) => handleFilterChange('order', e.target.value as 'asc' | 'desc')}
                      size="small"
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                  </FormControl>

                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={resetFilters} 
                    fullWidth
                  >
                    Reset Filters
                  </Button>
                </Stack>
              </FilterBox>
            </Box>
          </Box>
        </Grid>

        {/* Properties Section */}
        <Grid item xs={12} md={9}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading properties. Please try again later.
            </Alert>
          ) : data?.properties?.length === 0 ? (
            <Box sx={{ py: 5, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters to see more results.
              </Typography>
            </Box>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={3}>
                {data?.properties?.map((property: Property) => (
                  <Grid item xs={12} sm={6} md={4} key={property._id}>
                    <motion.div variants={itemVariants}>
                      <StyledCard>
                        <CardActionArea href={`/properties/${property._id}`}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'}
                            alt={property.title}
                          />
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Typography variant="h6" component="div" gutterBottom noWrap>
                                {property.title}
                              </Typography>
                              <IconButton 
                                size="small"
                                color="primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  isAuthenticated ? toggleFavorite(property._id) : alert('Please login to save favorites');
                                }}
                              >
                                {favoriteProperties.includes(property._id) ? (
                                  <FavoriteIcon color="error" />
                                ) : (
                                  <FavoriteBorderIcon />
                                )}
                              </IconButton>
                            </Box>
                            <Typography 
                              variant="subtitle1" 
                              color="primary.main" 
                              fontWeight="bold"
                              sx={{ mb: 1 }}
                            >
                              ${property.price}/month
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                              <LocationOnIcon fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {property.address.city}, {property.address.state}
                              </Typography>
                            </Stack>
                            <Divider sx={{ my: 1 }} />
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <BedIcon fontSize="small" color="action" />
                                <Typography variant="body2">{property.bedrooms}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <BathtubIcon fontSize="small" color="action" />
                                <Typography variant="body2">{property.bathrooms}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <SquareFootIcon fontSize="small" color="action" />
                                <Typography variant="body2">{property.size} ft²</Typography>
                              </Box>
                            </Stack>
                            {property.shareable && (
                              <Chip 
                                label="Shareable" 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                                sx={{ mt: 1 }}
                              />
                            )}
                          </CardContent>
                        </CardActionArea>
                      </StyledCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {/* Pagination */}
          {data?.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={data.totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyListingPage;
