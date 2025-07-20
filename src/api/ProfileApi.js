import ApiMiddleware from './ApiMiddleware';

export const getMyCompanies = async () => {
  try {
    const data = await ApiMiddleware.post({
      data: {
        action: 'get_my_companies'
      }
    });
    
    return data;
  } catch (error) {
    console.error('Ошибка при получении списка компаний:', error);
    throw error;
  }
}; 

export const getUserData = async () => {
  try {
    const data = await ApiMiddleware.post({
      data: {
        action: 'get_user_data'
      }
    });
    
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
}; 