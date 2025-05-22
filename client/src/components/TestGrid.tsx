import React from 'react';
import { Grid } from '@mui/material';

const TestComponent = () => {
  return (
    // For Grid container
    <Grid container spacing={2} sx={{ width: '100%' }}>
      {/* For Grid items, we use the 'component' prop to specify it's a div
          The 'sx' prop is now used for responsive layouts with CSS Grid */}
      <Grid component="div" sx={{ 
        gridColumn: { 
          xs: 'span 12', // Full width on extra small screens
          md: 'span 6',  // Half width on medium screens
          lg: 'span 3'   // Quarter width on large screens
        } 
      }}>
        Item 1
      </Grid>
      
      <Grid component="div" sx={{ 
        gridColumn: { 
          xs: 'span 12', // Full width on extra small screens
          md: 'span 6',  // Half width on medium screens
          lg: 'span 3'   // Quarter width on large screens
        } 
      }}>
        Item 2
      </Grid>
    </Grid>
  );
};

export default TestComponent;
