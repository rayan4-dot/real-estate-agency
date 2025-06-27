import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { usePage, Link } from '@inertiajs/react';

export default function Favorites() {
    const { auth } = usePage().props;
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removingId, setRemovingId] = useState(null);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get('/api/favorite-properties', { withCredentials: true });
            return res.data;
        } catch (err) {
            throw err;
        }
    };

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

    const handleRemoveFavorite = async (propertyId) => {
        if (!window.confirm('Are you sure you want to remove this property from favorites?')) {
            return;
        }

        setRemovingId(propertyId);
        try {
            console.log('Removing favorite:', propertyId, 'for user:', auth.user.id);
            const response = await axios.delete(`/api/favorite-properties/${auth.user.id}/${propertyId}`, { 
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            console.log('Remove response:', response.data);
            setFavorites(favorites.filter(fav => fav.property_id !== propertyId));
        } catch (error) {
            console.error('Failed to remove favorite:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            alert(`Failed to remove from favorites: ${error.response?.data?.message || error.message}`);
        } finally {
            setRemovingId(null);
        }
    };

    if (!auth?.user) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">Sign in to view your favorite properties!</h2>
                <p className="text-gray-600 mb-8">Save properties you love and access them anytime.</p>
                <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Login</Link>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-indigo-800 text-center">My Favorites</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-16">{error}</div>
                ) : favorites.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
                        <p className="text-gray-600 mb-6">Start exploring properties and add them to your favorites!</p>
                        <Link 
                            href="/properties" 
                            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                        >
                            Browse Properties
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <p className="text-lg text-gray-600">You have {favorites.length} favorite propert{favorites.length === 1 ? 'y' : 'ies'}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {favorites.map((fav, idx) => (
                                <motion.div
                                    key={fav.id || idx}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                >
                                    <div className="relative">
                                        <img
                                            src={fav.property?.photos?.[0]?.url || `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${fav.property?.id}`}
                                            alt={fav.property?.title}
                                            className="h-48 w-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveFavorite(fav.property_id)}
                                            disabled={removingId === fav.property_id}
                                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200"
                                        >
                                            {removingId === fav.property_id ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">{fav.property?.city}</span>
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold capitalize">{fav.property?.type}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fav.property?.status === 'available' ? 'bg-blue-100 text-blue-700' : fav.property?.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{fav.property?.status}</span>
                                            {fav.property?.category && (
                                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{fav.property.category.name}</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-800 line-clamp-1">{fav.property?.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{fav.property?.description?.slice(0, 100) || 'No description available.'}...</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg font-bold text-indigo-600">${fav.property?.price?.toLocaleString() || 'N/A'}</span>
                                            <div className="text-sm text-gray-500">
                                                <span>{fav.property?.surface}m² • {fav.property?.rooms} rooms • {fav.property?.bedrooms} bedrooms</span>
                                            </div>
                                        </div>
                                        <Link 
                                            href={`/properties/${fav.property_id}`}
                                            className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
} 