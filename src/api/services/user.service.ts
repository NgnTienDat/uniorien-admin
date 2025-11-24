// src/api/services/user.service.ts
import { apiClient } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoint';
import type { ApiResponse } from '@/types/common.types';
import type { User, UserPageResponse } from '@/types/user.types';

export interface GetUsersParams {
    page?: number;
    size?: number;
}

export const userService = {
    /**
     * Get all users with pagination & filters
     */
    getUsers: async (params?: GetUsersParams): Promise<UserPageResponse> => {
        try {
            // Backend uses 0-based indexing, so subtract 1 if you're using 1-based in UI
            const queryParams = {
                page: params?.page ? params.page - 1 : 0, // Convert to 0-based
                size: params?.size,
            };

            const response = await apiClient.get<ApiResponse<UserPageResponse>>(
                API_ENDPOINTS.USERS.LIST,
                { params: queryParams }
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to fetch users');
            }

            return response.data.result;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch users.'
            );
        }
    },

    /**
     * Get user detail by ID
     */
    getUserDetail: async (id: string): Promise<User> => {
        try {
            const response = await apiClient.get<ApiResponse<User>>(
                API_ENDPOINTS.USERS.DETAIL(id)
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to fetch user detail');
            }

            return response.data.result;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch user detail'
            );
        }
    },

    /**
     * Lock user account
     */
    lockUser: async (id: string): Promise<void> => {
        try {
            const response = await apiClient.post<ApiResponse<null>>(
                API_ENDPOINTS.USERS.LOCK(id)
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to lock user');
            }
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to lock user'
            );
        }
    },

    /**
     * Unlock user account
     */
    unlockUser: async (id: string): Promise<void> => {
        try {
            const response = await apiClient.post<ApiResponse<null>>(
                API_ENDPOINTS.USERS.UNLOCK(id)
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to unlock user');
            }
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to unlock user'
            );
        }
    },

    /**
     * Delete user
     */
    deleteUser: async (id: string): Promise<void> => {
        try {
            const response = await apiClient.delete<ApiResponse<null>>(
                API_ENDPOINTS.USERS.DELETE(id)
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to delete user');
            }
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to delete user'
            );
        }
    },
};