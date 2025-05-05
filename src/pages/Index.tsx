
import React from 'react';
import Header from '@/components/Header';
import StatisticsCard from '@/components/StatisticsCard';
import StudentList from '@/components/StudentList';
import { 
  students, 
  getAttendanceStats, 
  attendanceRecords, 
  courses 
} from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Check, Clock, Users, X } from 'lucide-react';
import { format } from 'date-fns';

const Index = () => {
  const stats = getAttendanceStats();
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const todayRecords = attendanceRecords.filter(r => r.date === currentDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your attendance overview.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatisticsCard 
            title="Total Present" 
            value={stats.present} 
            total={stats.total}
            percentage={stats.presentPercentage} 
            color="#4CAF50"
            icon={<Check className="h-4 w-4" />}
          />
          <StatisticsCard 
            title="Total Absent" 
            value={stats.absent}
            total={stats.total}
            percentage={stats.absentPercentage} 
            color="#F44336"
            icon={<X className="h-4 w-4" />}
          />
          <StatisticsCard 
            title="Total Late" 
            value={stats.late}
            total={stats.total}
            percentage={stats.latePercentage} 
            color="#FF9800"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatisticsCard 
            title="Total Students" 
            value={students.length}
            percentage={100} 
            color="#2196F3"
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-2">
          <StudentList 
            students={students} 
            attendanceRecords={todayRecords}
            date={currentDate}
          />
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className="border rounded-lg p-4 flex justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.room}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{course.schedule}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
