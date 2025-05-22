import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  MenuItem,
  InputAdornment,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'New York, NY',
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Cozy Studio in Historic District',
    location: 'Boston, MA',
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  },
  {
    id: 3,
    title: 'Luxury Condo with Ocean View',
    location: 'Miami, FL',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

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
  { value: 'studio', label: 'Studio' },
  { value: 'room', label: 'Room' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType && propertyType !== 'all') params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);

    // Navigate to search page with query params
    navigate({
      pathname: '/properties',
      search: params.toString()
    });
  };

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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '70vh', md: '80vh' },
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Find Your Perfect Rental Home
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              Search, apply, and move in - all in one place.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="">
                      <em>Any Location</em>
                    </MenuItem>
                    {locations.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    select
                    fullWidth
                    label="Property Type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ApartmentIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {propertyTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    select
                    fullWidth
                    label="Price Range"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Any Price</em>
                    </MenuItem>
                    <MenuItem value="0-1000">$0 - $1,000</MenuItem>
                    <MenuItem value="1000-2000">$1,000 - $2,000</MenuItem>
                    <MenuItem value="2000-3000">$2,000 - $3,000</MenuItem>
                    <MenuItem value="3000-4000">$3,000 - $4,000</MenuItem>
                    <MenuItem value="4000+">$4,000+</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    sx={{ height: '56px' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Properties Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Featured Properties
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Discover our most sought-after rental properties
          </Typography>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={4}>
            {featuredProperties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardActionArea onClick={() => navigate(`/properties/${property.id}`)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={property.image}
                        alt={property.title}
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" component="h3" fontWeight="bold">
                            {property.title}
                          </Typography>
                          <Chip
                            label={`$${property.price}/mo`}
                            color="primary"
                            size="small"
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                        >
                          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {property.location}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/properties')}
          >
            View All Properties
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Why Choose RentMate?
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              We make renting properties simple and stress-free
            </Typography>
          </Box>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.light',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <ApartmentIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      Wide Selection
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Browse thousands of rental properties in top locations, all in one place.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'secondary.light',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      Trusted Landlords
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      All properties and landlords are verified for your peace of mind.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'info.light',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      Find Roommates
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Connect with potential roommates to share rent and find your perfect match.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Ready to Find Your Perfect Rental Home?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of happy renters who found their home through RentMate.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/properties')}
            >
              Browse Properties
            </Button>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              size="large"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
