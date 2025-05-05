
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, List, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">AttendTrack</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Dashboard
          </Link>
          <Link to="/attendance" className="text-gray-600 hover:text-blue-600 font-medium">
            Take Attendance
          </Link>
          <Link to="/history" className="text-gray-600 hover:text-blue-600 font-medium">
            History
          </Link>
          <Link to="/students" className="text-gray-600 hover:text-blue-600 font-medium">
            Students
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
