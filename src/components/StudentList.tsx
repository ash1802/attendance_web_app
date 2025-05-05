
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Student, AttendanceRecord } from '@/data/mockData';
import { Check, X, Clock } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  attendanceRecords?: AttendanceRecord[];
  date?: string;
}

const StudentList: React.FC<StudentListProps> = ({ students, attendanceRecords = [], date = '' }) => {
  const [search, setSearch] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) || 
    student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const getAttendanceStatus = (studentId: string) => {
    const record = attendanceRecords.find(
      record => record.studentId === studentId && record.date === date
    );
    
    return record?.status || null;
  };

  const getStatusIcon = (status: string | null) => {
    switch(status) {
      case 'present':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <X className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'excused':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Excused</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Students</CardTitle>
          <Input 
            placeholder="Search students..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                {date && <TableHead className="text-right">Status</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    {date && (
                      <TableCell className="text-right">
                        {getStatusIcon(getAttendanceStatus(student.studentId))}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={date ? 4 : 3} className="text-center py-4 text-muted-foreground">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentList;
