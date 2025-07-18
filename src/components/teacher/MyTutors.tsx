// src/pages/MyTutorsPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import { Link } from 'react-router-dom';
import { Briefcase, UserPlus, Menu, X, Home, Users, Building, Info, BookOpen, MessageSquare } from 'lucide-react';

// Mock data - replace with actual data when available
const mockTutors: any[] = [];

const MyTutorsPage: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'My Tutors', icon: Briefcase, path: '/mytutors' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Organization', icon: Building, path: '/organization' },
    { name: 'AboutPage', icon: Info, path: '/about' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Teacher Portal</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    item.name === 'My Tutors' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Teacher Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {teacher.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
              <p className="text-xs text-gray-500">Teacher ID: {teacher.teacherId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">My Tutors</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Teacher ID: {teacher.teacherId}</span>
            </div>
          </div>
        </div>

        {/* My Tutors Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <Briefcase className="w-8 h-8 mr-3 text-indigo-600" />
        My Tutors
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Collaborating Tutors</h2>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Tutor
          </button>
        </div>

        {mockTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTutors.map((tutor) => (
              <div key={tutor.id} className="bg-gray-50 p-6 rounded-lg shadow hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutor.name}</h3>
                <p className="text-gray-600 text-sm mb-1">Subject: {tutor.subject}</p>
                <p className="text-gray-600 text-sm">Email: {tutor.email}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">View Profile</button>
                  <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100">Message</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No other tutors connected yet.</p>
          </div>
        )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MyTutorsPage;