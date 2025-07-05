import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import type { LoginRequest, LoginResponse } from '../types/login';

interface AuthContextType {
  token: string | null;
  userType: string | null;
  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const navigate = useNavigate();

  const login = async (creds: LoginRequest) => {
    const { data } = await axiosInstance.post<LoginResponse>(
      '/api/auth/Authenticate',
      creds
    );
    //TODO: change to 
    localStorage.setItem('token', data.authentication);
    localStorage.setItem('userType', data.userType);

    setToken(data.authentication);
    setUserType(data.userType);

    if (data.userType === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserType(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
