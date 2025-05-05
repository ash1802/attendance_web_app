
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Student, Course } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AttendanceFormProps {
  students: Student[];
  courses: Course[];
  onSubmit?: (data: any) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ 
  students,
  courses,
  onSubmit = () => {}
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [course, setCourse] = useState<string>(courses[0].id);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [status, setStatus] = useState<string>("present");
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student.",
        variant: "destructive"
      });
      return;
    }
    
    const data = {
      date: format(date, 'yyyy-MM-dd'),
      courseId: course,
      studentId: selectedStudent,
      status,
      notes
    };
    
    onSubmit(data);
    
    toast({
      title: "Success",
      description: "Attendance recorded successfully",
      action: (
        <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      )
    });
    
    // Reset form
    setSelectedStudent("");
    setStatus("present");
    setNotes("");
  };

  const filteredStudents = students.filter(
    student => courses.find(c => c.id === course)?.name.includes(student.course)
  );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Record Attendance</CardTitle>
        <CardDescription>Mark attendance for students in your class</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="course">Course</Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="student">Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStudents.map((student) => (
                      <SelectItem key={student.id} value={student.studentId}>
                        {student.name} ({student.studentId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Attendance Status</Label>
                <RadioGroup 
                  value={status} 
                  onValueChange={setStatus} 
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div>
                    <RadioGroupItem 
                      value="present" 
                      id="present" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="present"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-attendance-present peer-data-[state=checked]:bg-green-50"
                    >
                      <Check className="mb-2 h-5 w-5 text-attendance-present" />
                      <span>Present</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="absent" 
                      id="absent" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="absent"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-attendance-absent peer-data-[state=checked]:bg-red-50"
                    >
                      <X className="mb-2 h-5 w-5 text-attendance-absent" />
                      <span>Absent</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="late" 
                      id="late" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="late"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-attendance-late peer-data-[state=checked]:bg-yellow-50"
                    >
                      <Clock className="mb-2 h-5 w-5 text-attendance-late" />
                      <span>Late</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="excused" 
                      id="excused" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="excused"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-attendance-excused peer-data-[state=checked]:bg-blue-50"
                    >
                      <CalendarIcon className="mb-2 h-5 w-5 text-attendance-excused" />
                      <span>Excused</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes here..."
                  className="resize-none"
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full md:w-auto">Record Attendance</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;
