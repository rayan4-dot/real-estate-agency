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

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', type: '', min: '', max: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties()
            .then(data => setProperties(Array.isArray(data) ? data : []))
            .catch(() => setError('Failed to load properties.'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = Array.isArray(properties) ? properties.filter(p =>
        (!filters.city || p.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.min || p.price >= Number(filters.min)) &&
        (!filters.max || p.price <= Number(filters.max))
    ) : [];

    return (
        <div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold mb-8 text-indigo-800 text-center">All Properties</motion.h1>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <input type="text" placeholder="City" className="px-4 py-2 rounded border" value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))} />
                <select className="px-4 py-2 rounded border" value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="studio">Studio</option>
                    <option value="villa">Villa</option>
                </select>
                <input type="number" placeholder="Min Price" className="px-4 py-2 rounded border" value={filters.min} onChange={e => setFilters(f => ({ ...f, min: e.target.value }))} />
                <input type="number" placeholder="Max Price" className="px-4 py-2 rounded border" value={filters.max} onChange={e => setFilters(f => ({ ...f, max: e.target.value }))} />
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filtered.map((property, idx) => (
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
        </div>
    );
} 