import { aiServiceClient } from "@/api/axiosClient";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { AIApiResponse } from "@/types/common.types";
import type { IngestionStatusResponse } from "@/types/ingestion.types";

export const aiIngestionService = {
    ingestData: async (): Promise<void> => {
        try {
            const response = await aiServiceClient.post<AIApiResponse<null>>(
                API_ENDPOINTS.AI.INGEST_DATA
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Data ingestion start failed');
            }
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'An unknown error occurred during data ingestion'
            );
        }
    },

    getIngestionStatus: async (): Promise<IngestionStatusResponse> => {
        try {
            const response = await aiServiceClient.get<AIApiResponse<IngestionStatusResponse>>(
                API_ENDPOINTS.AI.INGEST_STATUS
            );
            if (!response.data.success || !response.data.data) {
                throw new Error(response.data.message || 'Failed to fetch ingestion status');
            }
            return response.data.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'An unknown error occurred while fetching ingestion status'
            );
        }
    }

};