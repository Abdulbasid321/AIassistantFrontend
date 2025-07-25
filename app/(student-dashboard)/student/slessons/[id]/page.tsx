'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Lesson {
  _id: string;
  title: string;
  subject: string;
  note: string;
  videoUrl: string;
}

const LessonDetailPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`https://ai-assistant-gaky.onrender.com/student/lessons/${id}`);
        const data = await res.json();
        setLesson(data.lesson);
      } catch {
        alert('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setAsking(true);
    try {
      const res = await fetch('https://ai-assistant-gaky.onrender.com/student/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: id,
          question,
        }),
      });

      const data = await res.json();
      setAiResponse(data.answer || 'AI could not provide an answer.');
    } catch (err) {
      setAiResponse('Failed to get response from AI.');
    } finally {
      setAsking(false);
    }
  };

  if (loading) return <div className="p-6">Loading lesson...</div>;

  if (!lesson) return <div className="p-6">Lesson not found</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-2">{lesson.title}</h1>
      <p className="text-sm text-gray-600 mb-4">Subject: {lesson.subject}</p>

      <video
        controls
        src={lesson.videoUrl}
        className="w-full max-w-5xl rounded mb-6 h-96 object-cover"
      />

      <div className="bg-white p-4 rounded shadow max-w-5xl mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-600">Lesson Note</h2>
        <p className="text-gray-800 whitespace-pre-line">{lesson.note}</p>
      </div>

      {/* Ask AI Section */}
      <div className="bg-white p-4 rounded shadow max-w-5xl">
        <h2 className="text-xl font-semibold text-green-600 mb-3">🤖 Ask AI About This Lesson</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question related to this lesson..."
          className="w-full p-3 border border-gray-300 rounded min-h-[100px] mb-3"
        />
        <button
          onClick={handleAskAI}
          disabled={asking}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {asking ? 'Thinking...' : 'Ask AI'}
        </button>

        {aiResponse && (
          <div className="mt-4 bg-gray-100 p-3 rounded text-gray-800">
            <strong>AI Response:</strong>
            <p className="mt-2">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
