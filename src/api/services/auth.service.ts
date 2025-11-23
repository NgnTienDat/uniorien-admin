// src/api/services/auth.service.ts
import type { User } from '@/types/user.types';
import type { ApiResponse } from '@/types/common.types';
import apiClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoint';



export interface LoginResult {
    authenticated: boolean;
    user: User;
    token: string;
}

export interface IntrospectResult {
    valid: boolean;
}

export interface RefreshTokenResult {
    authenticated: boolean;
    user: User;
    token: string;
}



export const authService = {
    /**
     * Login with email and password
     */
    login: async (email: string, password: string): Promise<LoginResult> => {
        try {
            const response = await apiClient.post<ApiResponse<LoginResult>>(
                API_ENDPOINTS.AUTH.LOGIN,
                { email, password }
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Login failed');
            }

            return response.data.result;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Login failed. Please check your credentials.'
            );
        }
    },

    /**
     * Get current authenticated user information
     */
    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await apiClient.get<ApiResponse<User>>(
                API_ENDPOINTS.AUTH.ME
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Failed to fetch user info');
            }

            return response.data.result;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch user information'
            );
        }
    },

    /**
     * Introspect token to check validity
     */
    introspectToken: async (token: string): Promise<boolean> => {
        try {
            const response = await apiClient.post<ApiResponse<IntrospectResult>>(
                API_ENDPOINTS.AUTH.INTROSPECT,
                { token }
            );

            if (response.data.code !== 200) {
                return false;
            }

            return response.data.result.valid;
        } catch (error) {
            console.error('Token introspection failed:', error);
            return false;
        }
    },

    /**
     * Refresh access token using refresh token
     */
    refreshToken: async (refreshToken: string): Promise<RefreshTokenResult> => {
        try {
            const response = await apiClient.post<ApiResponse<RefreshTokenResult>>(
                API_ENDPOINTS.AUTH.REFRESH,
                { token: refreshToken }
            );

            if (response.data.code !== 200) {
                throw new Error(response.data.message || 'Token refresh failed');
            }

            return response.data.result;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Failed to refresh token'
            );
        }
    },

    /**
     * Logout user
     */
    logout: async (token: string): Promise<void> => {
        try {
            await apiClient.post<ApiResponse<null>>(
                API_ENDPOINTS.AUTH.LOGOUT,
                { token }
            );
        } catch (error) {
            console.error('Logout API call failed:', error);
        }
    },
};

export default authService;


//=================================================================================
// Note: Phiên bản catch lỗi bằng /api/helper.ts (Có thể khó nhận biết lỗi cụ thể)
//=================================================================================

// src/api/services/auth.service.ts (Simplified)
// import apiClient from '../client';
// import { API_ENDPOINTS } from '../endpoints';
// import type { User } from '@/types/user.types';
// import type { ApiResponse } from '@/types/common.types';
// import { handleApiResponse, getErrorMessage } from '../helpers';

// export interface LoginResult {
//   authenticated: boolean;
//   user: User;
//   token: string;
// }

// export interface IntrospectResult {
//   valid: boolean;
// }

// export interface RefreshTokenResult {
//   authenticated: boolean;
//   user: User;
//   token: string;
// }

// export const authService = {
//   /**
//    * Login with email and password
//    */
//   login: async (email: string, password: string): Promise<LoginResult> => {
//     try {
//       const response = await apiClient.post<ApiResponse<LoginResult>>(
//         API_ENDPOINTS.AUTH.LOGIN,
//         { email, password }
//       );
//       return handleApiResponse(response.data);
//     } catch (error: any) {
//       throw new Error(getErrorMessage(error));
//     }
//   },

//   /**
//    * Get current authenticated user
//    */
//   getCurrentUser: async (): Promise<User> => {
//     try {
//       const response = await apiClient.get<ApiResponse<User>>(
//         API_ENDPOINTS.AUTH.ME
//       );
//       return handleApiResponse(response.data);
//     } catch (error: any) {
//       throw new Error(getErrorMessage(error));
//     }
//   },

//   /**
//    * Introspect token
//    */
//   introspectToken: async (token: string): Promise<boolean> => {
//     try {
//       const response = await apiClient.post<ApiResponse<IntrospectResult>>(
//         API_ENDPOINTS.AUTH.INTROSPECT,
//         { token }
//       );
//       return handleApiResponse(response.data).valid;
//     } catch (error) {
//       console.error('Token introspection failed:', error);
//       return false;
//     }
//   },

//   /**
//    * Refresh access token
//    */
//   refreshToken: async (refreshToken: string): Promise<RefreshTokenResult> => {
//     try {
//       const response = await apiClient.post<ApiResponse<RefreshTokenResult>>(
//         API_ENDPOINTS.AUTH.REFRESH,
//         { token: refreshToken }
//       );
//       return handleApiResponse(response.data);
//     } catch (error: any) {
//       throw new Error(getErrorMessage(error));
//     }
//   },

//   /**
//    * Logout user
//    */
//   logout: async (token: string): Promise<void> => {
//     try {
//       await apiClient.post<ApiResponse<null>>(
//         API_ENDPOINTS.AUTH.LOGOUT,
//         { token }
//       );
//     } catch (error) {
//       console.error('Logout API call failed:', error);
//     }
//   },
// };

// export default authService;