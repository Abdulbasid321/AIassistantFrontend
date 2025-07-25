// // app/admin/upload/page.tsx
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const UploadLesson = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [note, setNote] = useState('');
//   const [video, setVideo] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!title || !note || !video) return alert('Fill all fields');

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('note', note);
//     formData.append('video', video);

//     const token = localStorage.getItem('adminToken');

//     try {
//       const res = await fetch('http://localhost:5000/admin/upload', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!res.ok) throw new Error('Upload failed');
//       router.push('/admin');
//     } catch (err) {
//       alert('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-2xl font-bold text-green-600 mb-6">Upload New Lesson</h1>

//       <div className="space-y-4 max-w-lg">
//         <input
//           type="text"
//           placeholder="Lesson Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded"
//         />

//         <textarea
//           placeholder="Write a summary or note about the lesson"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded min-h-[100px]"
//         />

//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideo(e.target.files?.[0] || null)}
//           className="w-full"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {loading ? 'Uploading...' : 'Upload Lesson'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadLesson;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UploadLesson = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [subject, setSubject] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !note || !subject || !video) {
      return alert('Fill all fields');
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('note', note);
    formData.append('subject', subject);
    formData.append('video', video);

    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch('https://ai-assistant-gaky.onrender.com/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      router.push('/admin');
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Upload New Lesson</h1>

      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-5">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />

        <input
          type="text"
          placeholder="Subject (e.g. Physics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />

        <textarea
          placeholder="Write a summary or note about the lesson"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded min-h-[120px]"
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className="w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {loading ? 'Uploading...' : 'Upload Lesson'}
        </button>
      </div>
    </div>
  );
};

export default UploadLesson;
