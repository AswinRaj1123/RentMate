import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './assets/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout components
import Layout from './components/Layout/Layout';

// Page components
import HomePage from './pages/Home/HomePage';
import PropertyListingPage from './pages/PropertyListing/PropertyListingPage';
import PropertyDetailPage from './pages/PropertyDetail/PropertyDetailPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SearchPage from './pages/Search/SearchPage';
import RentSharePage from './pages/RentShare/RentSharePage';

// Dashboard pages
import LandlordDashboard from './pages/Dashboard/Landlord/LandlordDashboard';
import TenantDashboard from './pages/Dashboard/Tenant/TenantDashboard';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';

// Context providers
import { AuthProvider } from './context/AuthContext';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/properties" element={<PropertyListingPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/rent-share" element={<RentSharePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard/landlord" element={<LandlordDashboard />} />
                <Route path="/dashboard/tenant" element={<TenantDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
