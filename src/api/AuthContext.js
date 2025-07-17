import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthApi from './AuthApi';
import { redirectToLogin } from './ApiMiddleware';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionId = await AuthApi.getSessionId();
        if (sessionId) {
          console.log('sessionId', sessionId);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const sessionId = await AuthApi.login(username, password);
      if (sessionId) {
        setIsAuthenticated(true);
        setUserData({ username });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AuthApi.logout();
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  // Метод для обработки ошибок аутентификации
  const handleAuthError = () => {
    setIsAuthenticated(false);
    setUserData(null);
    redirectToLogin();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userData, login, logout, handleAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 