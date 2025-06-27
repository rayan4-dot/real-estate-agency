import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function CategoryProperties({ categoryId }) {
    const [category, setCategory] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/categories/${categoryId}`)
            .then(res => {
                setCategory(res.data);
                setProperties(res.data.properties || []);
            })
            .catch(() => setError('Failed to load category properties.'))
            .finally(() => setLoading(false));
    }, [categoryId]);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-16">{error}</div>;
    }

    if (!category) {
        return <div className="text-center text-gray-500 py-16">Category not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-indigo-800">{category.name}</h1>
                    <p className="text-lg text-gray-600 mb-6">{category.description}</p>
                    <Link 
                        href="/categories"
                        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                    >
                        ← Back to Categories
                    </Link>
                </div>
                
                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property, idx) => (
                            <motion.div
                                key={property.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                {property.photos && property.photos.length > 0 && (
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={property.photos[0].url} 
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-indigo-800 mb-2">{property.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">{property.city}</span>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">{property.type}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${property.status === 'available' ? 'bg-blue-100 text-blue-700' : property.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{property.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-sm text-gray-500">
                                            <span>{property.surface}m² • {property.rooms} rooms • {property.bedrooms} bedrooms</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-indigo-600">{property.price.toLocaleString()} €</span>
                                        <Link 
                                            href={`/properties/${property.id}`}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-16">
                        <p className="text-lg">No properties found in this category.</p>
                        <p className="text-sm mt-2">Check back later for new properties.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
} 