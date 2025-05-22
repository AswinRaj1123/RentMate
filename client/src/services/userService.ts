import api from './api';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  profilePicture?: string;
  verificationStatus: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: File;
}

export const UserService = {
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (profileData: FormData) => {
    const response = await api.put('/users/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Admin-only functions
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  updateUserStatus: async (id: string, data: { isActive?: boolean; verificationStatus?: boolean }) => {
    const response = await api.put(`/users/${id}/status`, data);
    return response.data;
  },
};
