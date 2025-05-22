import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  Button,
  Chip,
  Stack,
  Card,
  CardContent,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { PropertyService } from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Styled components
const ImageGallery = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const MainImage = styled(Box)(({ theme }) => ({
  height: 400,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  [theme.breakpoints.up('md')]: {
    flex: 3,
  },
}));

const ThumbnailGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    flex: 1,
  },
}));

const Thumbnail = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  overflow: 'hidden',
  border: `2px solid transparent`,
  transition: 'all 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
  '&.active': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: 80,
  marginBottom: theme.spacing(2),
}));

const AmenityChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [applyForm, setApplyForm] = useState({
    moveInDate: '',
    duration: '12',
    message: '',
  });

  // Fetch property details
  const { data: property, isLoading, isError } = useQuery(
    ['property', id],
    () => PropertyService.getPropertyById(id as string),
    {
      enabled: !!id,
    }
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApplyFormChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setApplyForm({
      ...applyForm,
      [name as string]: value,
    });
  };

  const handleApplySubmit = () => {
    // TODO: Implement application submission
    console.log('Application submitted:', applyForm);
    alert('Your application has been submitted successfully!');
    setOpenApplyDialog(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement actual favorite API call
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy link:', err));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading property details. Please try again later.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/properties')}
          sx={{ mt: 2 }}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/properties')}
        sx={{ mb: 3 }}
      >
        Back to Properties
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {property.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <LocationOnIcon color="action" />
              <Typography variant="subtitle1" color="text.secondary">
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
              </Typography>
              {property.isVerified && (
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified"
                  size="small"
                  color="success"
                />
              )}
            </Stack>

            <ImageGallery>
              <MainImage>
                <img
                  src={property.images[activeImageIndex] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'}
                  alt={property.title}
                />
              </MainImage>
              <ThumbnailGrid>
                {property.images.slice(0, 4).map((image, index) => (
                  <Thumbnail
                    key={index}
                    className={index === activeImageIndex ? 'active' : ''}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </Thumbnail>
                ))}
                {property.images.length > 4 && (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {/* TODO: Open full gallery */}}
                  >
                    <Typography variant="body2">+{property.images.length - 4} more</Typography>
                  </Box>
                )}
              </ThumbnailGrid>
            </ImageGallery>

            <Box sx={{ mt: 4 }}>
              <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Overview" />
                <Tab label="Amenities" />
                <Tab label="Location" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Property Details
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Stack spacing={1} alignItems="center">
                        <BedIcon color="primary" />
                        <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                        <Typography variant="body1" fontWeight="medium">{property.bedrooms}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Stack spacing={1} alignItems="center">
                        <BathtubIcon color="primary" />
                        <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                        <Typography variant="body1" fontWeight="medium">{property.bathrooms}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Stack spacing={1} alignItems="center">
                        <SquareFootIcon color="primary" />
                        <Typography variant="body2" color="text.secondary">Area</Typography>
                        <Typography variant="body1" fontWeight="medium">{property.size} ft²</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Stack spacing={1} alignItems="center">
                        <CalendarTodayIcon color="primary" />
                        <Typography variant="body2" color="text.secondary">Available From</Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {new Date(property.availableFrom).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {property.description}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Property Type
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ textTransform: 'capitalize' }}>
                    {property.propertyType}
                  </Typography>

                  {property.shareable && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        Roommate Preferences
                      </Typography>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="body1" paragraph>
                          This property is open for room sharing. The landlord may have specific preferences for roommates.
                        </Typography>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          sx={{ mt: 1 }}
                          component="a"
                          href="/rent-share"
                        >
                          View RentShare Options
                        </Button>
                      </Paper>
                    </>
                  )}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Amenities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                  {property.amenities.map((amenity) => (
                    <AmenityChip
                      key={amenity}
                      label={amenity}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Location
                </Typography>
                <Paper sx={{ p: 2, mt: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Map will be displayed here
                    {/* TODO: Implement Google Maps or another map provider */}
                  </Typography>
                </Paper>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
                  </Typography>
                </Box>
              </TabPanel>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <ContactCard elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="div" color="primary" fontWeight="bold">
                  ${property.price}
                  <Typography component="span" variant="body2" color="text.secondary">
                    /month
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={handleShare} size="small">
                    <ShareIcon />
                  </IconButton>
                  <IconButton 
                    onClick={toggleFavorite} 
                    size="small"
                    color={isFavorite ? 'error' : 'default'}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Property Owner
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar>
                  {property.owner.firstName.charAt(0)}
                  {property.owner.lastName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1">
                    {property.owner.firstName} {property.owner.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Property Owner
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => {
                    if (isAuthenticated) {
                      setOpenApplyDialog(true);
                    } else {
                      navigate('/login', { state: { from: window.location.pathname } });
                    }
                  }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  fullWidth
                >
                  Contact Owner
                </Button>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                  Posted on {new Date(property.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferIcon fontSize="small" sx={{ mr: 1 }} />
                  Property ID: {property._id.substring(0, 8)}
                </Typography>
              </Box>
            </CardContent>
          </ContactCard>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Similar Properties
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coming soon...
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Application Dialog */}
      <Dialog open={openApplyDialog} onClose={() => setOpenApplyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for this property</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Move-in Date"
                  type="date"
                  name="moveInDate"
                  value={applyForm.moveInDate}
                  onChange={handleApplyFormChange}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="lease-duration-label">Lease Duration</InputLabel>
                  <Select
                    labelId="lease-duration-label"
                    name="duration"
                    value={applyForm.duration}
                    label="Lease Duration"
                    onChange={handleApplyFormChange}
                  >
                    <MenuItem value="6">6 months</MenuItem>
                    <MenuItem value="12">12 months</MenuItem>
                    <MenuItem value="18">18 months</MenuItem>
                    <MenuItem value="24">24 months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Additional Message"
                  name="message"
                  value={applyForm.message}
                  onChange={handleApplyFormChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Tell the owner why you're interested in this property..."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyDialog(false)}>Cancel</Button>
          <Button onClick={handleApplySubmit} variant="contained" color="primary">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PropertyDetailPage;
