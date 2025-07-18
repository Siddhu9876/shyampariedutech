import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Teacher } from '../types';
import { mockCurrentUser, mockCurrentTeacher } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'student' | 'teacher') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockCurrentUser);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would authenticate with backend
    if (email.includes('student')) {
      setUser(mockCurrentUser);
    } else {
      setUser(mockCurrentTeacher);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: 'student' | 'teacher') => {
    if (role === 'student') {
      setUser(mockCurrentUser);
    } else {
      setUser(mockCurrentTeacher);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};