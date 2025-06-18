import React, { useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function PropertyDetails() {
    const { id } = usePage().props;
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/properties/${id}`).then(res => setProperty(res.data)).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }
    if (!property) {
        return <div className="text-center text-gray-500 py-16">Property not found.</div>;
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
            <img src={property.photo_url || `https://source.unsplash.com/900x500/?house,home,real-estate&sig=${property.id}`} alt={property.title} className="w-full h-80 object-cover rounded-lg mb-6" />
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">{property.title}</h1>
            <div className="flex gap-4 text-gray-500 mb-4">
                <span>{property.city}</span>
                <span>{property.type}</span>
                <span>{property.status}</span>
            </div>
            <p className="text-lg text-gray-700 mb-6">{property.description}</p>
            <div className="flex items-center gap-8 mb-6">
                <span className="text-2xl font-bold text-indigo-600">${property.price?.toLocaleString() || 'N/A'}</span>
                <span className="text-gray-500">{property.surface} m²</span>
                <span className="text-gray-500">{property.rooms} rooms</span>
                <span className="text-gray-500">{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex gap-4 mt-8">
                <Link href="/appointments" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Book Appointment</Link>
                <button className="px-6 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-full font-semibold hover:bg-indigo-50 transition">Add to Favorites</button>
            </div>
        </motion.div>
    );
} 