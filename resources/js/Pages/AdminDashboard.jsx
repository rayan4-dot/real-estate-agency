import React, { useEffect, useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ADMIN_LINKS = [
    { name: 'Users', href: '/users' },
    { name: 'Properties', href: '/properties' },
    { name: 'Categories', href: '/categories' },
    { name: 'Photos', href: '/photos' },
    { name: 'Blog Posts', href: '/blog-posts' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Contact Requests', href: '/contact-requests' },
    { name: 'Property Submissions', href: '/property-submissions' },
    { name: 'Roles', href: '/roles' },
];

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

    if (!user || !isAdmin) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <h2 className="text-3xl font-bold mb-4 text-red-600">Forbidden</h2>
                <p className="text-gray-600">You do not have permission to access the admin dashboard.</p>
                <Link href="/" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Go Home</Link>
            </motion.div>
        );
    }

    return (
        <div className="flex min-h-[80vh]">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-800 text-white flex flex-col py-8 px-4 sticky top-0 min-h-screen shadow-xl">
                <div className="text-2xl font-extrabold mb-10 text-center tracking-wide">Admin Panel</div>
                <nav className="flex flex-col gap-4">
                    {ADMIN_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 rounded hover:bg-indigo-700 transition text-lg font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-10">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold text-indigo-700 mb-8 text-center">Admin Dashboard</motion.h1>
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-16">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                        <div className="bg-indigo-50 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.users}</div>
                            <div className="text-gray-600">Users</div>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.properties}</div>
                            <div className="text-gray-600">Properties</div>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-indigo-700 mb-2">{stats.blogPosts}</div>
                            <div className="text-gray-600">Blog Posts</div>
                        </div>
                    </div>
                )}
                <div className="text-center text-gray-400 mt-12">Welcome, admin! Use the sidebar to manage users, properties, blog posts, and more.</div>
            </main>
        </div>
    );
} 