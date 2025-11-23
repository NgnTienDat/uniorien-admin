// src/pages/unauthorized/Unauthorized.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <ShieldAlert size={64} className="text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Access Denied
                </h1>
                <p className="text-gray-600 mb-6">
                    You don't have permission to access the admin panel.
                </p>
                <Button
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Back to Login
                </Button>
            </div>
        </div>
    );
};