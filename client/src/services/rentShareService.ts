import api from './api';

export interface RentShare {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  property?: {
    _id: string;
    title: string;
    address: {
      city: string;
      state: string;
    };
    price: number;
    images: string[];
  };
  preferences: {
    location: {
      city: string;
      state: string;
      zipCodes?: string[];
    };
    priceRange: {
      min: number;
      max: number;
    };
    moveInDate: string;
    duration: number;
    roomPreferences?: string[];
    amenities?: string[];
  };
  description: string;
  status: 'looking' | 'matched' | 'closed';
  matches: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RentShareSearchParams {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  moveInDateAfter?: string;
  moveInDateBefore?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const RentShareService = {
  getRentShares: async (params: RentShareSearchParams = {}) => {
    const response = await api.get('/rent-share', { params });
    return response.data;
  },

  getRentShareById: async (id: string) => {
    const response = await api.get(`/rent-share/${id}`);
    return response.data;
  },

  createRentShare: async (rentShareData: any) => {
    const response = await api.post('/rent-share', rentShareData);
    return response.data;
  },

  updateRentShare: async (id: string, rentShareData: any) => {
    const response = await api.put(`/rent-share/${id}`, rentShareData);
    return response.data;
  },

  deleteRentShare: async (id: string) => {
    const response = await api.delete(`/rent-share/${id}`);
    return response.data;
  },

  findMatches: async (id: string) => {
    const response = await api.get(`/rent-share/${id}/matches`);
    return response.data;
  },
};
