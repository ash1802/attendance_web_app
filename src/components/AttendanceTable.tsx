
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { Calendar, Check, Clock, Filter, MoreHorizontal, X } from 'lucide-react';
import { Student, AttendanceRecord } from '@/data/mockData';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  students: Student[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, students }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.studentId === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Late</Badge>;
      case 'excused':
        return <Badge className="bg-blue-500"><Calendar className="mr-1 h-3 w-3" /> Excused</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const filteredRecords = records
    .filter(record => {
      // Apply student name search
      const studentName = getStudentName(record.studentId).toLowerCase();
      const searchLower = search.toLowerCase();
      
      // Filter by status if set
      const statusMatch = statusFilter ? record.status === statusFilter : true;
      
      return (studentName.includes(searchLower) || 
              record.studentId.toLowerCase().includes(searchLower)) && 
              statusMatch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Attendance History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" /> 
                  {statusFilter ? 
                    `Filter: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : 
                    'Filter Status'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('present')}>
                  <Check className="mr-2 h-4 w-4 text-green-500" /> Present
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('absent')}>
                  <X className="mr-2 h-4 w-4 text-red-500" /> Absent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('late')}>
                  <Clock className="mr-2 h-4 w-4 text-yellow-500" /> Late
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('excused')}>
                  <Calendar className="mr-2 h-4 w-4 text-blue-500" /> Excused
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {format(parseISO(record.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{record.studentId}</TableCell>
                    <TableCell>{getStudentName(record.studentId)}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {record.notes || '-'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No attendance records found
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

export default AttendanceTable;
