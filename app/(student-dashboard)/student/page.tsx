"use client";

import { Book, CalendarCheck, ClipboardList, FileText, Video, Megaphone, Bot } from "lucide-react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    // const token = localStorage.getItem('studentToken');
    // if (!token) router.push('/login');

    // Fetch announcements from backend
    fetch('https://ai-assistant-gaky.onrender.com/student/announcements')
      .then(res => res.json())
      .then(data => setAnnouncements(data.announcements || []))
      .catch(() => setAnnouncements([
        "Course registration closes on Sept 30th.",
        "Mid-semester tests start Oct 15th.",
      ]));
  }, [router]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Student 👋</h2>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={<Book />} title="Registered Courses" value="6" />
        <Card icon={<FileText />} title="Total Units" value="18" />
        <Card icon={<ClipboardList />} title="GPA (Last Semester)" value="3.45" />
        <Card icon={<CalendarCheck />} title="Attendance" value="85%" />
      </div> */}

      {/* Quick Access Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <QuickLink
          icon={<Video />}
          title="📺 Watch Lessons"
          description="Browse all your video lessons."
          onClick={() => router.push('/student/stuedent-lessons')}
        />
        <QuickLink
          icon={<Megaphone />}
          title="📢 Announcements"
          description="See important school updates."
          onClick={() => console.log("working")}
        />
        <QuickLink
          icon={<Bot />}
          title="🤖 Ask AI"
          description="Get help from the smart tutor."
          onClick={() => router.push('/student/stuedent-lessons')}
        />
      </div>

      {/* Announcements Preview */}
      <div className="bg-white p-6 rounded-lg shadow mt-10">
        <h3 className="text-lg font-medium mb-2">📌 Latest Announcements</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          {announcements.length ? (
            announcements.map((a, idx) => <li key={idx}>{a}</li>)
          ) : (
            <li>No announcements yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Card({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all flex items-center gap-4">
      <div className="p-3 bg-green-100 text-green-600 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function QuickLink({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer flex items-start gap-4"
    >
      <div className="p-3 bg-green-100 text-green-600 rounded-full">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
