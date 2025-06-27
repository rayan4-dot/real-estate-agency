import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';

const ADMIN_LINKS = [
    { name: 'Dashboard', href: '/admin', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { name: 'Users', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { name: 'Properties', href: '/admin/properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Categories', href: '/admin/categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { name: 'Photos', href: '/admin/photos', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Blog Posts', href: '/admin/blog-posts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { name: 'Appointments', href: '/admin/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Contact Requests', href: '/admin/contact-requests', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Property Submissions', href: '/admin/property-submissions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Roles', href: '/admin/roles', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
];

export default function AdminLayout({ children, title, subtitle }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.roles?.includes('admin');
    const user = auth?.user;
    const currentPath = window.location.pathname;

    if (!user || !isAdmin) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <h2 className="text-3xl font-bold mb-4 text-red-600">Forbidden</h2>
                <p className="text-gray-600">You do not have permission to access the admin panel.</p>
                <Link href="/" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Go Home</Link>
            </motion.div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-800 text-white flex flex-col py-8 px-4 sticky top-0 min-h-screen shadow-xl">
                <div className="text-2xl font-extrabold mb-10 text-center tracking-wide">Admin Panel</div>
                <nav className="flex flex-col gap-2">
                    {ADMIN_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-3 rounded-lg transition text-lg font-medium flex items-center gap-3 ${
                                currentPath === link.href
                                    ? 'bg-indigo-700 text-white shadow-lg' 
                                    : 'hover:bg-indigo-700'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                            </svg>
                            {link.name}
                        </Link>
                    ))}
                </nav>
                
                {/* User info at bottom */}
                <div className="mt-auto pt-8 border-t border-indigo-700">
                    <div className="text-center">
                        <div className="text-sm text-indigo-200">Logged in as</div>
                        <div className="font-semibold text-white">{user?.name || 'Admin'}</div>
                        <button 
                            onClick={() => router.visit('/logout', { method: 'post' })}
                            className="mt-2 text-sm text-indigo-200 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {title && (
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
} 