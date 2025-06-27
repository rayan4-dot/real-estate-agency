import React from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminPhotos() {
    return (
        <AdminLayout 
            title="Photo Management" 
            subtitle="Manage property photos"
        >
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">Photo Management</p>
                    <p className="text-sm mt-2">This feature is coming soon!</p>
                </div>
            </div>
        </AdminLayout>
    );
} 