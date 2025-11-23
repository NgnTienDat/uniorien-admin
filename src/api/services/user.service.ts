// src/api/services/user.service.ts
import { apiClient } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoint';
import { User, UserListResponse, UserStatus } from '@/types/user.types';

export const userService = {
    // Get all users with pagination & filters
    getUsers: async (params?: {
        page?: number;
        size?: number;
        search?: string;
        status?: UserStatus;
    }): Promise<UserListResponse> => {
        const response = await apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
        return response.data;
    },

    // Get user detail
    getUserDetail: async (id: string): Promise<User> => {
        const response = await apiClient.get(API_ENDPOINTS.USERS.DETAIL(id));
        return response.data.result;
    },

    // Lock user account
    lockUser: async (id: string, reason?: string): Promise<void> => {
        await apiClient.post(API_ENDPOINTS.USERS.LOCK(id), { reason });
    },

    // Unlock user account
    unlockUser: async (id: string): Promise<void> => {
        await apiClient.post(API_ENDPOINTS.USERS.UNLOCK(id));
    },

    // Delete user
    deleteUser: async (id: string): Promise<void> => {
        await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    },
};