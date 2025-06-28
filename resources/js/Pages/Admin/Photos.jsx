import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminPhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPhotos = () => {
        setLoading(true);
        axios.get('/api/photos', { withCredentials: true })
            .then(res => setPhotos(res.data))
            .catch(() => setError('Failed to fetch photos.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;
        
        axios.delete(`/api/photos/${id}`, { withCredentials: true })
            .then(() => {
                fetchPhotos();
                alert('Photo deleted successfully!');
            })
            .catch(() => alert('Failed to delete photo.'));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout 
            title="Photo Management" 
            subtitle="View and manage property photos"
        >
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16 bg-red-50 rounded-lg">{error}</div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">All Photos ({photos.length})</h3>
                    </div>
                    {photos.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-lg font-medium">No photos found</p>
                            <p className="text-sm">Photos will appear here when properties are created with images.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                            {photos.map((photo) => (
                                <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative group">
                                        <img 
                                            src={photo.url} 
                                            alt={photo.description || 'Property photo'}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                                                <button 
                                                    onClick={() => window.open(photo.url, '_blank')}
                                                    className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition"
                                                    title="View full size"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(photo.id)}
                                                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                                                    title="Delete photo"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-sm text-gray-500 mb-1">
                                            Property ID: {photo.property_id}
                                        </div>
                                        {photo.description && (
                                            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                                                {photo.description}
                                            </p>
                                        )}
                                        <div className="text-xs text-gray-400">
                                            {formatDate(photo.created_at)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
} 