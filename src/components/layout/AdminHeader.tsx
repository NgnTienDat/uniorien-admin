import React from 'react';
import { User, ChevronDown, LogOut } from 'lucide-react';


interface AdminHeaderProps {
    user: any;
    userMenuOpen: boolean;
    setUserMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
    currentTitle: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    user,
    userMenuOpen,
    setUserMenuOpen,
    handleLogout,
    // currentTitle
}) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
            {/* Page Title / Breadcrumb */}
            <div className="flex flex-col justify-center">
                {/* <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    {currentTitle}
                </h2> */}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className={`
                            flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all duration-200
                            ${userMenuOpen
                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                : 'bg-transparent border-transparent hover:bg-slate-50'
                            }
                        `}
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
                            <User size={16} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                            {user?.fullName || 'Account'}
                        </span>
                        <ChevronDown
                            size={16}
                            className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180 text-blue-500' : ''}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setUserMenuOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <p className="text-sm font-bold text-slate-800">
                                        {user?.fullName}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">
                                        {user?.email}
                                    </p>
                                </div>

                                <div className="p-1.5">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};