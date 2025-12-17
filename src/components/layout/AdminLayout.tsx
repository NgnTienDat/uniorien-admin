import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    MessageSquare,
    Newspaper,
    Database,
    BookOpen,
    FolderTree,
} from 'lucide-react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';



interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/universities', label: 'Universities', icon: <GraduationCap size={20} /> },
    { path: '/comments', label: 'Comments', icon: <MessageSquare size={20} /> },
    { path: '/news', label: 'News', icon: <Newspaper size={20} /> },
    { path: '/scraping', label: 'Data Scraping', icon: <Database size={20} /> },
    { path: '/majors', label: 'Majors', icon: <BookOpen size={20} /> },
    { path: '/major-groups', label: 'Major Groups', icon: <FolderTree size={20} /> },
    { path: '/chatbot-ingestion', label: 'Chatbot Ingestion', icon: <Database size={20} /> },
];

export const AdminLayout = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const handleLogout = async () => {
        await logout();
    };

    const currentTitle = menuItems.find((item) => isActive(item.path))?.label || 'Admin Panel';
    return (
        <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                menuItems={menuItems}
                isActive={isActive}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">

                <AdminHeader
                    user={user}
                    userMenuOpen={userMenuOpen}
                    setUserMenuOpen={setUserMenuOpen}
                    handleLogout={handleLogout}
                    currentTitle={currentTitle}
                />

                <main className="flex-1 overflow-auto p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};