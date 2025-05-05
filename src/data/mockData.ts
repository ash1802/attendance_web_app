
export type Student = {
  id: string;
  name: string;
  studentId: string;
  email: string;
  course: string;
};

export type AttendanceRecord = {
  id: string;
  date: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
};

export type Course = {
  id: string;
  name: string;
  schedule: string;
  room: string;
};

// Sample students data
export const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    studentId: 'S001',
    email: 'john.doe@example.com',
    course: 'Computer Science'
  },
  {
    id: '2',
    name: 'Jane Smith',
    studentId: 'S002',
    email: 'jane.smith@example.com',
    course: 'Computer Science'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    studentId: 'S003',
    email: 'michael.j@example.com',
    course: 'Engineering'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    studentId: 'S004',
    email: 'sarah.w@example.com',
    course: 'Mathematics'
  },
  {
    id: '5',
    name: 'Robert Brown',
    studentId: 'S005',
    email: 'robert.b@example.com',
    course: 'Computer Science'
  },
  {
    id: '6',
    name: 'Emily Davis',
    studentId: 'S006',
    email: 'emily.d@example.com',
    course: 'Engineering'
  },
  {
    id: '7',
    name: 'Daniel Wilson',
    studentId: 'S007',
    email: 'daniel.w@example.com',
    course: 'Mathematics'
  },
  {
    id: '8',
    name: 'Olivia Jones',
    studentId: 'S008',
    email: 'olivia.j@example.com',
    course: 'Computer Science'
  }
];

// Sample attendance data
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    date: '2025-05-01',
    studentId: 'S001',
    status: 'present'
  },
  {
    id: '2',
    date: '2025-05-01',
    studentId: 'S002',
    status: 'present'
  },
  {
    id: '3',
    date: '2025-05-01',
    studentId: 'S003',
    status: 'absent',
    notes: 'Sick leave'
  },
  {
    id: '4',
    date: '2025-05-01',
    studentId: 'S004',
    status: 'present'
  },
  {
    id: '5',
    date: '2025-05-01',
    studentId: 'S005',
    status: 'late',
    notes: '15 minutes late'
  },
  {
    id: '6',
    date: '2025-05-03',
    studentId: 'S001',
    status: 'present'
  },
  {
    id: '7',
    date: '2025-05-03',
    studentId: 'S002',
    status: 'absent',
    notes: 'Family emergency'
  },
  {
    id: '8',
    date: '2025-05-03',
    studentId: 'S003',
    status: 'present'
  },
  {
    id: '9',
    date: '2025-05-05',
    studentId: 'S001',
    status: 'excused',
    notes: 'Approved leave'
  }
];

// Sample courses
export const courses: Course[] = [
  {
    id: '1',
    name: 'Computer Science 101',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    room: 'Room A101'
  },
  {
    id: '2',
    name: 'Engineering Basics',
    schedule: 'Tue, Thu - 2:00 PM',
    room: 'Room B205'
  },
  {
    id: '3',
    name: 'Advanced Mathematics',
    schedule: 'Mon, Wed - 1:00 PM',
    room: 'Room C303'
  }
];

// Get attendance statistics
export const getAttendanceStats = () => {
  const total = attendanceRecords.length;
  const present = attendanceRecords.filter(r => r.status === 'present').length;
  const absent = attendanceRecords.filter(r => r.status === 'absent').length;
  const late = attendanceRecords.filter(r => r.status === 'late').length;
  const excused = attendanceRecords.filter(r => r.status === 'excused').length;
  
  return {
    total,
    present,
    absent,
    late,
    excused,
    presentPercentage: Math.round((present / total) * 100),
    absentPercentage: Math.round((absent / total) * 100),
    latePercentage: Math.round((late / total) * 100),
    excusedPercentage: Math.round((excused / total) * 100)
  };
};
