import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleFetchResponse } from './ApiMiddleware';

// Вспомогательная функция для выполнения запросов
const fetchWithAuth = async (requestData) => {
  const token = await AsyncStorage.getItem('sessionId');
  
  const response = await fetch(process.env.EXPO_PUBLIC_API_URL || 'https://sort1.pro/api/index.php', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Cookie': `SORT1SESSID=${token}`,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    throw new Error('Ошибка при выполнении запроса');
  }

  // Используем middleware для обработки ответа
  return await handleFetchResponse(response);
};

export const getOrders = async (params = {}) => {
  try {
    // Базовые параметры запроса без фильтрации
    const requestData = {
      search_zakaz_client_name: "",
      search_zakaz_article: "",
      search_zakaz_date_from: "",
      search_zakaz_date_to: "",
      action: "get_zakazes"
    };

    // Добавляем переданные параметры, если они есть
    if (params.clientName) requestData.search_zakaz_client_name = params.clientName;
    if (params.article) requestData.search_zakaz_article = params.article;
    if (params.dateFrom) requestData.search_zakaz_date_from = params.dateFrom;
    if (params.dateTo) requestData.search_zakaz_date_to = params.dateTo;

    console.log('Отправляем запрос с параметрами:', requestData);

    return await fetchWithAuth(requestData);
  } catch (error) {
    // Если это не ошибка авторизации, обрабатываем как обычно
    if (!error.isAuthError) {
      console.error('Ошибка API заказов:', error);
    }
    throw error;
  }
};

// Дополнительные методы для работы с заказами
export const getOrderDetails = async (orderId) => {
  try {
    const requestData = {
      action: "get_zakaz",
      zakaz_id: orderId
    };
    
    return await fetchWithAuth(requestData);
  } catch (error) {
    // Если это не ошибка авторизации, обрабатываем как обычно
    if (!error.isAuthError) {
      console.error('Ошибка при получении деталей заказа:', error);
    }
    throw error;
  }
}; 