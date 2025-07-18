import React, { useState } from 'react';
import { mockAssignments } from '../../data/mockData';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Star,
  Filter
} from 'lucide-react';

const AssignmentsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredAssignments = mockAssignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const handleFileUpload = (assignmentId: string, file: File) => {
    setSelectedFile(file);
    // In a real app, this would upload the file to the server
    console.log(`Uploading file ${file.name} for assignment ${assignmentId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Assignments</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You don't have any assignments yet." 
                : `No ${filter} assignments found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;