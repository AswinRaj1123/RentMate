import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  open: boolean;
  variant: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, variant, onClose }) => {
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Properties', icon: <ApartmentIcon />, path: '/properties' },
    { text: 'Search', icon: <SearchIcon />, path: '/search' },
    { text: 'Rent Share', icon: <PeopleIcon />, path: '/rent-share' },
  ];

  const authItems = [
    ...(user?.role === 'landlord' ? [{ text: 'Landlord Dashboard', icon: <DashboardIcon />, path: '/dashboard/landlord' }] : []),
    ...(user?.role === 'tenant' ? [{ text: 'Tenant Dashboard', icon: <DashboardIcon />, path: '/dashboard/tenant' }] : []),
    ...(user?.role === 'admin' ? [{ text: 'Admin Dashboard', icon: <DashboardIcon />, path: '/dashboard/admin' }] : []),
    { text: 'My Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Saved Properties', icon: <FavoriteIcon />, path: '/saved' },
    { text: 'My Leases', icon: <DescriptionIcon />, path: '/leases' },
  ];

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: '64px', // Height of the navbar
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={NavLink} 
              to={item.path}
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                '&.active': {
                  color: theme.palette.primary.main,
                  bgcolor: theme.palette.primary.light + '20',
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                },
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        {isAuthenticated && (
          <>
            <Divider sx={{ my: 1 }} />
            <List>
              {authItems.map((item) => (
                <ListItem 
                  key={item.text} 
                  component={NavLink} 
                  to={item.path}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&.active': {
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.primary.light + '20',
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.main,
                      },
                    },
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
