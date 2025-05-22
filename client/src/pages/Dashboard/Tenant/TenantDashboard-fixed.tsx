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

// Mock Data (same as original file)
// ...

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
  // State & hooks declarations
  // ...

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* The implementation should follow Material UI v7.1.0 Grid usage */}
      {/* All `Grid item` components should be replaced with: */}
      {/* <Grid component="div" sx={{ gridColumn: { xs: 'span 12', md: 'span 6', lg: 'span 3' } }}> */}
      
      {/* Full component rendering */}
    </Container>
  );
};

export default TenantDashboard;
