import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminBlogPosts() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ id: null, title: '', content: '', excerpt: '' });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Global axios 401 handler
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            err => {
                if (err.response && err.response.status === 401) {
                    router.visit('/login');
                }
                return Promise.reject(err);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const fetchPosts = () => {
        setLoading(true);
        axios.get('/api/blog-posts', { withCredentials: true })
            .then(res => setPosts(res.data))
            .catch(() => setError('Failed to fetch blog posts.'))
            .finally(() => setLoading(false));
    };
    
    useEffect(() => { fetchPosts(); }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
        
        axios.delete(`/api/blog-posts/${id}`, { withCredentials: true })
            .then(() => {
                fetchPosts();
                alert('Post deleted successfully!');
            })
            .catch(() => alert('Failed to delete post.'));
    };

    const handleEdit = (post) => {
        setForm({ 
            id: post.id, 
            title: post.title, 
            content: post.content,
            excerpt: post.excerpt || ''
        });
        setIsEdit(true); 
        setShowForm(true); 
        setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, title: '', content: '', excerpt: '' });
        setIsEdit(false); 
        setShowForm(true); 
        setFormError(null);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        setSubmitting(true);
        
        const payload = { 
            title: form.title, 
            content: form.content,
            excerpt: form.excerpt,
            user_id: user?.id || 1
        };
        
        if (isEdit) {
            axios.put(`/api/blog-posts/${form.id}`, payload, { withCredentials: true })
                .then(() => { 
                    setShowForm(false); 
                    fetchPosts(); 
                    alert('Post updated successfully!');
                })
                .catch((err) => {
                    console.error('Update error:', err);
                    setFormError(err.response?.data?.message || 'Failed to update post.');
                })
                .finally(() => setSubmitting(false));
        } else {
            axios.post('/api/blog-posts', payload, { withCredentials: true })
                .then(() => { 
                    setShowForm(false); 
                    fetchPosts(); 
                    alert('Post created successfully!');
                })
                .catch((err) => {
                    console.error('Create error:', err);
                    setFormError(err.response?.data?.message || 'Failed to add post.');
                })
                .finally(() => setSubmitting(false));
        }
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
            title="Blog Management" 
            subtitle="Create and manage your blog posts"
        >
            <div className="flex justify-end mb-8">
                <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Post
                </button>
            </div>

            {showForm && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {isEdit ? 'Edit Post' : 'Create New Post'}
                    </h2>
                    
                    {formError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {formError}
                        </div>
                    )}
                    
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title *</label>
                            <input 
                                name="title" 
                                value={form.title} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter a compelling title for your blog post..."
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt (Optional)</label>
                            <textarea 
                                name="excerpt" 
                                value={form.excerpt} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="A brief summary of your post (will be shown in previews)..."
                                rows={3}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                            <textarea 
                                name="content" 
                                value={form.content} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Write your blog post content here..."
                                rows={15}
                                required 
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                You can use basic HTML tags like &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, &lt;p&gt; for formatting.
                            </p>
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 shadow-lg"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        {isEdit ? 'Updating...' : 'Creating...'}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {isEdit ? 'Update Post' : 'Create Post'}
                                    </>
                                )}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16 bg-red-50 rounded-lg">{error}</div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">All Blog Posts</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {posts.map((post, idx) => (
                                    <motion.tr 
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{post.id}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{post.title}</div>
                                                {post.excerpt && (
                                                    <div className="text-sm text-gray-500 mt-1">{post.excerpt.slice(0, 60)}...</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{post.user?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(post.created_at)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(post)} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(post.id)} 
                                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {posts.length === 0 && (
                            <div className="text-center py-16 text-gray-500">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <p className="text-lg font-medium">No blog posts yet</p>
                                <p className="text-sm">Create your first blog post to get started!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
} 