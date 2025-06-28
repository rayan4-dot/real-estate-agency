import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdminLayout from '../Components/AdminLayout';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function AdminDashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth?.roles?.includes('admin');
    const user = auth?.user;

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Global axios 401 handler
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            err => {
                if (err.response && err.response.status === 401) {
                    router.visit('/login');
                }
                return Promise.reject(err);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    useEffect(() => {
        if (isAdmin) {
            axios.get('/api/stats', { withCredentials: true })
                .then(res => setStats(res.data))
                .catch(() => setError('Failed to fetch stats.'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const StatCard = ({ title, value, icon, color, trend, subtitle }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatNumber(value)}</p>
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <svg className={`w-4 h-4 mr-1 ${trend > 0 ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );

    if (loading) {
        return (
            <AdminLayout title="Admin Dashboard" subtitle="Loading your analytics...">
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout title="Admin Dashboard" subtitle="Error loading dashboard">
                <div className="text-center text-red-500 py-16 bg-red-50 rounded-lg">{error}</div>
            </AdminLayout>
        );
    }

    if (!stats) return null;

    // Chart data
    const propertyTrendData = {
        labels: stats.monthlyProperties.map(item => item.month),
        datasets: [
            {
                label: 'Properties Added',
                data: stats.monthlyProperties.map(item => item.count),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const userTrendData = {
        labels: stats.monthlyUsers.map(item => item.month),
        datasets: [
            {
                label: 'New Users',
                data: stats.monthlyUsers.map(item => item.count),
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderColor: 'rgb(34, 197, 94)',
                borderWidth: 1,
            },
        ],
    };

    const propertyStatusData = {
        labels: Object.keys(stats.propertyStatus),
        datasets: [
            {
                data: Object.values(stats.propertyStatus),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderWidth: 2,
                borderColor: '#fff',
            },
        ],
    };

    const priceRangeData = {
        labels: Object.keys(stats.priceRanges),
        datasets: [
            {
                label: 'Properties',
                data: Object.values(stats.priceRanges),
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <AdminLayout 
            title="Admin Dashboard" 
            subtitle={`Welcome back, ${user?.name || 'Admin'}! Here's what's happening with your real estate platform.`}
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Users"
                    value={stats.basicStats.users}
                    icon={
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    }
                    color="bg-blue-500"
                    trend={stats.recentActivity.newUsers > 0 ? 12.5 : 0}
                    subtitle={`${stats.recentActivity.newUsers} new this week`}
                />
                <StatCard
                    title="Properties"
                    value={stats.basicStats.properties}
                    icon={
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                    color="bg-green-500"
                    trend={stats.recentActivity.newProperties > 0 ? 8.2 : 0}
                    subtitle={`${stats.recentActivity.newProperties} new this week`}
                />
                <StatCard
                    title="Appointments"
                    value={stats.basicStats.appointments}
                    icon={
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                    color="bg-orange-500"
                    trend={stats.recentActivity.newAppointments > 0 ? 15.3 : 0}
                    subtitle={`${stats.recentActivity.newAppointments} new this week`}
                />
                <StatCard
                    title="Contact Requests"
                    value={stats.basicStats.contactRequests}
                    icon={
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    }
                    color="bg-purple-500"
                    trend={stats.recentActivity.newContactRequests > 0 ? 6.7 : 0}
                    subtitle={`${stats.recentActivity.newContactRequests} new this week`}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Property Trend Chart */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Growth Trend</h3>
                    <Line data={propertyTrendData} options={chartOptions} />
                </motion.div>

                {/* User Registration Trend */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration Trend</h3>
                    <Bar data={userTrendData} options={chartOptions} />
                </motion.div>
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Property Status Distribution */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Status</h3>
                    <Doughnut data={propertyStatusData} options={doughnutOptions} />
                </motion.div>

                {/* Price Range Distribution */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range Distribution</h3>
                    <Bar data={priceRangeData} options={chartOptions} />
                </motion.div>

                {/* Top Categories */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                    <div className="space-y-3">
                        {stats.topCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${
                                        index === 0 ? 'bg-yellow-400' : 
                                        index === 1 ? 'bg-gray-400' : 
                                        index === 2 ? 'bg-orange-400' : 'bg-blue-400'
                                    }`}></div>
                                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{category.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
            >
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
                        <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm font-medium">Add Property</span>
                    </button>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
                        <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm font-medium">Write Blog</span>
                    </button>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
                        <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-medium">Manage Users</span>
                    </button>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
                        <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm font-medium">View Reports</span>
                    </button>
                </div>
            </motion.div>
        </AdminLayout>
    );
} 