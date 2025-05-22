import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Avatar,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Badge,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

// Icons
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

// Mock data for favorites
const mockFavorites = [
  {
    _id: 'p1',
    title: 'Modern Downtown Apartment',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    price: 2500,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'],
    bedrooms: 2,
    bathrooms: 2,
    size: 1000,
    isVerified: true,
  },
  {
    _id: 'p2',
    title: 'Cozy Studio in Historic District',
    address: {
      street: '456 Park Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
    },
    price: 1800,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3'],
    bedrooms: 1,
    bathrooms: 1,
    size: 600,
    isVerified: false,
  },
];

// Mock data for applications
const mockApplications = [
  {
    id: 'a1',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
      address: {
        city: 'New York',
        state: 'NY',
      },
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    },
    status: 'pending',
    date: '2023-08-15',
    moveInDate: '2023-09-01',
  },
  {
    id: 'a2',
    property: {
      id: 'p3',
      title: 'Luxury Condo with Ocean View',
      address: {
        city: 'Miami',
        state: 'FL',
      },
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
    },
    status: 'rejected',
    date: '2023-07-20',
    moveInDate: '2023-08-15',
  },
];

// Mock data for leases
const mockLeases = [
  {
    id: 'l1',
    property: {
      id: 'p2',
      title: 'Cozy Studio in Historic District',
      address: {
        city: 'Boston',
        state: 'MA',
      },
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3',
    },
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    rent: 1800,
    deposit: 1800,
    status: 'active',
  },
];

// Mock data for payments
const mockPayments = [
  {
    id: 'pay1',
    property: {
      id: 'p2',
      title: 'Cozy Studio in Historic District',
    },
    amount: 1800,
    date: '2023-08-01',
    status: 'paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'pay2',
    property: {
      id: 'p2',
      title: 'Cozy Studio in Historic District',
    },
    amount: 1800,
    date: '2023-09-01',
    status: 'pending',
    paymentMethod: 'Pending',
  },
];

