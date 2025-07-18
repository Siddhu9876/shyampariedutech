import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockAssignments, mockTests, mockAttendance } from '../../data/mockData';
import { Student } from '../../types';
import { 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;

  // Mock attendance calculation
  const calculateAttendance = (subject: string) => {
    const subjectAttendance = mockAttendance.filter(a => a.subject === subject);
    const presentCount = subjectAttendance.filter(a => a.status === 'present').length;
    const totalCount = subjectAttendance.length;
    return totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
  };

  const upcomingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const upcomingTests = mockTests.filter(t => t.status === 'scheduled').slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {student.name}!</h1>
          <p className="text-gray-600 mt-1">{student.class} - Section {student.section}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Roll Number</div>
          <div className="text-lg font-semibold text-gray-900">{student.rollNo}</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Pending Assignments</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Upcoming Tests</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">--</div>
              <div className="text-sm text-gray-500">Overall Average</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">--</div>
              <div className="text-sm text-gray-500">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-600" />
              Upcoming Assignments
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No pending assignments</p>
            </div>
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Upcoming Tests
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No upcoming tests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Attendance Overview
          </h2>
        </div>
        <div className="p-6">
          {student.subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {student.subjects.map((subject) => {
                const attendance = calculateAttendance(subject);
                const classAverage = 0; // No data available
                
                return (
                  <div key={subject} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">{subject}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Your Attendance</span>
                        <span className="font-semibold text-gray-900">{attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${attendance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Class Average: {classAverage}%</span>
                        <span>--</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No subjects enrolled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;