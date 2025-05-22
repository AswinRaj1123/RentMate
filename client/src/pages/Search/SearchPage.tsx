import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Divider,
  Chip,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Pagination,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import MapIcon from '@mui/icons-material/Map';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedIcon from '@mui/icons-material/Verified';

import { PropertyService, PropertySearchParams } from '../../services/propertyService';
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

const SearchMapContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  minHeight: 600,
  position: 'sticky',
  top: 80,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

// Mock data for search suggestions
const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
];

const propertyTypes = [
  { value: 'all', label: 'All Properties' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'studio', label: 'Studio' },
];

const amenities = [
  'Air Conditioning',
  'Balcony',
  'Dishwasher',
  'Elevator',
  'Fireplace',
  'Furnished',
  'Garage',
  'Gym',
  'Laundry',
  'Parking',
  'Pets Allowed',
  'Pool',
  'Security System',
  'Storage',
  'Washer/Dryer',
  'Wifi',
];

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState<string[]>([]);

  // Search States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Filter states
  const [filters, setFilters] = useState<PropertySearchParams>({
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    propertyType: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') as string) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') as string) : undefined,
    bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms') as string) : undefined,
    bathrooms: searchParams.get('bathrooms') ? parseInt(searchParams.get('bathrooms') as string) : undefined,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    page,
    limit,
  });

  // Price range state
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice || 500,
    filters.maxPrice || 5000,
  ]);

  // Selected amenities state
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Fetch properties
  const { data, isLoading, isError, refetch } = useQuery(
    ['searchProperties', filters, searchQuery],
    () => PropertyService.getProperties({ ...filters, q: searchQuery }),
    {
      keepPreviousData: true,
    }
  );

  // Update filters when search params change
  useEffect(() => {
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const sortBy = searchParams.get('sortBy');
    const order = searchParams.get('order');
    
    if (q) setSearchQuery(q);
    
    const newFilters: PropertySearchParams = { ...filters };
    
    if (city) newFilters.city = city;
    if (state) newFilters.state = state;
    if (type && type !== 'all') newFilters.propertyType = type;
    if (minPrice) newFilters.minPrice = parseInt(minPrice);
    if (maxPrice) newFilters.maxPrice = parseInt(maxPrice);
    if (bedrooms) newFilters.bedrooms = parseInt(bedrooms);
    if (bathrooms) newFilters.bathrooms = parseInt(bathrooms);
    if (sortBy) newFilters.sortBy = sortBy;
    if (order) newFilters.order = order as 'asc' | 'desc';
    
    setFilters(newFilters);
    setPriceRange([
      parseInt(minPrice || '500'),
      parseInt(maxPrice || '5000'),
    ]);
  }, [searchParams]);

  // Update query params when filters change
  useEffect(() => {
    refetch();
  }, [filters, searchQuery, refetch]);

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

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
    // TODO: Add amenities to search params when backend supports it
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

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Build query params
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    // Update search params
    setSearchParams(params);
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit,
      sortBy: 'createdAt',
      order: 'desc',
    });
    setPriceRange([500, 5000]);
    setSelectedAmenities([]);
    setSearchQuery('');
    setPage(1);
    setSearchParams({});
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Search Properties
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Find your perfect rental home with our advanced search options
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Search by location, property name, or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="property-type-label">Property Type</InputLabel>
                  <Select
                    labelId="property-type-label"
                    value={filters.propertyType || ''}
                    label="Property Type"
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {propertyTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
                  <Select
                    labelId="bedrooms-label"
                    value={filters.bedrooms || ''}
                    label="Bedrooms"
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value={1}>1+</MenuItem>
                    <MenuItem value={2}>2+</MenuItem>
                    <MenuItem value={3}>3+</MenuItem>
                    <MenuItem value={4}>4+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button
                    startIcon={<TuneIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ textTransform: 'none' }}
                  >
                    {showFilters ? 'Hide Filters' : 'More Filters'}
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant={!showMap ? 'contained' : 'outlined'}
                      size="small"
                      startIcon={<ViewListIcon />}
                      onClick={() => setShowMap(false)}
                    >
                      List
                    </Button>
                    <Button
                      variant={showMap ? 'contained' : 'outlined'}
                      size="small"
                      startIcon={<MapIcon />}
                      onClick={() => setShowMap(true)}
                    >
                      Map
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              {/* Additional Filters */}
              {showFilters && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="City"
                          value={filters.city || ''}
                          onChange={(e) => handleFilterChange('city', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="State"
                          value={filters.state || ''}
                          onChange={(e) => handleFilterChange('state', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                          <InputLabel id="bathrooms-label">Bathrooms</InputLabel>
                          <Select
                            labelId="bathrooms-label"
                            value={filters.bathrooms || ''}
                            label="Bathrooms"
                            onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                          >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value={1}>1+</MenuItem>
                            <MenuItem value={2}>2+</MenuItem>
                            <MenuItem value={3}>3+</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                          <InputLabel id="sort-by-label">Sort By</InputLabel>
                          <Select
                            labelId="sort-by-label"
                            value={filters.sortBy || 'createdAt'}
                            label="Sort By"
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                          >
                            <MenuItem value="createdAt">Newest</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="size">Size</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom>Price Range</Typography>
                        <Box sx={{ px: 2 }}>
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
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2">${priceRange[0]}</Typography>
                            <Typography variant="body2">${priceRange[1]}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Amenities</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container>
                              {amenities.map((amenity) => (
                                <Grid item xs={6} sm={4} key={amenity}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                        size="small"
                                      />
                                    }
                                    label={amenity}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={resetFilters}
                          >
                            Reset Filters
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => {
                              refetch();
                              setShowFilters(false);
                            }}
                          >
                            Apply Filters
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </motion.div>

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
            Try adjusting your search criteria or filters to see more results.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={resetFilters}
            sx={{ mt: 2 }}
          >
            Clear Search
          </Button>
        </Box>
      ) : showMap ? (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto', pr: 1 }}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Stack spacing={3}>
                    {data?.properties?.map((property: any) => (
                      <motion.div key={property._id} variants={itemVariants}>
                        <Card>
                          <CardActionArea href={`/properties/${property._id}`}>
                            <Grid container>
                              <Grid item xs={5}>
                                <Box
                                  sx={{
                                    height: '100%',
                                    minHeight: 150,
                                    backgroundImage: `url(${property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                  }}
                                >
                                  {property.isVerified && (
                                    <Chip
                                      icon={<VerifiedIcon />}
                                      label="Verified"
                                      size="small"
                                      color="success"
                                      sx={{
                                        position: 'absolute',
                                        bottom: 8,
                                        left: 8,
                                      }}
                                    />
                                  )}
                                </Box>
                              </Grid>
                              <Grid item xs={7}>
                                <CardContent>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="subtitle1" component="div" fontWeight="medium" noWrap>
                                      {property.title}
                                    </Typography>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        isAuthenticated
                                          ? toggleFavorite(property._id)
                                          : alert('Please login to save favorites');
                                      }}
                                    >
                                      {favoriteProperties.includes(property._id) ? (
                                        <FavoriteIcon color="error" fontSize="small" />
                                      ) : (
                                        <FavoriteBorderIcon fontSize="small" />
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
                                </CardContent>
                              </Grid>
                            </Grid>
                          </CardActionArea>
                        </Card>
                      </motion.div>
                    ))}
                  </Stack>
                </motion.div>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <SearchMapContainer>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    bgcolor: '#f5f5f5',
                    color: 'text.secondary',
                  }}
                >
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <MapIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main', opacity: 0.7 }} />
                    <Typography variant="h6" gutterBottom>
                      Interactive Map Coming Soon
                    </Typography>
                    <Typography variant="body2">
                      We're working on integrating an interactive map to help you explore properties by location.
                    </Typography>
                  </Box>
                </Box>
              </SearchMapContainer>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data?.properties?.map((property: any) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <motion.div variants={itemVariants}>
                  <StyledCard>
                    <CardActionArea href={`/properties/${property._id}`}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'}
                          alt={property.title}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                          }}
                        >
                          <IconButton
                            sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)' }}
                            size="small"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              isAuthenticated
                                ? toggleFavorite(property._id)
                                : alert('Please login to save favorites');
                            }}
                          >
                            {favoriteProperties.includes(property._id) ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        </Box>
                        {property.isVerified && (
                          <Chip
                            icon={<VerifiedIcon />}
                            label="Verified"
                            size="small"
                            color="success"
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              left: 8,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom noWrap>
                          {property.title}
                        </Typography>
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

      {/* Search Tips */}
      <Paper sx={{ p: 3, mt: 6, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Search Tips
        </Typography>
        <Typography variant="body2" paragraph>
          Use the filters to narrow down your search results and find your perfect rental property.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Location Matters
            </Typography>
            <Typography variant="body2">
              Specify city and state to find properties in your desired location.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Set Your Budget
            </Typography>
            <Typography variant="body2">
              Use the price filter to only see properties within your budget range.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Specific Features
            </Typography>
            <Typography variant="body2">
              Filter by bedrooms, bathrooms, and amenities for your perfect match.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" gutterBottom>
              Save Favorites
            </Typography>
            <Typography variant="body2">
              Click the heart icon to save properties to your favorites list.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SearchPage;
