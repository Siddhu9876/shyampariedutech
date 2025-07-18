import React, { useState } from 'react';
import { mockDoubts } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  HelpCircle, 
  MessageCircle, 
  Plus, 
  User, 
  Calendar,
  CheckCircle,
  Clock,
  BookOpen
} from 'lucide-react';

const DoubtsPage: React.FC = () => {
  const { user } = useAuth();
  const [showNewDoubtForm, setShowNewDoubtForm] = useState(false);
  const [newDoubt, setNewDoubt] = useState({
    question: '',
    subject: 'Mathematics'
  });

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the server
    console.log('Submitting doubt:', newDoubt);
    setNewDoubt({ question: '', subject: 'Mathematics' });
    setShowNewDoubtForm(false);
  };

  const subjects = ['Mathematics', 'Science', 'English', 'History'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Doubts & Questions</h1>
        <button 
          onClick={() => setShowNewDoubtForm(true)}
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ask a Question
        </button>
      </div>

      {/* New Doubt Form */}
      {showNewDoubtForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ask a New Question</h2>
          <form onSubmit={handleSubmitDoubt} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                value={newDoubt.subject}
                onChange={(e) => setNewDoubt({ ...newDoubt, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Your Question
              </label>
              <textarea
                id="question"
                value={newDoubt.question}
                onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Describe your question in detail..."
                required
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Question
              </button>
              <button
                type="button"
                onClick={() => setShowNewDoubtForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Doubts List */}
      <div className="space-y-4">
        {mockDoubts.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-500 mb-4">
              Ask your first question to get help from teachers and classmates.
            </p>
            <button 
              onClick={() => setShowNewDoubtForm(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask a Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtsPage;