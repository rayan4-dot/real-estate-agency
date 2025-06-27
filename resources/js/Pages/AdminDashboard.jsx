import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdminLayout from '../Components/AdminLayout';

export default function AdminDashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth?.roles?.includes('admin');
    const user = auth?.user;

    const [stats, setStats] = useState({ users: 0, properties: 0, blogPosts: 0 });
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
                .then(res => {
                    setStats({
                        users: res.data.users ?? 0,
                        properties: res.data.properties ?? 0,
                        blogPosts: res.data.blogPosts ?? 0,
                    });
                })
                .catch(() => setError('Failed to fetch stats.'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    return (
        <AdminLayout 
            title="Admin Dashboard" 
            subtitle="Welcome to your admin control panel"
        >
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
                        >
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.users}</div>
                            <div className="text-gray-600">Users</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
                        >
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.properties}</div>
                            <div className="text-gray-600">Properties</div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
                        >
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.blogPosts}</div>
                            <div className="text-gray-600">Blog Posts</div>
                        </motion.div>
                    </div>
                    <div className="text-center text-gray-400 mt-12">
                        <p className="text-lg">Welcome, {user?.name || 'Admin'}!</p>
                        <p className="text-sm mt-2">Use the sidebar to manage users, properties, blog posts, and more.</p>
                    </div>
                </>
            )}
        </AdminLayout>
    );
} 