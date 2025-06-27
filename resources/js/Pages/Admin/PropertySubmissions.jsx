import React from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminPropertySubmissions() {
    return (
        <AdminLayout 
            title="Property Submissions" 
            subtitle="Review and manage property submissions"
        >
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">Property Submissions</p>
                    <p className="text-sm mt-2">This feature is coming soon!</p>
                </div>
            </div>
        </AdminLayout>
    );
} 