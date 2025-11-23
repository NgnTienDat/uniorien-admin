// src/routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import NotFound from '@/pages/NotFound';
import { Login } from '@/pages/login/Login';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Dashboard } from '@/pages/dashboard/Dashboard';


export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            // {
            //     path: 'users',
            //     children: [
            //         { index: true, element: <UserList /> },
            //         { path: ':id', element: <UserDetail /> },
            //     ],
            // },
            // {
            //     path: 'universities',
            //     children: [
            //         { index: true, element: <UniversityList /> },
            //         { path: ':code/edit', element: <UniversityEdit /> },
            //     ],
            // },
            // {
            //     path: 'comments',
            //     element: <CommentList />,
            // },
            // {
            //     path: 'news',
            //     children: [
            //         { index: true, element: <NewsList /> },
            //         { path: 'create', element: <NewsCreate /> },
            //         { path: ':id/edit', element: <NewsEdit /> },
            //     ],
            // },
            // {
            //     path: 'scraping',
            //     children: [
            //         { index: true, element: <ScrapingDashboard /> },
            //         { path: 'verify', element: <DataVerification /> },
            //     ],
            // },
            // {
            //     path: 'majors',
            //     element: <MajorList />,
            // },
            // {
            //     path: 'major-groups',
            //     element: <MajorGroupList />,
            // },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);