import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const fetchProperties = async () => {
    try {
        const res = await axios.get('/api/properties');
        return res.data;
    } catch (e) {
        try {
            const res = await axios.get('/properties');
            return res.data;
        } catch (err) {
            throw err;
        }
    }
};

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties()
            .then(data => setProperties(Array.isArray(data) ? data : []))
            .catch(() => setError('Failed to load properties.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center h-[60vh] bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)'}}>
                <div className="absolute inset-0 bg-black/40" />
                <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white"
                >
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Find Your Dream Home</h1>
                    <p className="text-xl mb-8 drop-shadow">Browse the best properties, handpicked for you.</p>
                    <a href="#listings" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold shadow-lg transition">Browse Listings</a>
                </motion.div>
            </section>

            {/* Property Listings */}
            <section id="listings" className="max-w-7xl mx-auto py-16 px-4">
                <motion.h2 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }}
                    className="text-3xl font-bold mb-10 text-indigo-800 text-center"
                >
                    Featured Properties
                </motion.h2>
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-16">{error}</div>
                ) : Array.isArray(properties) && properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {properties.map((property, idx) => (
                            <motion.div
                                key={property.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300 flex flex-col"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <img
                                    src={property.photo_url || `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${property.id}`}
                                    alt={property.title}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-indigo-700">{property.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-1">{property.description?.slice(0, 80) || 'No description.'}...</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-lg font-bold text-indigo-600">${property.price?.toLocaleString() || 'N/A'}</span>
                                        <span className="text-sm text-gray-500">{property.city}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-16">No properties found.</div>
                )}
            </section>

            {/* Call to Action */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7 }}
                className="py-16 bg-indigo-700 text-white text-center mt-16"
            >
                <h2 className="text-3xl font-bold mb-4">Ready to find your next home?</h2>
                <p className="mb-8 text-lg">Sign up or log in to save your favorites and book appointments!</p>
                <a href="/register" className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition">Get Started</a>
            </motion.section>
        </div>
    );
} 