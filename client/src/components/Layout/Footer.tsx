import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';

const Footer: React.FC = () => {
  return (
    <Paper component="footer" square elevation={3} sx={{ py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <HomeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary" fontWeight="bold">
                RentMate
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              RentMate is an all-inclusive Property Rental Management System that aims to 
              make the process of renting properties easy for both landlords and tenants.
            </Typography>
            <Box display="flex" gap={1}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/properties" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Properties
            </Link>
            <Link component={RouterLink} to="/rent-share" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Rent Share
            </Link>
            <Link component={RouterLink} to="/search" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Search
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link component={RouterLink} to="/help" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link component={RouterLink} to="/contact" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link component={RouterLink} to="/privacy" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" component={RouterLink} to="/">
            RentMate
          </Link>{" "}
          {new Date().getFullYear()}
          {". All rights reserved."}
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
