import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrders = async (params = {}) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    
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

    const response = await fetch('https://sort1.pro/api/index.php', {
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
      throw new Error('Ошибка при получении списка заказов');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка API заказов:', error);
    throw error;
  }
}; 