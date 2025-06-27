import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBlogPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ id: null, title: '', content: '' });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchPosts = () => {
        setLoading(true);
        axios.get('/api/blog-posts', { withCredentials: true })
            .then(res => setPosts(res.data))
            .catch(() => setError('Failed to fetch blog posts.'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { fetchPosts(); }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        axios.delete(`/api/blog-posts/${id}`, { withCredentials: true })
            .then(() => fetchPosts())
            .catch(() => alert('Failed to delete post.'));
    };

    const handleEdit = (post) => {
        setForm({ id: post.id, title: post.title, content: post.content });
        setIsEdit(true); setShowForm(true); setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, title: '', content: '' });
        setIsEdit(false); setShowForm(true); setFormError(null);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        const payload = { title: form.title, content: form.content };
        if (isEdit) {
            axios.put(`/api/blog-posts/${form.id}`, payload, { withCredentials: true })
                .then(() => { setShowForm(false); fetchPosts(); })
                .catch(() => setFormError('Failed to update post.'));
        } else {
            axios.post('/api/blog-posts', payload, { withCredentials: true })
                .then(() => { setShowForm(false); fetchPosts(); })
                .catch(() => setFormError('Failed to add post.'));
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Manage Blog Posts</h1>
            <button onClick={handleAdd} className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Post</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="mb-8 bg-white p-6 rounded shadow max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Post</h2>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <div className="mb-2">
                        <label className="block mb-1">Title</label>
                        <input name="title" value={form.title} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Content</label>
                        <textarea name="content" value={form.content} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{isEdit ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            )}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td className="px-4 py-2 border">{post.id}</td>
                                    <td className="px-4 py-2 border">{post.title}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEdit(post)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}