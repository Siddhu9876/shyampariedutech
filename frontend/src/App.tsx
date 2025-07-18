import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout';
import LoginPage from './components/common/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AssignmentsPage from './components/student/AssignmentsPage';
import AttendancePage from './components/student/AttendancePage';
import DoubtsPage from './components/student/DoubtsPage';
import ClassesPage from './components/student/ClassesPage';
import AnalyticsPage from './components/student/AnalyticsPage';
import ProfilePage from './components/student/ProfilePage';
import SubjectsPage from './components/student/SubjectsPage';
import TestsPage from './components/student/TestsPage';

// Auth-protected wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Decide dashboard by role
const DashboardRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/login" element={<LoginPage />} />

    {/* Protected Routes inside Layout */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardRoute />} />
      <Route path="assignments" element={<AssignmentsPage />} />
      <Route path="attendance" element={<AttendancePage />} />
      <Route path="doubts" element={<DoubtsPage />} />
      <Route path="classes" element={<ClassesPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="subjects" element={<SubjectsPage />} />
      <Route path="Tests" element={<TestsPage />} />
    </Route>

    {/* Fallback Route */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
