import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        mutate: loginMutation,
        mutateAsync: loginMutationAsync,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            login(email, password),
        onSuccess: () => {
            navigate('/dashboard');
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
            // Error is already thrown from authService, will be handled in the component
        },
    });

    return {
        login: loginMutation,
        loginAsync: loginMutationAsync,
        isPending,
        isError,
        error,
    };
};