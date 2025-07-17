import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

// Глобальная переменная для хранения навигатора
let navigationRef = null;

// Функция для установки навигатора
export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

// Функция для перенаправления на экран авторизации
export const redirectToLogin = () => {
  if (navigationRef) {
    // Сбрасываем стек навигации и переходим на экран логина
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }
};

// Создаем перехватчик ответов для axios
export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      // Проверяем ответ на наличие ошибки авторизации
      if (response.data && 
          response.data.status === 'err' && 
          response.data.err === 'Auth need') {
        
        console.log('Обнаружена ошибка авторизации, перенаправление на экран входа');
        
        // Очищаем sessionId
        AsyncStorage.removeItem('sessionId').then(() => {
          // Перенаправляем на экран логина
          redirectToLogin();
        });
        
        // Возвращаем отклоненный промис с ошибкой авторизации
        return Promise.reject({ isAuthError: true, ...response.data });
      }
      
      // Для всех остальных успешных ответов просто возвращаем их
      return response;
    },
    (error) => {
      // Для ошибок запроса проверяем, есть ли в ответе ошибка авторизации
      if (error.response && 
          error.response.data && 
          error.response.data.status === 'err' && 
          error.response.data.err === 'Auth need') {
        
        console.log('Обнаружена ошибка авторизации в ошибке запроса, перенаправление на экран входа');
        
        // Очищаем sessionId
        AsyncStorage.removeItem('sessionId').then(() => {
          // Перенаправляем на экран логина
          redirectToLogin();
        });
        
        // Добавляем флаг ошибки авторизации
        error.isAuthError = true;
      }
      
      // Для всех остальных ошибок просто возвращаем их
      return Promise.reject(error);
    }
  );
};

// Функция для обработки ответа fetch запросов
export const handleFetchResponse = async (response) => {
  const data = await response.json();
  
  if (data && data.status === 'err' && data.err === 'Auth need') {
    console.log('Обнаружена ошибка авторизации в fetch запросе, перенаправление на экран входа');
    
    // Очищаем sessionId
    await AsyncStorage.removeItem('sessionId');
    
    // Перенаправляем на экран логина
    redirectToLogin();
    
    // Отклоняем промис с ошибкой авторизации
    throw { isAuthError: true, ...data };
  }
  
  return data;
}; 