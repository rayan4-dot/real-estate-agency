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

    return (
        <div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold mb-8 text-indigo-800 text-center">Blog</motion.h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : Array.isArray(posts) && posts.length > 0 ? (
                <div className="space-y-8 max-w-2xl mx-auto">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-indigo-700 mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-2">{post.content?.slice(0, 120) || 'No content.'}...</p>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>By {post.user?.name || 'Unknown'}</span>
                                <span>{post.created_at?.slice(0, 10)}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-16">No blog posts found.</div>
            )}
        </div>
    );
} 