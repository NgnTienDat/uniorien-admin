// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type GetUsersParams } from '@/api/services/user.service';
import { toast } from 'sonner';

export const useUsers = (params?: GetUsersParams) => {
    const queryClient = useQueryClient();

    // Fetch users
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['users', params],
        queryFn: () => userService.getUsers(params),
        staleTime: 30000, // 30 seconds
    });

    // Lock user mutation
    const lockUserMutation = useMutation({
        mutationFn: (id: string) =>
            userService.lockUser(id),
        onSuccess: () => {
            toast.success('User locked successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to lock user');
            console.error(error);

        },
    });

    // Unlock user mutation
    const unlockUserMutation = useMutation({
        mutationFn: (id: string) => userService.unlockUser(id),
        onSuccess: () => {
            toast.success('User unlocked successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });

        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to unlock user');
            console.error(error);
        },
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => userService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete user');
            console.error(error);

        },
    });

    return {
        users: data?.content || [],
        pageNumber: data?.pageNumber || 0,
        pageSize: data?.pageSize || 3,
        totalPages: data?.totalPages || 0,
        totalElements: data?.totalElements || 0,
        isFirst: data?.first || false,
        isLast: data?.last || false,
        isEmpty: data?.empty || false,
        isLoading,
        isError,
        error,
        refetch,
        lockUser: lockUserMutation.mutate,
        unlockUser: unlockUserMutation.mutate,
        deleteUser: deleteUserMutation.mutate,
        isLocking: lockUserMutation.isPending,
        isUnlocking: unlockUserMutation.isPending,
        isDeleting: deleteUserMutation.isPending,
    };
};