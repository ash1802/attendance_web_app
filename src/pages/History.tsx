
import React from 'react';
import Header from '@/components/Header';
import AttendanceTable from '@/components/AttendanceTable';
import { attendanceRecords, students } from '@/data/mockData';

const History = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
          <p className="text-muted-foreground">
            View and manage past attendance records.
          </p>
        </div>

        <AttendanceTable records={attendanceRecords} students={students} />
      </main>
    </div>
  );
};

export default History;
