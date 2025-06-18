import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { usePage, Link } from '@inertiajs/react';

const fetchFavorites = async () => {
    try {
        const res = await axios.get('/api/favorite-properties');
        return res.data;
    } catch (e) {
        try {
            const res = await axios.get('/favorite-properties');
            return res.data;
        } catch (err) {
            throw err;
        }
    }
};

export default function Favorites() {
    const { auth } = usePage().props;
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (auth?.user) {
            fetchFavorites()
                .then(setFavorites)
                .catch(() => setError('Failed to load favorites.'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [auth]);

    if (!auth?.user) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <h2 className="text-3xl font-bold mb-4">Sign in to view your favorite properties!</h2>
                <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Login</Link>
            </motion.div>
        );
    }

    return (
        <div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold mb-8 text-indigo-800 text-center">My Favorites</motion.h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : favorites.length === 0 ? (
                <div className="text-center text-gray-500 py-16">No favorites yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {favorites.map((fav, idx) => (
                        <motion.div
                            key={fav.id || idx}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300 flex flex-col"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                            <img
                                src={fav.property?.photo_url || `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${fav.property?.id}`}
                                alt={fav.property?.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{fav.property?.title}</h3>
                                <p className="text-gray-600 mb-4 flex-1">{fav.property?.description?.slice(0, 80) || 'No description.'}...</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-bold text-indigo-600">${fav.property?.price?.toLocaleString() || 'N/A'}</span>
                                    <span className="text-sm text-gray-500">{fav.property?.city}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
} 