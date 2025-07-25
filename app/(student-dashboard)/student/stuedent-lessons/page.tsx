
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface Lesson {
//   _id: string;
//   title: string;
//   subject: string;
//   note: string;
//   videoUrl: string;
// }

// const StudentLessons = () => {
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSubject, setSelectedSubject] = useState<string>('All');

//   const router = useRouter();

//   const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

//   const fetchLessons = async () => {
//     setLoading(true);
//     try {
//       const query = selectedSubject !== 'All' ? `?subject=${selectedSubject}` : '';
//       const res = await fetch(`http://localhost:5000/student/lessons${query}`);
//       const data = await res.json();
//       setLessons(data.lessons || []);
//     } catch (err) {
//       alert('Failed to load lessons');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLessons();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedSubject]);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-3xl font-bold text-green-700 mb-6">📚 All Video Lessons</h1>

//       {/* Subject Filter */}
//       <div className="mb-6 max-w-sm">
//         <label className="block text-sm font-semibold mb-1 text-gray-700">Filter by Subject</label>
//         <select
//           className="p-2 border border-gray-300 rounded w-full"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//         >
//           {subjects.map((subj) => (
//             <option key={subj} value={subj}>
//               {subj}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Lesson Cards */}
//       {loading ? (
//         <p>Loading lessons...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {lessons.map((lesson) => (
//             <div
//               key={lesson._id}
//               className="bg-white rounded shadow p-4 hover:shadow-md transition cursor-pointer"
//               onClick={() => router.push(`/student/lessons/${lesson._id}`)}
//             >
//               <video
//                 controls
//                 src={lesson.videoUrl}
//                 className="w-full rounded mb-3 h-48 object-cover"
//               />
//               <h2 className="text-lg font-bold text-green-700">{lesson.title}</h2>
//               <p className="text-sm text-gray-500">Subject: {lesson.subject}</p>
//               <p className="text-sm text-gray-700 mt-2">{lesson.note.slice(0, 100)}...</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentLessons;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lesson {
  _id: string;
  title: string;
  subject: string;
  note: string;
  videoUrl: string;
}

const StudentLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [asking, setAsking] = useState(false);

  const router = useRouter();

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

  // const fetchLessons = async () => {
  //   setLoading(true);
  //   try {
  //     const query = selectedSubject !== 'All' ? `?subject=${selectedSubject}` : '';
  //     const res = await fetch(`http://localhost:5000/admin/videos${query}`);
  //     const data = await res.json();
  //     setLessons(data.lessons || []);
  //   } catch (err) {
  //     alert('Failed to load lessons');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchLessons = async () => {
  setLoading(true);
  try {
    const query = selectedSubject !== 'All' ? `?subject=${selectedSubject}` : '';
    const res = await fetch(`https://ai-assistant-gaky.onrender.com/admin/videos${query}`);
    const data = await res.json();
    setLessons(data.videos || []);
  } catch (err) {
    alert('Failed to load lessons');
  } finally {
    setLoading(false);
  }
};

  // const handleAskAI = async () => {
  //   if (!question.trim()) return;
  //   setAsking(true);
  //   try {
  //     const res = await fetch('http://localhost:5000/student/ask-ai', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ question }),
  //     });
  //     const data = await res.json();
  //     setAnswer(data.answer || 'No response');
  //   } catch (err) {
  //     setAnswer('Error asking AI. Try again.');
  //   } finally {
  //     setAsking(false);
  //   }
  // };

  const handleAskAI = async () => {
  if (!question.trim()) return;
  setAsking(true);
  try {
    const res = await fetch('https://ai-assistant-gaky.onrender.com/students/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        subject: selectedSubject !== 'All' ? selectedSubject : undefined
      }),
    });
    const data = await res.json();
    setAnswer(data.answer || 'No response');
  } catch (err) {
    setAnswer('Error asking AI. Try again.');
  } finally {
    setAsking(false);
  }
};

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 relative">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📚 All Video Lessons</h1>

      {/* Subject Filter */}
      <div className="mb-6 max-w-sm">
        <label className="block text-sm font-semibold mb-1 text-gray-700">Filter by Subject</label>
        <select
          className="p-2 border border-gray-300 rounded w-full"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Lesson Cards */}
      {loading ? (
        <p>Loading lessons...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded shadow p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => router.push(`/student/lessons/${lesson._id}`)}
            >
              <video
                controls
                src={lesson.videoUrl}
                className="w-full rounded mb-3 h-48 object-cover"
              />
              <h2 className="text-lg font-bold text-green-700">{lesson.title}</h2>
              <p className="text-sm text-gray-500">Subject: {lesson.subject}</p>
              <p className="text-sm text-gray-700 mt-2">{lesson.note.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      {/* Floating Ask AI Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖 Ask AI
      </button>

      {/* Ask AI Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setQuestion('');
                setAnswer('');
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-3 text-green-700">Ask AI about a Lesson</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full border border-gray-300 rounded p-3 mb-4 min-h-[100px]"
            />
            <button
              onClick={handleAskAI}
              disabled={asking}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {asking ? 'Asking...' : 'Ask'}
            </button>

            {answer && (
              <div className="mt-4 bg-gray-100 p-4 rounded border border-gray-200">
                <h3 className="text-sm font-medium mb-1 text-gray-700">AI Response:</h3>
                <p className="text-gray-800">{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLessons;
