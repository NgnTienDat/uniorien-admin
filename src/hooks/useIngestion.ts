import { aiIngestionService } from '@/api/services/ai.ingestion.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useIngestion = () => {
    const queryClient = useQueryClient();

    const {
            data,
            isLoading,
            isError,
            error,
            refetch,
        } = useQuery({
            queryKey: ['ingestion-status'],
            queryFn: () => aiIngestionService.getIngestionStatus(),
            staleTime: 30000,
        });
    
        const ingestData = useMutation({
            mutationFn: () =>
                aiIngestionService.ingestData(),
            onSuccess: () => {
                toast.success('Starting ingestion process');
                queryClient.invalidateQueries({ queryKey: ['ingestion-status'] });
            },
            onError: (error: any) => {
                toast.error(error.message || 'Failed to fetch ingestion status');
                console.error(error);
            },
        });
    return {
        ingestionStatus: data,
        isLoadingIngestionStatus: isLoading,
        ingestData,
        refetchIngestionStatus: refetch,
    };
}