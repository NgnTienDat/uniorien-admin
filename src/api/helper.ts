// src/api/helpers.ts
import type { ApiResponse } from '@/types/common.types';

/**
 * Generic helper to handle API responses
 * Throws error if code is not 200
 */
export function handleApiResponse<T>(response: ApiResponse<T>): T {
    if (response.code !== 200) {
        throw new Error(response.message || 'API request failed');
    }
    return response.result;
}

/**
 * Extract error message from API error
 */
export function getErrorMessage(error: any): string {
    return (
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred'
    );
}


