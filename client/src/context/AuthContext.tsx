import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Define the types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
}

interface JwtPayload {
  id: string;
  role: string;
  exp: number;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if token is valid
  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decoded = jwt_decode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token expired
            logout();
          } else {
            // Token is valid - fetch user data
            fetchUserData();
          }
        } catch (error) {
          // Invalid token
          logout();
        }
      }
    };

    checkTokenValidity();
  }, [token]);

  // Fetch user data when token is available
  const fetchUserData = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        
        // Redirect based on user role
        if (response.data.user.role === 'landlord') {
          navigate('/dashboard/landlord');
        } else if (response.data.user.role === 'tenant') {
          navigate('/dashboard/tenant');
        } else if (response.data.user.role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, userData);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        
        // Redirect based on user role
        if (response.data.user.role === 'landlord') {
          navigate('/dashboard/landlord');
        } else if (response.data.user.role === 'tenant') {
          navigate('/dashboard/tenant');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
