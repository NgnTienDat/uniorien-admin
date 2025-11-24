import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

interface AdminSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    menuItems: MenuItem[];
    isActive: (path: string) => boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
    sidebarOpen,
    setSidebarOpen,
    menuItems,
    isActive,
}) => {
    return (
        <SidebarProvider
            className={`
        ${sidebarOpen ? 'w-60' : 'w-20'}
        bg-gray-100 text-slate-700
        transition-all duration-300 ease-in-out
        flex flex-col border-r border-slate-200 shadow-xl z-50
      `}
        >
            {/* --- HEADER --- */}
            <div className={`
          h-16 flex items-center px-4 border-b border-slate-100
          ${sidebarOpen ? 'justify-between' : 'justify-center'}
      `}>

                {/* Logo Area */}
                {sidebarOpen ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-sm shrink-0">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-slate-800 tracking-tight whitespace-nowrap">
                            UniOrien
                        </h1>
                    </div>
                ) : (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="bg-blue-600 p-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        <GraduationCap size={20} className="text-white" />
                    </button>
                )}

                {sidebarOpen && (
                    <SidebarTrigger
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    />
                )}

            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const active = isActive(item.path);

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    title={!sidebarOpen ? item.label : undefined}
                                    className={`
                                        group flex items-center gap-3 px-3 py-2 rounded-xl
                                        font-medium transition-all duration-200
                                        ${active
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }
                                        ${!sidebarOpen && 'justify-center px-0'} 
                                    `}
                                >
                                    <span
                                        className={`
                                            shrink-0 transition-colors
                                            ${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    {sidebarOpen && (
                                        <span className="truncate text-sm">{item.label}</span>
                                    )}

                                    {/* Active Indicator (Dot) */}
                                    {active && sidebarOpen && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </SidebarProvider>
    );
};