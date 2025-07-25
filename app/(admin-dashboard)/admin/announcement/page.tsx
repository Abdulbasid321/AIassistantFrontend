'use client';

import React, { useState, useEffect } from 'react';

const AnnouncementsPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';

  // 🔃 Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/announcements');
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      alert('Failed to load announcements');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ✅ Handle Post
  const handlePost = async () => {
    if (!title || !message) return alert('Please fill all fields');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/admin/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) throw new Error('Failed to post announcement');

      setTitle('');
      setMessage('');
      fetchAnnouncements();
    } catch (err) {
      alert('Error posting announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📢 Announcements</h1>

      {/* Post Announcement Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4 mb-10">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded min-h-[100px]"
        />
        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? 'Posting...' : 'Post Announcement'}
        </button>
      </div>

      {/* List of Announcements */}
      <div className="max-w-4xl mx-auto space-y-4">
        {announcements.map((ann: any) => (
          <div
            key={ann._id}
            className="bg-white p-4 border-l-4 border-green-500 shadow-md rounded"
          >
            <h3 className="text-lg font-bold">{ann.title}</h3>
            <p className="text-gray-700">{ann.message}</p>
            <span className="text-xs text-gray-400 block mt-2">
              Posted on {new Date(ann.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
