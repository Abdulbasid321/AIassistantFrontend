// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // ✅ Define the shape of a video lesson
// type VideoLesson = {
//   _id: string;
//   title: string;
//   note: string;
//   videoUrl: string;
// };

// const ManageLessons = () => {
//   const [videos, setVideos] = useState<VideoLesson[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   // ✅ Fetch uploaded videos
//   const fetchVideos = async () => {
//     const token = localStorage.getItem('adminToken');
//     try {
//       const res = await fetch('http://localhost:5000/admin/videos', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch lessons');

//       const data = await res.json();
//       setVideos(data.videos || []);
//     } catch (err) {
//       setError('Failed to load lessons');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   // ✅ Handle delete
//   const handleDelete = async (id: string) => {
//     const confirm = window.confirm('Are you sure you want to delete this lesson?');
//     if (!confirm) return;

//     const token = localStorage.getItem('adminToken');
//     try {
//       const res = await fetch(`http://localhost:5000/admin/lessons/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Delete failed');

//       // Remove deleted lesson from state
//       setVideos((prev) => prev.filter((video) => video._id !== id));
//     } catch (err) {
//       alert('Could not delete the lesson');
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-2xl font-bold text-green-600 mb-6">Manage Lessons</h1>

//       {loading && <p>Loading lessons...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {videos.map((video) => (
//           <div key={video._id} className="bg-white shadow rounded p-4">
//             <video controls src={video.videoUrl} className="w-full rounded mb-3 h-48 object-cover" />
//             <h2 className="text-lg font-semibold">{video.title}</h2>
//             <p className="text-sm text-gray-600 mt-1">{video.note.slice(0, 100)}...</p>

//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => router.push(`/admin/edit-lesson/${video._id}`)}
//                 className="text-blue-600 text-sm hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(video._id)}
//                 className="text-red-600 text-sm hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageLessons;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ✅ Define the shape of a video lesson
type VideoLesson = {
  _id: string;
  title: string;
  note: string;
  videoUrl: string;
};

const ManageLessons = () => {
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // ✅ Fetch uploaded videos
  const fetchVideos = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('https://ai-assistant-gaky.onrender.com/admin/videos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch lessons');

      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      setError('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Upload lesson file
  const handleUpload = async (file: File) => {
    const token = localStorage.getItem('adminToken');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', file.name.split('.')[0]);
    formData.append('note', 'Uploaded video'); // You can improve this

    setUploading(true);
    try {
      const res = await fetch('https://ai-assistant-gaky.onrender.com/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      await fetchVideos(); // Refresh the list
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle delete
  // const handleDelete = async (id: string) => {
  //   const confirm = window.confirm('Are you sure you want to delete this lesson?');
  //   if (!confirm) return;

  //   const token = localStorage.getItem('adminToken');
  //   try {
  //     const res = await fetch(`http://localhost:5000/admin/video`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) throw new Error('Delete failed');
  //     setVideos((prev) => prev.filter((video) => video._id !== id));
  //   } catch (err) {
  //     alert('Could not delete the lesson');
  //   }
  // };

  const handleDelete = async (id: string) => {
  const confirm = window.confirm('Are you sure you want to delete this lesson?');
  if (!confirm) return;

  const token = localStorage.getItem('adminToken');
  try {
    const res = await fetch(`https://ai-assistant-gaky.onrender.com/admin/video/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Delete failed');
    setVideos((prev) => prev.filter((video) => video._id !== id));
  } catch (err) {
    alert('Could not delete the lesson');
  }
};

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Manage Lessons</h1>

      {/* Upload section */}
      <div className="mb-8 flex items-center gap-4">
        <label className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg cursor-pointer transition">
          {uploading ? 'Uploading...' : 'Choose File'}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            disabled={uploading}
          />
        </label>
        <span className="text-sm text-gray-600">Upload new lesson video (MP4)</span>
      </div>

      {loading ? (
        <p>Loading lessons...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white shadow rounded p-4">
              <video controls src={video.videoUrl} className="w-full rounded mb-3 h-48 object-cover" />
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{video.note.slice(0, 100)}...</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => router.push(`/admin/edit-lesson/${video._id}`)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageLessons;
