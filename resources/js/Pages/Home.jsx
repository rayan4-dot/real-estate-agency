import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
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

    const getPropertyImage = (property) => {
        if (property.photos && property.photos.length > 0) {
            return property.photos[0].url;
        }
        return `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${property.id}`;
    };

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
            description: "15+ years in real estate with a passion for helping families find their perfect homes."
        },
        {
            name: "Michael Chen",
            role: "Senior Real Estate Agent",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            description: "Specialized in luxury properties and investment opportunities."
        },
        {
            name: "Emma Rodriguez",
            role: "Property Consultant",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            description: "Expert in residential properties and first-time homebuyer guidance."
        },
        {
            name: "David Thompson",
            role: "Commercial Specialist",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            description: "Focused on commercial real estate and investment properties."
        }
    ];

    const features = [
        {
            icon: "🏠",
            title: "Expert Guidance",
            description: "Our experienced team provides personalized advice to help you make informed decisions."
        },
        {
            icon: "💰",
            title: "Best Deals",
            description: "We negotiate the best prices and terms for our clients, saving you money."
        },
        {
            icon: "🔍",
            title: "Quality Properties",
            description: "We carefully select and verify all properties to ensure they meet our high standards."
        },
        {
            icon: "📱",
            title: "Modern Technology",
            description: "Use our advanced platform to search, compare, and manage your property journey."
        },
        {
            icon: "🤝",
            title: "Full Support",
            description: "From search to closing, we're with you every step of the way."
        },
        {
            icon: "⭐",
            title: "Trusted Reputation",
            description: "Over 500+ satisfied clients and 15+ years of excellence in real estate."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center h-[80vh] bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)'}}>
                <div className="absolute inset-0 bg-black/50" />
                <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
                >
                    <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Find Your Dream Home</h1>
                    <p className="text-2xl mb-8 drop-shadow max-w-2xl mx-auto">Discover exceptional properties with our expert guidance. Your perfect home is waiting for you.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/properties" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105">
                            Browse Properties
                        </Link>
                        <Link href="/register" className="inline-block px-8 py-4 bg-white text-indigo-700 hover:bg-gray-100 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* About Agency Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our Agency</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Founded in 2008, we've been helping families find their perfect homes for over 15 years. 
                            Our commitment to excellence, personalized service, and deep market knowledge has made us 
                            the trusted choice for thousands of satisfied clients.
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                                alt="Our Office" 
                                className="rounded-2xl shadow-2xl"
                            />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl font-bold text-gray-900">Your Trusted Real Estate Partner</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We understand that buying or selling a home is one of life's biggest decisions. 
                                That's why we provide comprehensive support throughout your entire journey, 
                                from initial consultation to closing day and beyond.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">500+</div>
                                    <div className="text-gray-600">Happy Clients</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">15+</div>
                                    <div className="text-gray-600">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">1000+</div>
                                    <div className="text-gray-600">Properties Sold</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">24/7</div>
                                    <div className="text-gray-600">Support Available</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We go above and beyond to ensure your real estate experience is exceptional
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Property Listings */}
            <section id="listings" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Properties</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our handpicked selection of exceptional properties
                        </p>
                    </motion.div>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-16">{error}</div>
                    ) : Array.isArray(properties) && properties.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.slice(0, 6).map((property, idx) => (
                                <motion.div
                                    key={property.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300 flex flex-col border border-gray-200"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                >
                                    <div className="relative">
                                        <img
                                            src={getPropertyImage(property)}
                                            alt={property.title}
                                            className="h-48 w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://source.unsplash.com/600x400/?house,home,real-estate&sig=${property.id}`;
                                            }}
                                        />
                                        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {property.status}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{property.title}</h3>
                                        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                                            {property.description?.slice(0, 120) || 'Beautiful property with great potential.'}...
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-indigo-600">
                                                ${property.price?.toLocaleString() || 'N/A'}
                                            </span>
                                            <span className="text-sm text-gray-500">{property.city}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{property.surface} m²</span>
                                            <span>{property.bedrooms} beds</span>
                                            <span>{property.rooms} rooms</span>
                                        </div>
                                        <Link 
                                            href={`/properties/${property.id}`}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-16">No properties found.</div>
                    )}
                    
                    {properties.length > 6 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mt-12"
                        >
                            <Link 
                                href="/properties"
                                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                            >
                                View All Properties
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our experienced professionals are here to guide you through every step of your real estate journey
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7 }}
                className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of satisfied clients who found their perfect home with us. 
                        Start your journey today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/register" 
                            className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                        >
                            Get Started
                        </Link>
                        <Link 
                            href="/properties" 
                            className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition transform hover:scale-105"
                        >
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
} 