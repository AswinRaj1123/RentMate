import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Link,
  Badge,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const navigateToDashboard = () => {
    if (user) {
      switch (user.role) {
        case 'landlord':
          navigate('/dashboard/landlord');
          break;
        case 'tenant':
          navigate('/dashboard/tenant');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    }
    handleClose();
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <motion.div
          variants={logoVariants}
          whileHover="hover"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography
              variant="h5"
              color="primary"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                fontWeight: 700,
                letterSpacing: '.1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HomeIcon sx={{ mr: 1 }} />
              RentMate
            </Typography>
          </Box>
        </motion.div>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/properties" color="inherit">
              Properties
            </Button>
            <Button component={RouterLink} to="/rent-share" color="inherit">
              Rent Share
            </Button>
            <Button component={RouterLink} to="/search" color="inherit">
              Search
            </Button>
          </Box>
        )}

        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

        {isAuthenticated ? (
          <>
            <IconButton color="inherit" aria-label="notifications" sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar 
                src={user?.profilePicture} 
                alt={user?.firstName}
                sx={{ width: 32, height: 32 }}
              >
                {user?.firstName?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={navigateToDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              component={RouterLink} 
              to="/login"
              variant="outlined" 
              color="primary"
            >
              Login
            </Button>
            <Button 
              component={RouterLink} 
              to="/register"
              variant="contained" 
              color="primary"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
