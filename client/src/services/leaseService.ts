import api from './api';

export interface Lease {
  _id: string;
  property: {
    _id: string;
    title: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    images: string[];
  };
  landlord: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  tenant: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'pending' | 'active' | 'expired' | 'terminated' | 'rejected';
  documents: string[];
  terms: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaseCreateData {
  property: string;
  landlord: string;
  tenant: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  terms: string;
}

export const LeaseService = {
  getLeases: async (params: { status?: string; property?: string } = {}) => {
    const response = await api.get('/leases', { params });
    return response.data;
  },

  getLeaseById: async (id: string) => {
    const response = await api.get(`/leases/${id}`);
    return response.data;
  },

  createLease: async (leaseData: FormData) => {
    const response = await api.post('/leases', leaseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateLeaseStatus: async (id: string, status: string) => {
    const response = await api.put(`/leases/${id}/status`, { status });
    return response.data;
  },
};
