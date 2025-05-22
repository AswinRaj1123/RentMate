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
  CardMedia,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
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
  LinearProgress,
  Alert,
  Badge,
  Tooltip,
  Rating,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
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
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import { useAuth } from '../../../context/AuthContext';

// Mock Data
const mockLeaseDetails = {
  id: 'l1',
  property: {
    id: 'p1',
    title: 'Modern Downtown Apartment',
    address: '123 Main St, New York, NY 10001',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: '850 sq ft',
    },
  },
  landlord: {
    id: 'landlord1',
    name: 'Robert Thompson',
    email: 'robert@property.com',
    phone: '(555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
  terms: {
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    rentAmount: 2500,
    securityDeposit: 2500,
    dueDate: 1, // Day of month
  },
  status: 'active',
  documents: [
    { id: 'd1', name: 'Lease Agreement.pdf', date: '2023-08-15' },
    { id: 'd2', name: 'Move-in Checklist.pdf', date: '2023-08-28' },
  ],
};

const mockPayments = [
  {
    id: 'p1',
    month: 'September 2023',
    amount: 2500,
    dueDate: '2023-09-01',
    status: 'paid',
    paidDate: '2023-08-28',
    receipt: 'receipt_sept.pdf',
  },
  {
    id: 'p2',
    month: 'October 2023',
    amount: 2500,
    dueDate: '2023-10-01',
    status: 'upcoming',
    paidDate: null,
    receipt: null,
  },
  {
    id: 'p3',
    month: 'November 2023',
    amount: 2500,
    dueDate: '2023-11-01',
    status: 'upcoming',
    paidDate: null,
    receipt: null,
  },
];

const mockMaintenanceRequests = [
  {
    id: 'm1',
    title: 'Leaking Bathroom Faucet',
    description: 'The bathroom sink faucet is constantly dripping water, even when turned off completely.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Plumbing',
    dateSubmitted: '2023-09-10',
    scheduledDate: '2023-09-15',
    images: ['https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3'],
    updates: [
      {
        date: '2023-09-11',
        message: 'Maintenance team has been notified and will schedule a visit.',
        from: 'Landlord',
      },
      {
        date: '2023-09-12',
        message: 'Visit scheduled for Friday, September 15th between 10 AM and 12 PM.',
        from: 'Maintenance',
      },
    ],
  },
  {
    id: 'm2',
    title: 'Air Conditioner Not Cooling',
    description: 'The AC is running but not cooling the apartment effectively. It\'s been like this for 2 days.',
    status: 'pending',
    priority: 'high',
    category: 'HVAC',
    dateSubmitted: '2023-09-13',
    scheduledDate: null,
    images: [],
    updates: [],
  },
  {
    id: 'm3',
    title: 'Light Fixture Replacement',
    description: 'The light fixture in the hallway is not working properly. I\'ve tried changing bulbs but it flickers.',
    status: 'completed',
    priority: 'low',
    category: 'Electrical',
    dateSubmitted: '2023-08-25',
    scheduledDate: '2023-08-28',
    completedDate: '2023-08-28',
    images: [],
    updates: [
      {
        date: '2023-08-26',
        message: 'Scheduled for repair on Monday, August 28th.',
        from: 'Landlord',
      },
      {
        date: '2023-08-28',
        message: 'Fixed the light fixture by replacing the entire unit. All working properly now.',
        from: 'Maintenance',
      },
    ],
  },
];

const mockRoommates = [
  {
    id: 'r1',
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    moveInDate: '2023-09-01',
    contactEmail: 'emma@example.com',
    contactPhone: '(555) 234-5678',
    shared: {
      rent: 1250, // Half of total
      utilities: 75,
      internet: 40,
    },
    status: 'active',
  },
  {
    id: 'r2',
    name: 'Daniel Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    moveInDate: '2023-09-01',
    contactEmail: 'daniel@example.com',
    contactPhone: '(555) 987-6543',
    shared: {
      rent: 1250, // Half of total
      utilities: 75,
      internet: 40,
    },
    status: 'active',
  },
];

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  height: '100%',
  overflow: 'hidden',
}));

