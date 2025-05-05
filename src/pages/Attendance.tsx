
import React from 'react';
import Header from '@/components/Header';
import AttendanceForm from '@/components/AttendanceForm';
import StudentList from '@/components/StudentList';
import { students, courses } from '@/data/mockData';

const Attendance = () => {
  const handleAttendanceSubmit = (data: any) => {
    // In a real app, this would save the data to a database
    console.log('Attendance submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Take Attendance</h1>
          <p className="text-muted-foreground">
            Record attendance for your students.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AttendanceForm 
            students={students} 
            courses={courses}
            onSubmit={handleAttendanceSubmit}
          />
          
          <StudentList students={students} />
        </div>
      </main>
    </div>
  );
};

export default Attendance;
