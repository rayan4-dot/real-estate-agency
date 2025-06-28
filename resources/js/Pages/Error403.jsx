import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Error403() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
            >
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Sorry, you don't have permission to access this page. 
                    Please contact an administrator if you believe this is an error.
                </p>
                <div className="space-y-4">
                    <Link 
                        href="/"
                        className="inline-block w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go Home
                    </Link>
                    <Link 
                        href="/login"
                        className="inline-block w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
                    >
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
} 