// Define proper type for the StatusChip props
interface StatusChipProps {
  status: string;
}

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<StatusChipProps>(({ theme, status }) => {
  let color;
  switch (status) {
    case 'active':
    case 'paid':
    case 'completed':
      color = theme.palette.success.main;
      break;
    case 'pending':
    case 'upcoming':
      color = theme.palette.warning.main;
      break;
    case 'in-progress':
      color = theme.palette.info.main;
      break;
    case 'overdue':
    case 'rejected':
      color = theme.palette.error.main;
      break;
    default:
      color = theme.palette.grey[500];
  }
  return {
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    fontWeight: 'bold',
  };
});

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
  },
}));

// Main Component
const TenantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [selectedMaintenanceRequest, setSelectedMaintenanceRequest] = useState<any>(null);
  const [newMaintenanceRequest, setNewMaintenanceRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Other',
  });

  // Tab Handling
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Maintenance Request Dialog
  const handleOpenMaintenanceDialog = (request?: any) => {
    if (request) {
      setSelectedMaintenanceRequest(request);
    } else {
      setSelectedMaintenanceRequest(null);
      setNewMaintenanceRequest({
        title: '',
        description: '',
        priority: 'medium',
        category: 'Other',
      });
    }
    setMaintenanceDialogOpen(true);
  };

  const handleCloseMaintenanceDialog = () => {
    setMaintenanceDialogOpen(false);
  };

  const handleMaintenanceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMaintenanceRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewMaintenanceRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitMaintenanceRequest = () => {
    // Submit logic would go here
    console.log('Submitting maintenance request:', newMaintenanceRequest);
    setMaintenanceDialogOpen(false);
  };

  // Get number of days until rent is due
  const getDaysUntilRentDue = () => {
    const today = new Date();
    const dueDate = new Date(today.getFullYear(), today.getMonth(), mockLeaseDetails.terms.dueDate);
    
    if (today.getDate() > mockLeaseDetails.terms.dueDate) {
      // Move to next month if we're past the due date
      dueDate.setMonth(dueDate.getMonth() + 1);
    }
    
    const timeDiff = dueDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Calculate payment progress
  const paymentProgress = () => {
    const paid = mockPayments.filter(p => p.status === 'paid').length;
    return (paid / mockPayments.length) * 100;
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'pending':
      case 'upcoming':
        return <AccessTimeIcon color="warning" />;
      case 'in-progress':
        return <BuildIcon color="info" />;
      case 'overdue':
      case 'rejected':
        return <CancelIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Tenant Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>        {/* Quick Stats */}        <Grid container spacing={3} mb={4}>
          <Grid component="div" sx={{ gridColumn: { xs: 'span 12', md: 'span 6', lg: 'span 3' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <DashboardCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                      MY LEASE
                    </Typography>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <DescriptionIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {mockLeaseDetails.status === 'active' ? 'Active' : 'Inactive'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Until {new Date(mockLeaseDetails.terms.endDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </DashboardCard>
            </motion.div>          </Grid>
          
          <Grid xs={12} md={6} lg={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DashboardCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                      NEXT RENT DUE
                    </Typography>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <PaymentsIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    ${mockLeaseDetails.terms.rentAmount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    In {getDaysUntilRentDue()} days
                  </Typography>
                </CardContent>
              </DashboardCard>
            </motion.div>          </Grid>
          
          <Grid xs={12} md={6} lg={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <DashboardCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                      MAINTENANCE REQUESTS
                    </Typography>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <BuildIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {mockMaintenanceRequests.filter(req => req.status !== 'completed').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Open requests
                  </Typography>
                </CardContent>
              </DashboardCard>
            </motion.div>          </Grid>
          
          <Grid xs={12} md={6} lg={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DashboardCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                      ROOMMATES
                    </Typography>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <PeopleIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {mockRoommates.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sharing your space
                  </Typography>
                </CardContent>
              </DashboardCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Paper sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Property" icon={<HomeIcon />} iconPosition="start" />
            <Tab label="Lease" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="Payments" icon={<PaymentsIcon />} iconPosition="start" />
            <Tab label="Maintenance" icon={<BuildIcon />} iconPosition="start" />
            <Tab label="Roommates" icon={<PeopleIcon />} iconPosition="start" />
          </Tabs>
        </Paper>        {/* Property Tab */}
        {tabValue === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid component="div" sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Your Property
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <Card sx={{ mb: 3, borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={mockLeaseDetails.property.image}
                      alt={mockLeaseDetails.property.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {mockLeaseDetails.property.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {mockLeaseDetails.property.address}
                      </Typography>
                      
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Bedrooms
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {mockLeaseDetails.property.features.bedrooms}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Bathrooms
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {mockLeaseDetails.property.features.bathrooms}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Area
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {mockLeaseDetails.property.features.area}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/properties/${mockLeaseDetails.property.id}`)}
                  >
                    View Full Property Details
                  </Button>
                </StyledPaper>
              </Grid>
              
              <Grid xs={12} md={6}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Landlord Information
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                      src={mockLeaseDetails.landlord.avatar}
                      alt={mockLeaseDetails.landlord.name}
                      sx={{ width: 80, height: 80, mr: 3 }}
                    />
                    <Box>
                      <Typography variant="h6">{mockLeaseDetails.landlord.name}</Typography>
                      <Typography variant="body2" color="textSecondary">Property Owner</Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Contact Information
                      </Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <TextField
                        label="Email"
                        value={mockLeaseDetails.landlord.email}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <TextField
                        label="Phone"
                        value={mockLeaseDetails.landlord.phone}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<NotificationsIcon />}
                  >
                    Contact Landlord
                  </Button>
                </StyledPaper>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Lease Tab */}
        {tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Lease Details
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1" fontWeight="medium">
                        Lease Term
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" sx={{ pl: 4 }}>
                      <Typography variant="body2">
                        Start Date: {new Date(mockLeaseDetails.terms.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        End Date: {new Date(mockLeaseDetails.terms.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1" fontWeight="medium">
                        Financial Details
                      </Typography>
                    </Box>
                    <Stack spacing={1} sx={{ pl: 4 }}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Monthly Rent:</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          ${mockLeaseDetails.terms.rentAmount}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Security Deposit:</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          ${mockLeaseDetails.terms.securityDeposit}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">Due Date:</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {mockLeaseDetails.terms.dueDate}st of each month
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                      <Typography variant="body1" fontWeight="medium">
                        Status
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 4 }}>
                      <StatusChip
                        label={mockLeaseDetails.status.toUpperCase()}
                        size="small"
                        status={mockLeaseDetails.status}
                      />
                    </Box>
                  </Box>
                </StyledPaper>
              </Grid>
              
              <Grid xs={12} md={6}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Documents
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <List>
                    {mockLeaseDetails.documents.map((doc) => (
                      <ListItem
                        key={doc.id}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <DescriptionIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={doc.name}
                          secondary={`Uploaded on ${new Date(doc.date).toLocaleDateString()}`}
                        />
                        <ListItemSecondaryAction>
                          <Tooltip title="Download">
                            <IconButton edge="end">
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  
                  <Box mt={3}>
                    <Alert severity="info">
                      Your signed lease agreement and other important documents can be found here. 
                      If you need additional documents, please contact your landlord.
                    </Alert>
                  </Box>
                </StyledPaper>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Payments Tab */}
        {tabValue === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Payment Summary
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                      ${mockLeaseDetails.terms.rentAmount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Monthly Rent
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Payment Progress ({Math.round(paymentProgress())}%)
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={paymentProgress()}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Next Payment Due" 
                        secondary={`${mockPayments.find(p => p.status === 'upcoming')?.dueDate}`}
                      />
                      <Typography color="primary" fontWeight="bold">
                        ${mockLeaseDetails.terms.rentAmount}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Payment Method" 
                        secondary="Credit Card ending in 4242"
                      />
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                  </List>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PaymentsIcon />}
                    sx={{ mt: 2 }}
                  >
                    Make Payment
                  </Button>
                </StyledPaper>
              </Grid>
              
              <Grid xs={12} md={8}>
                <StyledPaper>
                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Payment History
                    </Typography>
                    <Divider />
                  </Box>
                  
                  <List>
                    {mockPayments.map((payment) => (
                      <ListItem
                        key={payment.id}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: payment.status === 'paid' ? 'success.main' : 'warning.main' }}>
                            {payment.status === 'paid' ? <CheckCircleIcon /> : <AccessTimeIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={payment.month}
                         