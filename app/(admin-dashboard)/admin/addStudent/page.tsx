"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Types
interface Student {
  _id: string;
  fullName: string;
  email: string;
  regNumber: string;
}

interface FormData {
  fullName: string;
  email: string;
  regNumber: string;
}

export default function StudentForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    regNumber: "",
  });
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const res = await axios.get<Student[]>('https://ai-assistant-gaky.onrender.com/students');
      setStudents(res.data);
    } catch {
      toast.error('Failed to fetch students');
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await axios.post('https://ai-assistant-gaky.onrender.com/students', formData);
      toast.success('Student registered successfully');
      setFormData({ fullName: '', email: '', regNumber: '' });
      fetchStudents();
    } catch {
      toast.error('Registration failed');
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Registration Form */}
      <h1 className="text-3xl font-bold text-center text-green-700">
        🎓 Register a New Student
      </h1>
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-full text-center">
              <Button className="bg-green-600 hover:bg-green-700">Register Student</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          📋 Registered Students
        </h2>
        <div className="overflow-x-auto shadow-xl rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Reg Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(student => (
                  <tr key={student._id} className="text-center border-b">
                    <td className="px-4 py-2">
                      {student.fullName || 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      {student.email || 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      {student.regNumber || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
