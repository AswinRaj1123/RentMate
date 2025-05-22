import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Badge,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import MoneyIcon from '@mui/icons-material/Money';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useAuth } from '../../../context/AuthContext';
import { PropertyService } from '../../../services/propertyService';

// Mock Data
const mockProperties = [
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
    isAvailable: true,
    isVerified: true,
    applications: 3,
    tenants: 1,
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
    isAvailable: true,
    isVerified: false,
    applications: 5,
    tenants: 0,
  },
  {
    _id: 'p3',
    title: 'Luxury Condo with Ocean View',
    address: {
      street: '789 Beach Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
    },
    price: 3200,
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3'],
    isAvailable: false,
    isVerified: true,
    applications: 0,
    tenants: 2,
  },
];

const mockApplications = [
  {
    id: 'a1',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    },
    applicant: {
      id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    status: 'pending',
    date: '2023-08-15',
    moveInDate: '2023-09-01',
    duration: 12,
  },
  {
    id: 'a2',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    },
    applicant: {
      id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    status: 'approved',
    date: '2023-08-10',
    moveInDate: '2023-09-01',
    duration: 6,
  },
  {
    id: 'a3',
    property: {
      id: 'p2',
      title: 'Cozy Studio in Historic District',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3',
    },
    applicant: {
      id: 'u3',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    },
    status: 'pending',
    date: '2023-08-12',
    moveInDate: '2023-09-15',
    duration: 12,
  },
  {
    id: 'a4',
    property: {
      id: 'p2',
      title: 'Cozy Studio in Historic District',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3',
    },
    applicant: {
      id: 'u4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    status: 'rejected',
    date: '2023-08-05',
    moveInDate: '2023-09-01',
    duration: 12,
  },
];

const mockLeases = [
  {
    id: 'l1',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    },
    tenant: {
      id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    startDate: '2023-09-01',
    endDate: '2024-03-01',
    rent: 2500,
    securityDeposit: 2500,
    status: 'active',
  },
  {
    id: 'l2',
    property: {
      id: 'p3',
      title: 'Luxury Condo with Ocean View',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
    },
    tenant: {
      id: 'u5',
      name: 'Michael Brown',
      email: 'michael@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    rent: 3200,
    securityDeposit: 3200,
    status: 'active',
  },
  {
    id: 'l3',
    property: {
      id: 'p3',
      title: 'Luxury Condo with Ocean View',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
    },
    tenant: {
      id: 'u6',
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    rent: 3200,
    securityDeposit: 3200,
    status: 'active',
  },
];

const mockPayments = [
  {
    id: 'pay1',
    lease: 'l1',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
    },
    tenant: {
      id: 'u2',
      name: 'Jane Smith',
    },
    amount: 2500,
    date: '2023-09-01',
    status: 'paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'pay2',
    lease: 'l2',
    property: {
      id: 'p3',
      title: 'Luxury Condo with Ocean View',
    },
    tenant: {
      id: 'u5',
      name: 'Michael Brown',
    },
    amount: 3200,
    date: '2023-09-01',
    status: 'paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'pay3',
    lease: 'l3',
    property: {
      id: 'p3',
      title: 'Luxury Condo with Ocean View',
    },
    tenant: {
      id: 'u6',
      name: 'Emily Davis',
    },
    amount: 3200,
    date: '2023-09-01',
    status: 'pending',
    paymentMethod: 'Pending',
  },
  {
    id: 'pay4',
    lease: 'l1',
    property: {
      id: 'p1',
      title: 'Modern Downtown Apartment',
    },
    tenant: {
      id: 'u2',
      name: 'Jane Smith',
    },
    amount: 2500,
    date: '2023-08-01',
    status: 'paid',
    paymentMethod: 'Credit Card',
  },
];

// Styled Components
const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
}));

const PropertyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
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

const LandlordDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [openCreatePropertyDialog, setOpenCreatePropertyDialog] = useState(false);
  const [openViewApplicationDialog, setOpenViewApplicationDialog] = useState<string | null>(null);
  const [openViewLeaseDialog, setOpenViewLeaseDialog] = useState<string | null>(null);
  
  // Mock data queries
  const { data: properties, isLoading: isPropertiesLoading } = useQuery(
    ['landlordProperties'],
    () => Promise.resolve(mockProperties),
    { enabled: !!user }
  );

  const { data: applications, isLoading: isApplicationsLoading } = useQuery(
    ['applications'],
    () => Promise.resolve(mockApplications),
    { enabled: !!user }
  );

  const { data: leases, isLoading: isLeasesLoading } = useQuery(
    ['leases'],
    () => Promise.resolve(mockLeases),
    { enabled: !!user }
  );

  const { data: payments, isLoading: isPaymentsLoading } = useQuery(
    ['payments'],
    () => Promise.resolve(mockPayments),
    { enabled: !!user }
  );

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Open action menu
  const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, propertyId: string) => {
    event.stopPropagation();
    setActionMenuAnchor(event.currentTarget);
    setSelectedPropertyId(propertyId);
  };

  // Close action menu
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
    setSelectedPropertyId(null);
  };

  // Handle view property action
  const handleViewProperty = () => {
    handleCloseActionMenu();
    navigate(`/properties/${selectedPropertyId}`);
  };

  // Handle edit property action
  const handleEditProperty = () => {
    handleCloseActionMenu();
    // Navigate to edit property page or open edit dialog
    console.log('Edit property:', selectedPropertyId);
  };

  // Handle delete property action
  const handleDeleteProperty = () => {
    handleCloseActionMenu();
    // Open delete confirmation dialog
    console.log('Delete property:', selectedPropertyId);
  };

  // Handle application action
  const handleApplicationAction = (applicationId: string, action: 'approve' | 'reject') => {
    // Handle application approval or rejection
    console.log(`${action} application:`, applicationId);
    setOpenViewApplicationDialog(null);
  };

  // Get the selected application for the dialog
  const selectedApplication = applications?.find(app => app.id === openViewApplicationDialog);

  // Get the selected lease for the dialog
  const selectedLease = leases?.find(lease => lease.id === openViewLeaseDialog);

  // Count pending applications
  const pendingApplicationsCount = applications?.filter(app => app.status === 'pending').length || 0;

  // Calculate total monthly income
  const totalMonthlyIncome = leases?.reduce((total, lease) => total + lease.rent, 0) || 0;

  // Count active leases
  const activeLeaseCount = leases?.filter(lease => lease.status === 'active').length || 0;

  // Payment stats
  const paidPaymentsCount = payments?.filter(payment => payment.status === 'paid').length || 0;
  const pendingPaymentsCount = payments?.filter(payment => payment.status === 'pending').length || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Landlord Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, {user?.firstName}! Manage your properties, tenants, and leases.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <IconButton color="primary" sx={{ bgcolor: 'background.paper' }}>
              <Badge badgeContent={pendingApplicationsCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreatePropertyDialog(true)}
            >
              Add Property
            </Button>
          </Stack>
        </Box>
      </motion.div>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatCard elevation={2}>
              <Box sx={{ mb: 1, bgcolor: 'primary.light', borderRadius: '50%', p: 1.5 }}>
                <HomeIcon color="primary" fontSize="large" />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {properties?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Properties
              </Typography>
            </StatCard>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatCard elevation={2}>
              <Box sx={{ mb: 1, bgcolor: 'warning.light', borderRadius: '50%', p: 1.5 }}>
                <PeopleIcon color="warning" fontSize="large" />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {pendingApplicationsCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Applications
              </Typography>
            </StatCard>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatCard elevation={2}>
              <Box sx={{ mb: 1, bgcolor: 'success.light', borderRadius: '50%', p: 1.5 }}>
                <DescriptionIcon color="success" fontSize="large" />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {activeLeaseCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Leases
              </Typography>
            </StatCard>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatCard elevation={2}>
              <Box sx={{ mb: 1, bgcolor: 'info.light', borderRadius: '50%', p: 1.5 }}>
                <PaymentsIcon color="info" fontSize="large" />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                ${totalMonthlyIncome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Income
              </Typography>
            </StatCard>
          </motion.div>
        </Grid>
      </Grid>

      {/* Dashboard Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Properties" icon={<HomeIcon />} iconPosition="start" />
            <Tab 
              label="Applications" 
              icon={<PersonIcon />} 
              iconPosition="start"
              component={Badge}
              badgeContent={pendingApplicationsCount}
              color="error"
            />
            <Tab label="Leases" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="Payments" icon={<PaymentsIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Properties Tab */}
        <TabPanel value={tabValue} index={0}>
          {isPropertiesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : properties?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" gutterBottom>
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Start by adding your first property to the platform.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreatePropertyDialog(true)}
              >
                Add Property
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {properties?.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property._id}>
                  <PropertyCard>
                    <CardActionArea onClick={() => navigate(`/properties/${property._id}`)}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 200,
                          backgroundImage: `url(${property.images[0] || 'https://via.placeholder.com/400x200'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconButton
                            aria-label="property actions"
                            onClick={(e) => handleOpenActionMenu(e, property._id)}
                            sx={{ bgcolor: 'background.paper' }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                        {!property.isAvailable && (
                          <Chip
                            label="Rented"
                            color="primary"
                            sx={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              fontWeight: 'bold',
                            }}
                          />
                        )}
                        {property.isVerified && (
                          <Chip
                            label="Verified"
                            color="success"
                            icon={<CheckCircleIcon />}
                            sx={{
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent>
                        <Typography variant="h6" gutterBottom noWrap>
                          {property.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {property.address.street}, {property.address.city}, {property.address.state}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="primary.main"
                          fontWeight="bold"
                          sx={{ mb: 1 }}
                        >
                          ${property.price}/month
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Applications
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {property.applications}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Tenants
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {property.tenants}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </PropertyCard>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Applications Tab */}
        <TabPanel value={tabValue} index={1}>
          {isApplicationsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : applications?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" gutterBottom>
                No applications found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When tenants apply for your properties, they will appear here.
              </Typography>
            </Box>
          ) : (
            <Box>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
                {applications?.map((application) => (
                  <React.Fragment key={application.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ py: 2 }}
                      secondaryAction={
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setOpenViewApplicationDialog(application.id)}
                        >
                          View Details
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt={application.applicant.name} src={application.applicant.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {application.applicant.name}
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
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {application.property.title}
                            </Typography>
                            <Typography component="span" variant="body2" display="block">
                              Applied on {new Date(application.date).toLocaleDateString()} | 
                              Move-in: {new Date(application.moveInDate).toLocaleDateString()} | 
                              Duration: {application.duration} months
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </TabPanel>

        {/* Leases Tab */}
        <TabPanel value={tabValue} index={2}>
          {isLeasesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : leases?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" gutterBottom>
                No leases found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once you approve applications, the leases will appear here.
              </Typography>
            </Box>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
              {leases?.map((lease) => (
                <React.Fragment key={lease.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ py: 2 }}
                    secondaryAction={
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenViewLeaseDialog(lease.id)}
                      >
                        View Lease
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={lease.tenant.name} src={lease.tenant.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {lease.tenant.name}
                          <Chip
                            label={lease.status}
                            size="small"
                            color={
                              lease.status === 'active'
                                ? 'success'
                                : lease.status === 'expired'
                                ? 'error'
                                : 'warning'
                            }
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {lease.property.title}
                          </Typography>
                          <Typography component="span" variant="body2" display="block">
                            ${lease.rent}/month | 
                            {new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </TabPanel>

        {/* Payments Tab */}
        <TabPanel value={tabValue} index={3}>
          {isPaymentsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : payments?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" gutterBottom>
                No payment records found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once you have active leases, payment records will appear here.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Received
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      ${payments?.reduce((total, payment) => payment.status === 'paid' ? total + payment.amount : total, 0)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pending
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      ${payments?.reduce((total, payment) => payment.status === 'pending' ? total + payment.amount : total, 0)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Paid Payments
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {paidPaymentsCount}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pending Payments
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {pendingPaymentsCount}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
                {payments?.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ py: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: payment.status === 'paid' ? 'success.main' : 'warning.main' }}>
                          <MoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">
                              {payment.property.title} - {payment.tenant.name}
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
            </Box>
          )}
        </TabPanel>
      </Box>

      {/* Property Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleViewProperty}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Property
        </MenuItem>
        <MenuItem onClick={handleEditProperty}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Property
        </MenuItem>
        <MenuItem onClick={handleDeleteProperty} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Property
        </MenuItem>
      </Menu>

      {/* View Application Dialog */}
      <Dialog
        open={!!openViewApplicationDialog}
        onClose={() => setOpenViewApplicationDialog(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Typography variant="h6">Rental Application</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={selectedApplication.property.image}
                      alt={selectedApplication.property.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {selectedApplication.property.title}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Application Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {new Date(selectedApplication.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Requested Move-in Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {new Date(selectedApplication.moveInDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lease Duration
                        </Typography>
                        <Typography variant="body1">
                          {selectedApplication.duration} months
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle1" gutterBottom>
                    Applicant Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={selectedApplication.applicant.avatar}
                      alt={selectedApplication.applicant.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {selectedApplication.applicant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedApplication.applicant.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Application Status
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedApplication.status === 'pending' ? (
                        <AccessTimeIcon color="warning" sx={{ mr: 1 }} />
                      ) : selectedApplication.status === 'approved' ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      ) : (
                        <CancelIcon color="error" sx={{ mr: 1 }} />
                      )}
                      <Typography
                        variant="body1"
                        sx={{ textTransform: 'capitalize' }}
                        color={
                          selectedApplication.status === 'pending'
                            ? 'warning.main'
                            : selectedApplication.status === 'approved'
                            ? 'success.main'
                            : 'error.main'
                        }
                      >
                        {selectedApplication.status}
                      </Typography>
                    </Box>
                  </Paper>

                  <Typography variant="subtitle1" gutterBottom>
                    Additional Information
                  </Typography>
                  <Typography variant="body2" paragraph>
                    The applicant has provided employment verification, credit report, and references. 
                    All documents have been verified and meet our rental criteria.
                  </Typography>

                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tenant Screening Results
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Credit Score
                        </Typography>
                        <Typography variant="body1">
                          745 (Excellent)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Income Verification
                        </Typography>
                        <Typography variant="body1">
                          Verified
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Background Check
                        </Typography>
                        <Typography variant="body1">
                          Passed
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Previous Landlord
                        </Typography>
                        <Typography variant="body1">
                          Positive Reference
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewApplicationDialog(null)}>Close</Button>
              {selectedApplication.status === 'pending' && (
                <>
                  <Button
                    onClick={() => handleApplicationAction(selectedApplication.id, 'reject')}
                    color="error"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApplicationAction(selectedApplication.id, 'approve')}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* View Lease Dialog */}
      <Dialog
        open={!!openViewLeaseDialog}
        onClose={() => setOpenViewLeaseDialog(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedLease && (
          <>
            <DialogTitle>
              <Typography variant="h6">Lease Agreement</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={selectedLease.property.image}
                      alt={selectedLease.property.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {selectedLease.property.title}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Lease Period
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {new Date(selectedLease.startDate).toLocaleDateString()} to {' '}
                          {new Date(selectedLease.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Monthly Rent
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary.main" gutterBottom>
                          ${selectedLease.rent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Security Deposit
                        </Typography>
                        <Typography variant="body1">
                          ${selectedLease.securityDeposit}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tenant Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={selectedLease.tenant.avatar}
                      alt={selectedLease.tenant.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {selectedLease.tenant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedLease.tenant.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Lease Status
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedLease.status === 'active' ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      ) : (
                        <CancelIcon color="error" sx={{ mr: 1 }} />
                      )}
                      <Typography
                        variant="body1"
                        sx={{ textTransform: 'capitalize' }}
                        color={selectedLease.status === 'active' ? 'success.main' : 'error.main'}
                      >
                        {selectedLease.status}
                      </Typography>
                    </Box>
                  </Paper>

                  <Typography variant="subtitle1" gutterBottom>
                    Lease Documents
                  </Typography>
                  <List disablePadding>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Lease Agreement" 
                        secondary="Signed on Jul 15, 2023"
                      />
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Property Inspection Report" 
                        secondary="Completed on Jul 20, 2023"
                      />
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Security Deposit Receipt" 
                        secondary="Issued on Jul 10, 2023"
                      />
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItem>
                  </List>

                  <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>
                    Lease Terms Summary
                  </Typography>
                  <Typography variant="body2" paragraph>
                    This is a standard residential lease agreement for the property. 
                    The tenant has agreed to all terms and conditions including:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Rent due on the 1st of each month" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Late fee of $50 if rent is paid after the 5th" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Tenant is responsible for utilities" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="No unauthorized pets or occupants" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="30-day notice required for termination" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewLeaseDialog(null)}>Close</Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
              >
                Download Lease
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Create Property Dialog - Placeholder */}
      <Dialog
        open={openCreatePropertyDialog}
        onClose={() => setOpenCreatePropertyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1 }}>
            Fill in the details to list your new property on RentMate.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Property Title"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monthly Rent ($)"
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Security Deposit ($)"
                fullWidth
                type="number"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bedrooms"
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bathrooms"
                fullWidth
                type="number"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Property Address
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Street Address"
                fullWidth
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="City"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="State"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Zip Code"
                fullWidth
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Availability
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Available From"
                type="date"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Property Type</InputLabel>
                <Select label="Property Type">
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="condo">Condo</MenuItem>
                  <MenuItem value="townhouse">Townhouse</MenuItem>
                  <MenuItem value="studio">Studio</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Images (Coming soon)
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Image upload functionality will be implemented in the next phase.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreatePropertyDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // TODO: Implement creating property
              setOpenCreatePropertyDialog(false);
              alert('Property creation will be implemented in the next phase.');
            }}
          >
            Add Property
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LandlordDashboard;
