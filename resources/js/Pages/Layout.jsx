import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.roles?.includes('admin');
    const isAuthenticated = !!auth?.user;

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header/Navbar */}
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-white/80 backdrop-blur shadow-md sticky top-0 z-50"
            >
                <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-indigo-700">
                        <span className="inline-block w-8 h-8 bg-indigo-600 rounded-full mr-2 animate-pulse" />
                        Rayan Immobilier
                    </Link>
                    <div className="flex gap-6 items-center text-lg font-medium">
                        {/* Public Navigation - Always visible */}
                        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
                        <Link href="/properties" className="hover:text-indigo-600 transition">Properties</Link>
                        <Link href="/categories" className="hover:text-indigo-600 transition">Categories</Link>
                        <Link href="/blog-posts" className="hover:text-indigo-600 transition">Blog</Link>
                        
                        {/* Admin Navigation - Only for admin users */}
                        {isAdmin && (
                            <>
                                <Link href="/admin" className="hover:text-indigo-600 transition">Dashboard</Link>
                                <Link href="/admin/properties" className="hover:text-indigo-600 transition">Manage Properties</Link>
                                <Link href="/admin/users" className="hover:text-indigo-600 transition">Users</Link>
                            </>
                        )}
                        
                        {/* User Navigation - Only for non-admin authenticated users */}
                        {isAuthenticated && !isAdmin && (
                            <>
                                <Link href="/favorites" className="hover:text-indigo-600 transition">Favorites</Link>
                                <Link href="/profile" className="hover:text-indigo-600 transition">Profile</Link>
                            </>
                        )}
                        
                        {/* Authentication Links */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">
                                    Welcome, {auth.user.name}
                                    {isAdmin && <span className="ml-1 text-indigo-600">(Admin)</span>}
                                </span>
                                <Link 
                                    href="/logout" 
                                    method="post" 
                                    as="button"
                                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-indigo-600 transition">Login</Link>
                                <Link href="/register" className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>
            </motion.header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-white/80 backdrop-blur py-6 mt-12 text-center text-gray-500 text-sm shadow-inner"
            >
                &copy; {new Date().getFullYear()} Rayan Immobilier. All rights reserved.
            </motion.footer>
        </div>
    );
} 