import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/categories')
            .then(res => setCategories(res.data))
            .catch(() => setError('Failed to load categories.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-16">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-indigo-800 text-center">Property Categories</h1>
                <p className="text-lg text-gray-600 text-center mb-12">Browse properties by category to find your perfect home</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-2">{category.name}</h3>
                                <p className="text-gray-600 mb-6">{category.description}</p>
                                <Link 
                                    href={`/categories/${category.id}`}
                                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                                >
                                    View Properties
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {categories.length === 0 && (
                    <div className="text-center text-gray-500 py-16">
                        <p className="text-lg">No categories available yet.</p>
                        <p className="text-sm mt-2">Check back later for new property categories.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
} 