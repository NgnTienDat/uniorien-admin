// src/pages/Dashboard/Dashboard.tsx
import { useAuth } from '@/contexts/AuthContext';
import { Users, GraduationCap, MessageSquare, Newspaper } from 'lucide-react';

export const Dashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Users', value: '1,234', icon: <Users size={24} />, color: 'bg-blue-500' },
        { label: 'Universities', value: '89', icon: <GraduationCap size={24} />, color: 'bg-green-500' },
        { label: 'Comments', value: '567', icon: <MessageSquare size={24} />, color: 'bg-yellow-500' },
        { label: 'News Articles', value: '45', icon: <Newspaper size={24} />, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user?.fullName}!
                </h1>
                <p className="text-gray-600 mt-1">
                    Here's what's happening with your platform today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">New user registered</p>
                                <p className="text-xs text-gray-500">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">University data updated</p>
                                <p className="text-xs text-gray-500">12 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">New comment pending review</p>
                                <p className="text-xs text-gray-500">23 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <p className="text-sm font-medium text-gray-900">Add University</p>
                            <p className="text-xs text-gray-500 mt-1">Create new entry</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <p className="text-sm font-medium text-gray-900">Create News</p>
                            <p className="text-xs text-gray-500 mt-1">Publish article</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <p className="text-sm font-medium text-gray-900">Start Scraping</p>
                            <p className="text-xs text-gray-500 mt-1">Collect data</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <p className="text-sm font-medium text-gray-900">View Reports</p>
                            <p className="text-xs text-gray-500 mt-1">Analytics</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};