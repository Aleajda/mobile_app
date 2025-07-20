import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


let navigationRef = null;


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

// API URL
const API_URL = 'https://sort1.pro/api/index.php';


const ApiMiddleware = {
  post: async ({ data }) => {
    try {
      const sessionId = await AsyncStorage.getItem('sessionId');
      
      const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
      };
      
      const config = {
        headers,
        withCredentials: true,
      };
      
      if (sessionId) {
        headers['Cookie'] = `SORT1SESSID=${sessionId}`;
      }
      
      const response = await axios.post(API_URL, data, config);
      
      return response.data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
};


export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      if (response.data && 
          response.data.status === 'err' && 
          response.data.err === 'Auth need') {
        
        console.log('Обнаружена ошибка авторизации, перенаправление на экран входа');
        
        // Очищаем sessionId
        AsyncStorage.removeItem('sessionId').then(() => {
          // Перенаправляем на экран логина
          redirectToLogin();
        });
        
        
        return Promise.reject({ isAuthError: true, ...response.data });
      }
      
      return response;
    },
    (error) => {
      
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
        
        
        error.isAuthError = true;
      }
      
      
      return Promise.reject(error);
    }
  );
};


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

export default ApiMiddleware; 