import React, { useState } from 'react';
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
  Divider,
  Button,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import PetsIcon from '@mui/icons-material/Pets';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import MessageIcon from '@mui/icons-material/Message';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';

import { RentShareService } from '../../services/rentShareService';
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

const CompatibilityBar = styled(Box)(({ theme, value }: { theme?: any, value: number }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// Mock data for rent share listings
const rentShareListings = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Alex Johnson',
      age: 28,
      occupation: 'Software Engineer',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    property: {
      id: 'p1',
      title: 'Modern Apartment in Downtown',
      location: 'New York, NY',
      price: 1250, // per person
      totalPrice: 2500,
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    },
    matchScore: 85,
    moveInDate: '2023-09-01',
    preferences: {
      smoking: false,
      pets: true,
      lateNights: true,
      drinking: 'social',
      visitors: 'occasional',
      cleanliness: 'moderate',
    },
    bio: 'Software engineer working remotely. I enjoy hiking on weekends and playing video games. Looking for a respectful roommate who is also into tech.',
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Sarah Kim',
      age: 25,
      occupation: 'Graphic Designer',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    property: {
      id: 'p2',
      title: 'Cozy Loft near Arts District',
      location: 'Los Angeles, CA',
      price: 1100, // per person
      totalPrice: 2200,
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3',
    },
    matchScore: 78,
    moveInDate: '2023-08-15',
    preferences: {
      smoking: false,
      pets: false,
      lateNights: false,
      drinking: 'rarely',
      visitors: 'rarely',
      cleanliness: 'very clean',
    },
    bio: 'Creative designer who loves a quiet space to work. I'm a morning person and usually spend weekends at galleries or hiking. Looking for a clean and respectful roommate.',
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Miguel Rodriguez',
      age: 30,
      occupation: 'Chef',
      profilePic: 'https://randomuser.me/api/portraits/men/71.jpg',
    },
    property: {
      id: 'p3',
      title: 'Spacious Condo with City View',
      location: 'Chicago, IL',
      price: 950, // per person
      totalPrice: 1900,
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
    },
    matchScore: 92,
    moveInDate: '2023-09-15',
    preferences: {
      smoking: false,
      pets: true,
      lateNights: true,
      drinking: 'social',
      visitors: 'often',
      cleanliness: 'moderate',
    },
    bio: 'Professional chef who works late nights. I love cooking for friends and having social gatherings on my days off. Looking for someone who appreciates good food and doesn\'t mind occasional dinner parties.',
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Emily Wilson',
      age: 26,
      occupation: 'Nurse',
      profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    property: {
      id: 'p4',
      title: 'Quiet Apartment near Hospital',
      location: 'Boston, MA',
      price: 1050, // per person
      totalPrice: 2100,
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3',
    },
    matchScore: 81,
    moveInDate: '2023-10-01',
    preferences: {
      smoking: false,
      pets: false,
      lateNights: false,
      drinking: 'rarely',
      visitors: 'occasional',
      cleanliness: 'very clean',
    },
    bio: 'Hospital nurse who works varying shifts. I value a quiet and clean living space when I'm off work. Looking for a considerate roommate who understands my sometimes unusual hours.',
  },
];

// Filter options
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

const RentSharePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [rentShares, setRentShares] = useState(rentShareListings);
  const [openProfileDialog, setOpenProfileDialog] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 500,
    maxPrice: 2500,
    moveInDateFrom: '',
    moveInDateTo: '',
    preferences: {
      smoking: false,
      pets: false,
      lateNights: false,
    },
  });

  // Create RentShare Form
  const [newRentShare, setNewRentShare] = useState({
    property: '',
    moveInDate: '',
    preferences: {
      smoking: false,
      pets: false,
      lateNights: false,
      drinking: 'social',
      visitors: 'occasional',
      cleanliness: 'moderate',
    },
    bio: '',
  });

  // Mock query for rent shares
  const { isLoading, isError } = useQuery(
    ['rentShares', filters, page],
    () => Promise.resolve(rentShares), // Replace with RentShareService.getRentShares(filters) when backend is ready
    {
      keepPreviousData: true,
      enabled: isAuthenticated, // Only fetch if user is logged in
    }
  );

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  const handlePreferenceChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      }
    }));
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 500,
      maxPrice: 2500,
      moveInDateFrom: '',
      moveInDateTo: '',
      preferences: {
        smoking: false,
        pets: false,
        lateNights: false,
      },
    });
    setPage(1);
  };

  const handleCreateFormChange = (name: string, value: any) => {
    setNewRentShare(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePreferenceChange = (name: string, value: any) => {
    setNewRentShare(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      }
    }));
  };

  const handleCreateSubmit = () => {
    // TODO: Implement creating a new rent share
    console.log('New rent share:', newRentShare);
    alert('Your RentShare profile has been created successfully!');
    setOpenCreateDialog(false);
  };

  // Find the selected rent share for the profile dialog
  const selectedRentShare = rentShares.find(rs => rs.id === openProfileDialog);

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
            RentShare - Find Your Perfect Roommate
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Connect with like-minded individuals to share rental costs and create a great living experience
          </Typography>
        </motion.div>
      </Box>

      {!isAuthenticated ? (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: 'center',
            mb: 4,
            bgcolor: 'background.default',
          }}
        >
          <PersonSearchIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Connect with Potential Roommates
          </Typography>
          <Typography variant="body1" paragraph>
            Please sign in to browse roommate listings and create your own RentShare profile.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/login"
            sx={{ mt: 2 }}
          >
            Sign In to Continue
          </Button>
        </Paper>
      ) : (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create RentShare Profile
            </Button>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {/* Filters Section */}
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                display: { xs: showFilters ? 'block' : 'none', md: 'block' },
                position: { md: 'sticky' },
                top: { md: 80 },
              }}>
                <FilterBox elevation={2}>
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Filters
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel id="location-label">Location</InputLabel>
                      <Select
                        labelId="location-label"
                        value={filters.location}
                        label="Location"
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        size="small"
                      >
                        <MenuItem value="">Any Location</MenuItem>
                        {locations.map((location) => (
                          <MenuItem key={location} value={location}>
                            {location}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box>
                      <Typography gutterBottom>Price Range (per person)</Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                          label="Min"
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                          size="small"
                          InputProps={{ 
                            startAdornment: <Typography variant="body2" sx={{ mr: 0.5 }}>$</Typography>
                          }}
                        />
                        <Typography>-</Typography>
                        <TextField
                          label="Max"
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                          size="small"
                          InputProps={{
                            startAdornment: <Typography variant="body2" sx={{ mr: 0.5 }}>$</Typography>
                          }}
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Typography gutterBottom>Move-in Date Range</Typography>
                      <Stack spacing={2}>
                        <TextField
                          label="From"
                          type="date"
                          value={filters.moveInDateFrom}
                          onChange={(e) => handleFilterChange('moveInDateFrom', e.target.value)}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="To"
                          type="date"
                          value={filters.moveInDateTo}
                          onChange={(e) => handleFilterChange('moveInDateTo', e.target.value)}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Stack>
                    </Box>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Preferences</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={filters.preferences.smoking}
                                onChange={(e) => handlePreferenceChange('smoking', e.target.checked)}
                              />
                            }
                            label="Non-smoking"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={filters.preferences.pets}
                                onChange={(e) => handlePreferenceChange('pets', e.target.checked)}
                              />
                            }
                            label="Pet-friendly"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={filters.preferences.lateNights}
                                onChange={(e) => handlePreferenceChange('lateNights', e.target.checked)}
                              />
                            }
                            label="Early sleeper"
                          />
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>

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
            </Grid>

            {/* RentShare Listings Section */}
            <Grid item xs={12} md={9}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error loading RentShare listings. Please try again later.
                </Alert>
              ) : rentShares.length === 0 ? (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    No RentShare listings found
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
                    {rentShares.map((rentShare) => (
                      <Grid item xs={12} sm={6} key={rentShare.id}>
                        <motion.div variants={itemVariants}>
                          <StyledCard>
                            <CardActionArea onClick={() => setOpenProfileDialog(rentShare.id)}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <CardMedia
                                    component="img"
                                    height="100%"
                                    image={rentShare.user.profilePic}
                                    alt={rentShare.user.name}
                                    sx={{ objectFit: 'cover' }}
                                  />
                                </Grid>
                                <Grid item xs={7}>
                                  <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                      {rentShare.user.name}, {rentShare.user.age}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                      <WorkIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                      <Typography variant="body2" color="text.secondary">
                                        {rentShare.user.occupation}
                                      </Typography>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />

                                    <Typography variant="subtitle2" gutterBottom>
                                      Seeking roommate for:
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }} gutterBottom>
                                      {rentShare.property.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                      <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                      <Typography variant="body2" color="text.secondary">
                                        {rentShare.property.location}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                      <DateRangeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                      <Typography variant="body2" color="text.secondary">
                                        Available from {new Date(rentShare.moveInDate).toLocaleDateString()}
                                      </Typography>
                                    </Box>
                                    <Typography color="primary" variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                                      ${rentShare.property.price}/month per person
                                    </Typography>

                                    <Box sx={{ mt: 2 }}>
                                      <Typography variant="subtitle2" gutterBottom>
                                        Compatibility Match:
                                      </Typography>
                                      <CompatibilityBar value={rentShare.matchScore}>
                                        <Box sx={{ flexGrow: 1 }}>
                                          <LinearProgress
                                            variant="determinate"
                                            value={rentShare.matchScore}
                                            color={
                                              rentShare.matchScore > 80 ? 'success' :
                                              rentShare.matchScore > 60 ? 'primary' : 'warning'
                                            }
                                            sx={{ height: 8, borderRadius: 4 }}
                                          />
                                        </Box>
                                        <Typography variant="body2" fontWeight="bold">
                                          {rentShare.matchScore}%
                                        </Typography>
                                      </CompatibilityBar>
                                    </Box>
                                  </CardContent>
                                </Grid>
                              </Grid>
                            </CardActionArea>
                          </StyledCard>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}

              {/* Pagination */}
              {rentShares.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={3} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size="large"
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </>
      )}

      {/* RentShare Profile Dialog */}
      <Dialog 
        open={!!openProfileDialog} 
        onClose={() => setOpenProfileDialog(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedRentShare && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  RentShare Profile
                </Typography>
                <Chip 
                  label={`${selectedRentShare.matchScore}% Match`}
                  color={
                    selectedRentShare.matchScore > 80 ? 'success' :
                    selectedRentShare.matchScore > 60 ? 'primary' : 'warning'
                  }
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar
                      src={selectedRentShare.user.profilePic}
                      alt={selectedRentShare.user.name}
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6">
                      {selectedRentShare.user.name}, {selectedRentShare.user.age}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {selectedRentShare.user.occupation}
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<MessageIcon />}
                      sx={{ mt: 1 }}
                    >
                      Contact {selectedRentShare.user.name.split(' ')[0]}
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Preferences
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SmokingRoomsIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Smoking</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {selectedRentShare.preferences.smoking ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PetsIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Pets</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {selectedRentShare.preferences.pets ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNoteIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Late Nights</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {selectedRentShare.preferences.lateNights ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalBarIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Drinking</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                        {selectedRentShare.preferences.drinking}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>
                    About Me
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedRentShare.bio}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Property Details
                  </Typography>
                  <Card sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={selectedRentShare.property.image}
                      alt={selectedRentShare.property.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {selectedRentShare.property.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {selectedRentShare.property.location}
                        </Typography>
                      </Box>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Bedrooms
                          </Typography>
                          <Typography variant="body1">
                            {selectedRentShare.property.bedrooms}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Bathrooms
                          </Typography>
                          <Typography variant="body1">
                            {selectedRentShare.property.bathrooms}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Your Share
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" color="primary.main">
                            ${selectedRentShare.property.price}/month
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Rent
                          </Typography>
                          <Typography variant="body1">
                            ${selectedRentShare.property.totalPrice}/month
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Available From
                          </Typography>
                          <Typography variant="body1">
                            {new Date(selectedRentShare.moveInDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 2 }}
                        fullWidth
                        href={`/properties/${selectedRentShare.property.id}`}
                      >
                        View Property Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenProfileDialog(null)} color="primary">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MessageIcon />}
              >
                Contact to RentShare
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Create RentShare Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Your RentShare Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1 }}>
            Create a profile to find your perfect roommate or share your property with someone.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="property-label">Select Your Property</InputLabel>
                <Select
                  labelId="property-label"
                  name="property"
                  value={newRentShare.property}
                  label="Select Your Property"
                  onChange={(e) => handleCreateFormChange('property', e.target.value)}
                >
                  <MenuItem value="">
                    <em>None (Looking for a place to share)</em>
                  </MenuItem>
                  <MenuItem value="p1">Modern Apartment in Downtown</MenuItem>
                  <MenuItem value="p2">Cozy Loft in Arts District</MenuItem>
                  <MenuItem value="p3">Spacious 2-Bedroom House</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Don't see your property? <Button color="primary" size="small">List a Property First</Button>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Move-in Date"
                type="date"
                name="moveInDate"
                value={newRentShare.moveInDate}
                onChange={(e) => handleCreateFormChange('moveInDate', e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tell Potential Roommates About Yourself"
                name="bio"
                value={newRentShare.bio}
                onChange={(e) => handleCreateFormChange('bio', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder="Share your lifestyle, habits, and what you're looking for in a roommate..."
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Your Preferences
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRentShare.preferences.smoking}
                          onChange={(e) => handleCreatePreferenceChange('smoking', e.target.checked)}
                        />
                      }
                      label="Smoking Allowed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRentShare.preferences.pets}
                          onChange={(e) => handleCreatePreferenceChange('pets', e.target.checked)}
                        />
                      }
                      label="Pets Allowed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRentShare.preferences.lateNights}
                          onChange={(e) => handleCreatePreferenceChange('lateNights', e.target.checked)}
                        />
                      }
                      label="Late Nights OK"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="drinking-label">Drinking</InputLabel>
                      <Select
                        labelId="drinking-label"
                        name="drinking"
                        value={newRentShare.preferences.drinking}
                        label="Drinking"
                        onChange={(e) => handleCreatePreferenceChange('drinking', e.target.value)}
                      >
                        <MenuItem value="never">Never</MenuItem>
                        <MenuItem value="rarely">Rarely</MenuItem>
                        <MenuItem value="social">Social</MenuItem>
                        <MenuItem value="often">Often</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="visitors-label">Visitors</InputLabel>
                      <Select
                        labelId="visitors-label"
                        name="visitors"
                        value={newRentShare.preferences.visitors}
                        label="Visitors"
                        onChange={(e) => handleCreatePreferenceChange('visitors', e.target.value)}
                      >
                        <MenuItem value="rarely">Rarely</MenuItem>
                        <MenuItem value="occasional">Occasional</MenuItem>
                        <MenuItem value="often">Often</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="cleanliness-label">Cleanliness Level</InputLabel>
                      <Select
                        labelId="cleanliness-label"
                        name="cleanliness"
                        value={newRentShare.preferences.cleanliness}
                        label="Cleanliness Level"
                        onChange={(e) => handleCreatePreferenceChange('cleanliness', e.target.value)}
                      >
                        <MenuItem value="very clean">Very Clean</MenuItem>
                        <MenuItem value="moderate">Moderate</MenuItem>
                        <MenuItem value="relaxed">Relaxed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateSubmit} 
            variant="contained" 
            color="primary"
          >
            Create RentShare Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RentSharePage;
