import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const fetchBlogPosts = async () => {
    try {
        const res = await axios.get('/api/blog-posts');
        return res.data;
    } catch (e) {
        try {
            const res = await axios.get('/blog-posts');
            return res.data;
        } catch (err) {
            throw err;
        }
    }
};

export default function BlogPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogPosts()
            .then(data => setPosts(Array.isArray(data) ? data : []))
            .catch(() => setError('Failed to load blog posts.'))
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7 }} 
                    className="text-4xl font-bold mb-8 text-indigo-800 text-center"
                >
                    Our Blog
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center text-gray-600 mb-12 text-lg"
                >
                    Stay updated with the latest real estate insights, market trends, and property tips
                </motion.p>
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-16 bg-red-50 rounded-lg">{error}</div>
                ) : Array.isArray(posts) && posts.length > 0 ? (
                    <div className="space-y-8">
                        {posts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-2 pr-4">{post.title}</h2>
                                    <div className="text-sm text-gray-400 text-right min-w-fit">
                                        <div>{formatDate(post.created_at)}</div>
                                        <div className="text-xs">By {post.user?.name || 'Rayan Immobilier'}</div>
                                    </div>
                                </div>
                                
                                {post.excerpt && (
                                    <p className="text-gray-700 mb-4 text-lg leading-relaxed font-medium">
                                        {post.excerpt}
                                    </p>
                                )}
                                
                                <div className="prose prose-indigo max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        {post.content?.length > 300 
                                            ? `${post.content.slice(0, 300)}...` 
                                            : post.content || 'No content available.'
                                        }
                                    </p>
                                </div>
                                
                                {post.content?.length > 300 && (
                                    <div className="mt-6">
                                        <button className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                                            Read more →
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <p className="text-xl font-medium text-gray-500 mb-2">No blog posts yet</p>
                        <p className="text-gray-400">Check back soon for updates!</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
} 