// Styled components
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const ProfilePage: React.FC = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [editSecurity, setEditSecurity] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    applicationUpdates: true,
    leaseReminders: true,
    paymentReminders: true,
    marketingEmails: false,
  });
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  // Initialize profile form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  // Mock queries for user data
  const { data: favorites, isLoading: isFavoritesLoading } = useQuery(
    ['userFavorites'],
    () => Promise.resolve(mockFavorites),
    { enabled: isAuthenticated }
  );

  const { data: applications, isLoading: isApplicationsLoading } = useQuery(
    ['userApplications'],
    () => Promise.resolve(mockApplications),
    { enabled: isAuthenticated }
  );

  const { data: leases, isLoading: isLeasesLoading } = useQuery(
    ['userLeases'],
    () => Promise.resolve(mockLeases),
    { enabled: isAuthenticated }
  );

  const { data: payments, isLoading: isPaymentsLoading } = useQuery(
    ['userPayments'],
    () => Promise.resolve(mockPayments),
    { enabled: isAuthenticated }
  );

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle profile form change
  const handleProfileFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Handle security form change
  const handleSecurityFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSecurityForm({
      ...securityForm,
      [name]: value,
    });
  };

  // Handle notification settings change
  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  // Handle save profile
  const handleSaveProfile = () => {
    // TODO: Implement API call to update profile
    updateUser({
      ...user!,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phoneNumber: profileForm.phoneNumber,
      bio: profileForm.bio,
    });
    setEditProfile(false);
    alert('Profile updated successfully!');
  };

  // Handle save security settings
  const handleSaveSecuritySettings = () => {
    // TODO: Implement API call to update password
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    setEditSecurity(false);
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setOpenPasswordDialog(false);
    alert('Password updated successfully!');
  };

  // Handle save notification settings
  const handleSaveNotificationSettings = () => {
    // TODO: Implement API call to update notification settings
    alert('Notification settings updated successfully!');
  };

  // Handle remove favorite
  const handleRemoveFavorite = (propertyId: string) => {
    // TODO: Implement API call to remove favorite
    console.log('Remove favorite:', propertyId);
    alert('Property removed from favorites!');
  };

  // Handle cancel application
  const handleCancelApplication = (applicationId: string) => {
    // TODO: Implement API call to cancel application
    console.log('Cancel application:', applicationId);
    alert('Application cancelled successfully!');
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Please log in to view your profile
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/login"
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                position: 'relative',
                borderRadius: 2,
                backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={3} md={2} sx={{ textAlign: 'center' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                      >
                        <PhotoCameraIcon />
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          onChange={() => {
                            // TODO: Implement profile picture upload
                            alert('Profile picture upload will be implemented in the next phase');
                          }}
                        />
                      </IconButton>
                    }
                  >
                    <ProfileAvatar
                      alt={user?.firstName}
                      src={user?.profilePicture || ''}
                    >
                      {!user?.profilePicture && user?.firstName?.charAt(0)}
                    </ProfileAvatar>
                  </Badge>
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                        {user?.firstName} {user?.lastName}
                      </Typography>
                      <Typography variant="body1">
                        {user?.email}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Member since {new Date().toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={user?.role}
                        color="default"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          textTransform: 'capitalize',
                          mt: 1,
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        color: 'primary.main',
                        mt: { xs: 2, sm: 0 },
                      }}
                      onClick={() => setEditProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Profile Tabs */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="profile tabs"
            >
              <Tab icon={<PersonIcon />} label="Personal Info" iconPosition="start" />
              <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
              <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
              <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="start" />
              <Tab icon={<DescriptionIcon />} label="Applications & Leases" iconPosition="start" />
              <Tab icon={<PaymentIcon />} label="Payments" iconPosition="start" />
            </Tabs>
          </Box>

          {/* Personal Info Tab */}
          <TabPanel value={tabValue} index={0}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              {editProfile ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Edit Profile
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileFormChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleProfileFormChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileFormChange}
                        fullWidth
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleProfileFormChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileFormChange}
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditProfile(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        First Name
                      </Typography>
                      <Typography variant="body1">{user?.firstName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Last Name
                      </Typography>
                      <Typography variant="body1">{user?.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{user?.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="body1">{user?.phoneNumber || 'Not provided'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Bio
                      </Typography>
                      <Typography variant="body1">
                        {user?.bio || 'No bio provided yet. Tell us about yourself!'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setEditProfile(true)}
                      >
                        Edit Profile
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={tabValue} index={1}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SecurityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Password"
                    secondary="Last changed: Never"
                  />
                  <Button
                    variant="outlined"
                    onClick={() => setOpenPasswordDialog(true)}
                  >
                    Change Password
                  </Button>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Enhance your account security"
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                  >
                    Set Up
                  </Button>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Login History"
                    secondary="View your recent login activities"
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      // TODO: Implement login history view
                      alert('Login history will be implemented in the next phase');
                    }}
                  >
                    View
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel value={tabValue} index={2}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage how you receive notifications and updates from RentMate.
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive important alerts via email"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailAlerts}
                        onChange={handleNotificationChange}
                        name="emailAlerts"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Application Updates"
                    secondary="Get notified when your application status changes"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.applicationUpdates}
                        onChange={handleNotificationChange}
                        name="applicationUpdates"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Lease Reminders"
                    secondary="Reminders about lease renewals and important dates"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.leaseReminders}
                        onChange={handleNotificationChange}
                        name="leaseReminders"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Payment Reminders"
                    secondary="Get reminded when rent payments are due"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.paymentReminders}
                        onChange={handleNotificationChange}
                        name="paymentReminders"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive promotional offers and newsletters"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onChange={handleNotificationChange}
                        name="marketingEmails"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveNotificationSettings}
                >
                  Save Preferences
                </Button>
              </Box>
            </Paper>
          </TabPanel>

          {/* Favorites Tab */}
          <TabPanel value={tabValue} index={3}>
            {isFavoritesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress />
              </Box>
            ) : favorites?.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" gutterBottom>
                  No favorites yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Start browsing properties and save your favorites to see them here.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/properties"
                >
                  Browse Properties
                </Button>
              </Box>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  {favorites?.map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property._id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'background.paper' },
                          }}
                          onClick={() => handleRemoveFavorite(property._id)}
                        >
                          <FavoriteIcon color="error" />
                        </IconButton>
                        <CardActionArea href={`/properties/${property._id}`}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={property.images[0]}
                            alt={property.title}
                          />
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
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            )}
          </TabPanel>

          {/* Applications & Leases Tab */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Rental Applications
                </Typography>
                {isApplicationsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                  </Box>
                ) : applications?.length === 0 ? (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    You haven't submitted any rental applications yet.
                  </Alert>
                ) : (
                  <Paper sx={{ borderRadius: 2 }}>
                    <List disablePadding>
                      {applications?.map((application) => (
                        <React.Fragment key={application.id}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{ py: 2 }}
                            secondaryAction={
                              <Stack direction="row" spacing={1}>
                                <IconButton
                                  color="primary"
                                  href={`/properties/${application.property.id}`}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                                {application.status === 'pending' && (
                                  <IconButton
                                    color="error"
                                    onClick={() => handleCancelApplication(application.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Stack>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={application.property.image}
                                variant="rounded"
                                sx={{ width: 60, height: 60 }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                    {application.property.title}
                                  </Typography>
                                  <Chip
                                    label={application.status}
                                    size="small"
                                    color={
                                      application.status === 'approved'
                                        ? 'success'
                                        : application.status === 'rejected'
                                        ? 'error'
                                        : 'warning'
                                    }
                                    icon={
                                      application.status === 'approved' ? (
                                        <CheckCircleIcon />
                                      ) : application.status === 'rejected' ? (
                                        <CancelIcon />
                                      ) : (
                                        <AccessTimeIcon />
                                      )
                                    }
                                  />
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography variant="body2" component="span" color="text.primary" display="block">
                                    {application.property.address.city}, {application.property.address.state}
                                  </Typography>
                                  <Typography variant="body2" component="span">
                                    Applied on: {new Date(application.date).toLocaleDateString()} | 
                                    Desired move-in: {new Date(application.moveInDate).toLocaleDateString()}
                                  </Typography>
                                </React.Fragment>
                              }
                              sx={{ ml: 2 }}
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Active Leases
                </Typography>
                {isLeasesLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                  </Box>
                ) : leases?.length === 0 ? (
                  <Alert severity="info">
                    You don't have any active leases yet.
                  </Alert>
                ) : (
                  <Paper sx={{ borderRadius: 2 }}>
                    <List disablePadding>
                      {leases?.map((lease) => (
                        <React.Fragment key={lease.id}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{ py: 2 }}
                            secondaryAction={
                              <Button
                                variant="outlined"
                                size="small"
                                href={`/properties/${lease.property.id}`}
                              >
                                View Property
                              </Button>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={lease.property.image}
                                variant="rounded"
                                sx={{ width: 60, height: 60 }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                    {lease.property.title}
                                  </Typography>
                                  <Chip
                                    label={lease.status}
                                    size="small"
                                    color={lease.status === 'active' ? 'success' : 'default'}
                                  />
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography variant="body2" component="span" color="text.primary" display="block">
                                    {lease.property.address.city}, {lease.property.address.state}
                                  </Typography>
                                  <Typography variant="body2" component="span">
                                    Lease Period: {new Date(lease.startDate).toLocaleDateString()} to {' '}
                                    {new Date(lease.endDate).toLocaleDateString()} | 
                                    ${lease.rent}/month
                                  </Typography>
                                </React.Fragment>
                              }
                              sx={{ ml: 2 }}
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </TabPanel>

          {/* Payments Tab */}
          <TabPanel value={tabValue} index={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Payment Methods
                </Typography>
                <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Payment method management will be available in the next phase.
                  </Alert>
                  <Button variant="contained" color="primary">
                    Add Payment Method
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Payment History
                </Typography>
                {isPaymentsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                  </Box>
                ) : payments?.length === 0 ? (
                  <Alert severity="info">
                    You don't have any payment records yet.
                  </Alert>
                ) : (
                  <Paper sx={{ borderRadius: 2 }}>
                    <List disablePadding>
                      {payments?.map((payment) => (
                        <React.Fragment key={payment.id}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{ py: 2 }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: payment.status === 'paid' ? 'success.main' : 'warning.main' }}>
                                <PaymentIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Typography variant="subtitle1">
                                    {payment.property.title} - Rent Payment
                                  </Typography>
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    ${payment.amount}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                    <Typography component="span" variant="body2">
                                      Due Date: {new Date(payment.date).toLocaleDateString()} | 
                                      {payment.paymentMethod}
                                    </Typography>
                                    <Chip
                                      label={payment.status}
                                      size="small"
                                      color={payment.status === 'paid' ? 'success' : 'warning'}
                                    />
                                  </Box>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={securityForm.currentPassword}
              onChange={handleSecurityFormChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={securityForm.newPassword}
              onChange={handleSecurityFormChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={securityForm.confirmPassword}
              onChange={handleSecurityFormChange}
              fullWidth
              required
              margin="normal"
              error={
                securityForm.newPassword !== securityForm.confirmPassword &&
                securityForm.confirmPassword !== ''
              }
              helperText={
                securityForm.newPassword !== securityForm.confirmPassword &&
                securityForm.confirmPassword !== ''
                  ? 'Passwords do not match'
                  : ''
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveSecuritySettings}
            variant="contained"
            color="primary"
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
