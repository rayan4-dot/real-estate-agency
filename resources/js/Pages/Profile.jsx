import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth?.user;

    if (!user) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <h2 className="text-3xl font-bold mb-4">Sign in to view your profile!</h2>
                <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Login</Link>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="flex flex-col items-center">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="w-24 h-24 rounded-full mb-4 shadow" />
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <div className="flex gap-2 mt-2">
                    {(user.roles || []).map((role, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">{role}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
} 