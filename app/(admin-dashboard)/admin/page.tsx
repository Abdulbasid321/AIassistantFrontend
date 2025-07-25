// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const AdminDashboard = () => {
//   const router = useRouter();
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch uploaded videos on load
//   useEffect(() => {
//     const fetchVideos = async () => {
//       const token = localStorage.getItem('adminToken');
//       try {
//         const res = await fetch('http://localhost:5000/admin/videos', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const data = await res.json();
//         setVideos(data.videos || []);
//       } catch (err) {
//         setError('Failed to load videos');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-2xl font-bold text-green-600 mb-4">Admin Dashboard</h1>

//       <button
//         onClick={() => router.push('/admin/courses')}
//         className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         Upload New Lesson
//       </button>

//       {loading && <p>Loading videos...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {videos.map((video: any) => (
//           <div key={video._id} className="bg-white rounded shadow p-4">
//             <video controls src={video.videoUrl} className="w-full rounded mb-2" />
//             <h2 className="text-lg font-semibold">{video.title}</h2>
//             <p className="text-sm text-gray-600 mt-1">{video.note}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Summary data (mocked for now)
  const totalLessons = videos.length;
  const totalStudents = 123; // Replace with real API later
  const questionsAsked = 245; // Replace with real API later

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await fetch('https://ai-assistant-gaky.onrender.com/admin/videos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-sm text-gray-500">Total Lessons</h2>
          <p className="text-2xl font-bold text-green-600">{totalLessons}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-2xl font-bold text-green-600">{totalStudents}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-sm text-gray-500">Questions Asked</h2>
          <p className="text-2xl font-bold text-green-600">{questionsAsked}</p>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => router.push('/admin/courses')}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Upload New Lesson
      </button>

      {/* Lessons Section */}
      {loading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video: any) => (
          <div key={video._id} className="bg-white rounded shadow p-4">
            <video controls src={video.videoUrl} className="w-full rounded mb-2" />
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{video.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
