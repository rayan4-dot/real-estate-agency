import React, { useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function PropertyDetails() {
    const { id, auth } = usePage().props;
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    });
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        axios.get(`/api/properties/${id}`)
            .then(res => {
                setProperty(res.data);
                // Check if property is favorited by current user
                if (auth?.user) {
                    checkFavoriteStatus(res.data.id);
                }
            })
            .catch(() => setError('Failed to load property.'))
            .finally(() => setLoading(false));
    }, [id, auth]);

    const checkFavoriteStatus = async (propertyId) => {
        try {
            const res = await axios.get(`/api/favorite-properties/check/${propertyId}`, { withCredentials: true });
            setIsFavorited(res.data.is_favorited);
        } catch (error) {
            console.error('Failed to check favorite status:', error);
        }
    };

    const handleFavoriteToggle = async () => {
        if (!auth?.user) {
            // Redirect to login or show login modal
            alert('Please log in to add favorites');
            return;
        }

        setFavoriteLoading(true);
        try {
            console.log('Toggling favorite for property:', property.id, 'user:', auth.user.id, 'current state:', isFavorited);
            if (isFavorited) {
                // Remove from favorites
                const response = await axios.delete(`/api/favorite-properties/${auth.user.id}/${property.id}`, { 
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Remove response:', response.data);
                setIsFavorited(false);
            } else {
                // Add to favorites
                const response = await axios.post('/api/favorite-properties', { property_id: property.id }, { 
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Add response:', response.data);
                setIsFavorited(true);
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            alert(`Failed to update favorites: ${error.response?.data?.message || error.message}`);
        } finally {
            setFavoriteLoading(false);
        }
    };

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...appointmentForm,
            property_id: property.id,
            time: appointmentForm.time + ':00'
        };
        
        axios.post('/api/appointments', payload, { withCredentials: true })
            .then(() => {
                setShowAppointmentModal(false);
                setAppointmentForm({ name: '', email: '', phone: '', date: '', time: '', message: '' });
                alert('Appointment booked successfully!');
            })
            .catch(err => {
                alert('Failed to book appointment. Please try again.');
            });
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...contactForm,
            property_id: property.id
        };
        
        axios.post('/api/contact-requests', payload, { withCredentials: true })
            .then(() => {
                setContactForm({ name: '', email: '', message: '' });
                alert('Message sent successfully!');
            })
            .catch(err => {
                alert('Failed to send message. Please try again.');
            });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-16">{error}</div>;
    }
    if (!property) {
        return <div className="text-center text-gray-500 py-16">Property not found.</div>;
    }

    // Carousel logic
    const images = property.photos && property.photos.length > 0
        ? property.photos.map(photo => photo.url)
        : [`https://source.unsplash.com/800x600/?house,home,real-estate&sig=${property.id}`];
    const prevImg = () => setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextImg = () => setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-2">
            <div className="max-w-6xl mx-auto">
                {/* Property Details Card */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    {/* Image Carousel */}
                    <div className="relative mb-8">
                        <img
                            src={images[currentImg]}
                            alt={`Property image ${currentImg + 1}`}
                            className="w-full h-96 object-cover rounded-2xl shadow-lg border-4 border-indigo-100"
                        />
                        {images.length > 1 && (
                            <>
                                <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-100 text-indigo-700 rounded-full p-2 shadow transition"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg></button>
                                <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-100 text-indigo-700 rounded-full p-2 shadow transition"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg></button>
                            </>
                        )}
                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 justify-center mt-4">
                                {images.map((img, idx) => (
                                    <button key={idx} onClick={() => setCurrentImg(idx)} className={`w-16 h-16 rounded-lg border-2 ${currentImg === idx ? 'border-indigo-500' : 'border-gray-200'} overflow-hidden focus:outline-none`}>
                                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">{property.city}</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">{property.type}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${property.status === 'available' ? 'bg-blue-100 text-blue-700' : property.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{property.status}</span>
                        {property.category && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{property.category.name}</span>
                        )}
                    </div>
                    
                    <h1 className="text-4xl font-extrabold text-indigo-800 mb-2 tracking-tight">{property.title}</h1>
                    
                    <div className="flex items-center gap-8 mb-6 text-lg">
                        <span className="text-3xl font-bold text-indigo-600">${property.price?.toLocaleString() || 'N/A'}</span>
                        <span className="text-gray-500"><svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>{property.surface} m²</span>
                        <span className="text-gray-500"><svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" /></svg>{property.rooms} rooms</span>
                        <span className="text-gray-500"><svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg>{property.bedrooms} bedrooms</span>
                    </div>
                    
                    <hr className="my-6 border-indigo-100" />
                    
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">{property.description}</p>
                    
                    <div className="flex gap-4 mt-8">
                        <button onClick={() => setShowAppointmentModal(true)} className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Book Appointment</button>
                        <button 
                            onClick={handleFavoriteToggle}
                            disabled={favoriteLoading}
                            className={`px-6 py-3 rounded-full font-semibold transition flex items-center gap-2 ${
                                isFavorited 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-white border border-indigo-600 text-indigo-700 hover:bg-indigo-50'
                            }`}
                        >
                            {favoriteLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                                <svg className={`w-5 h-5 ${isFavorited ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            )}
                            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </motion.div>

                {/* Agent Information */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-6">Property Agent</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{property.user?.name || 'Rayan Immobilier'}</h3>
                            <p className="text-gray-600">{property.user?.email || 'contact@rayan-immobilier.com'}</p>
                            <p className="text-gray-500">Professional Real Estate Agent</p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-6">Contact Us</h2>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                value={contactForm.message}
                                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Tell us about your interest in this property..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-indigo-800">Book Appointment</h2>
                            <button onClick={() => setShowAppointmentModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={appointmentForm.name}
                                    onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={appointmentForm.email}
                                    onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={appointmentForm.phone}
                                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={appointmentForm.date}
                                        onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={appointmentForm.time}
                                        onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                                    Book Appointment
                                </button>
                                <button type="button" onClick={() => setShowAppointmentModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
} 