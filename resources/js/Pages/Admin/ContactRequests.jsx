import React from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminContactRequests() {
    return (
        <AdminLayout 
            title="Contact Requests" 
            subtitle="Manage customer contact requests"
        >
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">Contact Requests</p>
                    <p className="text-sm mt-2">This feature is coming soon!</p>
                </div>
            </div>
        </AdminLayout>
    );
} 