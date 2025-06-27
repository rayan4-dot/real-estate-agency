import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';

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
    const { auth } = usePage().props;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', type: '', min: '', max: '' });
    const [error, setError] = useState(null);
    const [favoriteStates, setFavoriteStates] = useState({});
    const [favoriteLoading, setFavoriteLoading] = useState({});
    const [filterErrors, setFilterErrors] = useState({});

    useEffect(() => {
        fetchProperties()
            .then(data => {
                const propertiesData = Array.isArray(data) ? data : [];
                setProperties(propertiesData);
                // Check favorite status for each property
                if (auth?.user) {
                    propertiesData.forEach(property => {
                        checkFavoriteStatus(property.id);
                    });
                }
            })
            .catch(() => setError('Failed to load properties.'))
            .finally(() => setLoading(false));
    }, [auth]);

    const validateFilters = (newFilters) => {
        const errors = {};
        
        // Validate minimum price
        if (newFilters.min !== '') {
            const minPrice = Number(newFilters.min);
            if (minPrice < 1) {
                errors.min = 'Minimum price must be at least 1';
            }
        }
        
        // Validate maximum price
        if (newFilters.max !== '') {
            const maxPrice = Number(newFilters.max);
            if (maxPrice < 1) {
                errors.max = 'Maximum price must be at least 1';
            }
        }
        
        // Validate min vs max
        if (newFilters.min !== '' && newFilters.max !== '') {
            const minPrice = Number(newFilters.min);
            const maxPrice = Number(newFilters.max);
            if (minPrice > maxPrice) {
                errors.min = 'Minimum price cannot be greater than maximum price';
                errors.max = 'Maximum price cannot be less than minimum price';
            }
        }
        
        return errors;
    };

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        
        // Validate filters
        const errors = validateFilters(newFilters);
        setFilterErrors(errors);
    };

    const checkFavoriteStatus = async (propertyId) => {
        try {
            const res = await axios.get(`/api/favorite-properties/check/${propertyId}`, { withCredentials: true });
            setFavoriteStates(prev => ({ ...prev, [propertyId]: res.data.is_favorited }));
        } catch (error) {
            console.error('Failed to check favorite status:', error);
        }
    };

    const handleFavoriteToggle = async (propertyId, e) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Prevent event bubbling

        if (!auth?.user) {
            alert('Please log in to add favorites');
            return;
        }

        setFavoriteLoading(prev => ({ ...prev, [propertyId]: true }));
        try {
            if (favoriteStates[propertyId]) {
                // Remove from favorites
                await axios.delete(`/api/favorite-properties/${auth.user.id}/${propertyId}`, { withCredentials: true });
                setFavoriteStates(prev => ({ ...prev, [propertyId]: false }));
            } else {
                // Add to favorites
                await axios.post('/api/favorite-properties', { property_id: propertyId }, { withCredentials: true });
                setFavoriteStates(prev => ({ ...prev, [propertyId]: true }));
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            alert('Failed to update favorites');
        } finally {
            setFavoriteLoading(prev => ({ ...prev, [propertyId]: false }));
        }
    };

    const filtered = Array.isArray(properties) ? properties.filter(p => {
        // Only apply price filters if there are no validation errors
        const hasPriceErrors = filterErrors.min || filterErrors.max;
        
        return (
        (!filters.city || p.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.type || p.type === filters.type) &&
            (!hasPriceErrors && !filters.min || p.price >= Number(filters.min)) &&
            (!hasPriceErrors && !filters.max || p.price <= Number(filters.max))
        );
    }) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-indigo-800 text-center">All Properties</h1>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <input 
                        type="text" 
                        placeholder="City" 
                        className="px-4 py-2 rounded border" 
                        value={filters.city} 
                        onChange={e => handleFilterChange('city', e.target.value)} 
                    />
                    <select 
                        className="px-4 py-2 rounded border" 
                        value={filters.type} 
                        onChange={e => handleFilterChange('type', e.target.value)}
                    >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                </select>
                    <div className="relative">
                        <input 
                            type="number" 
                            placeholder="Min Price" 
                            min="1"
                            className={`px-4 py-2 rounded border ${filterErrors.min ? 'border-red-500' : ''}`}
                            value={filters.min} 
                            onChange={e => handleFilterChange('min', e.target.value)} 
                        />
                        {filterErrors.min && (
                            <div className="absolute top-full left-0 text-red-500 text-xs mt-1 whitespace-nowrap">
                                {filterErrors.min}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <input 
                            type="number" 
                            placeholder="Max Price" 
                            min="1"
                            className={`px-4 py-2 rounded border ${filterErrors.max ? 'border-red-500' : ''}`}
                            value={filters.max} 
                            onChange={e => handleFilterChange('max', e.target.value)} 
                        />
                        {filterErrors.max && (
                            <div className="absolute top-full left-0 text-red-500 text-xs mt-1 whitespace-nowrap">
                                {filterErrors.max}
                            </div>
                        )}
                    </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((property, idx) => (
                        <motion.div
                            key={property.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                                <div className="relative">
                                    <Link href={`/properties/${property.id}`}>
                            <img
                                            src={property.photos && property.photos.length > 0 ? property.photos[0].url : `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${property.id}`}
                                alt={property.title}
                                className="h-48 w-full object-cover"
                            />
                                    </Link>
                                    <button
                                        onClick={(e) => handleFavoriteToggle(property.id, e)}
                                        disabled={favoriteLoading[property.id]}
                                        className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 transition-colors duration-200 shadow-md"
                                    >
                                        {favoriteLoading[property.id] ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                                        ) : (
                                            <svg className={`w-5 h-5 ${favoriteStates[property.id] ? 'fill-red-500 text-red-500' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <Link href={`/properties/${property.id}`}>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">{property.city}</span>
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold capitalize">{property.type}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${property.status === 'available' ? 'bg-blue-100 text-blue-700' : property.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{property.status}</span>
                                            {property.category && (
                                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{property.category.name}</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-800 line-clamp-1">{property.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{property.description?.slice(0, 100) || 'No description available.'}...</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg font-bold text-indigo-600">${property.price?.toLocaleString() || 'N/A'}</span>
                                            <div className="text-sm text-gray-500">
                                                <span>{property.surface}m² • {property.rooms} rooms • {property.bedrooms} bedrooms</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                                                View Details
                                            </span>
                                </div>
                            </div>
                                </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-16">No properties found.</div>
            )}
            </motion.div>
        </div>
    );
} 