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