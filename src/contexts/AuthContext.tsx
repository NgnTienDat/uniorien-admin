// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '@/api/services/auth.service';
import type { User } from '@/types/user.types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initAuth();
    }, []);

    /**
     * Initialize authentication state
     */
    const initAuth = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const isValid = await authService.introspectToken(token);

            if (!isValid) {
                throw new Error('Token is invalid');
            }
            const userData = await authService.getCurrentUser();
            setUser(userData);

        } catch (error) {
            console.error('Auth initialization failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Login user
     */
    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);

            localStorage.setItem('accessToken', response.token);
            // Note: Your API doesn't return refresh token in login response
            // If it does, store it: localStorage.setItem('refreshToken', response.refreshToken);

            setUser(response.user);

            // toast.success('Login successful!');
        } catch (error: any) {
            // toast.error(error.message || 'Login failed');
            throw error;
        }
    };

    /**
     * Logout user
     */
    const logout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                await authService.logout(token);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
            // toast.info('Logged out successfully');
        }
    };

    /**
     * Refresh user data
     */
    const refreshUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to refresh user:', error);
            await logout();
        }
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role?.roleName === 'ADMIN';

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                isAdmin,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};