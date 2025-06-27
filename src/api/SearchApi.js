import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default SearchApi = {
    /**
     * Получает список брендов по артикулу
     * @param {string} article Артикул детали
     * @returns {Promise<Array|null>} Список брендов или null в случае ошибки
     */
    async getBrands(article) {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    show_price: "on",
                    article: article,
                    brand: "",
                    brand_id: "",
                    brands: "",
                    detail_id: "",
                    request_id: "",
                    zakaz_detail_id: "0",
                    zakaz_id: "0",
                    market_zakaz_id: "0",
                    zakaz_detail_count: "0",
                    filter_text: "",
                    action: "get_brands_online"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            if (response.data.status === 'ok') {
                console.log(response.data.brands);
                return response.data.brands;
            } else {
                console.error('Ошибка при получении брендов:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Ошибка при получении брендов:', error);
            return null;
        }
    },

    /**
     * Поиск по артикулу и бренду
     * @param {string} article Артикул детали
     * @param {string} brand Название бренда
     * @param {string} brandId ID бренда
     * @returns {Promise<Object|null>} Результат поиска или null в случае ошибки
     */
    async searchByArticle(article, brand, brandId) {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    show_price: "on",
                    article: article,
                    brand: brand,
                    brand_id: brandId,
                    brands: brand,
                    detail_id: "",
                    request_id: "",
                    zakaz_detail_id: "0",
                    zakaz_id: "0",
                    market_zakaz_id: "0",
                    zakaz_detail_count: "0",
                    filter_text: "",
                    action: "search_by_article"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            if (response.data.status === 'ok') {
                return response.data;
            } else {
                console.error('Ошибка при поиске по артикулу:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Ошибка при поиске по артикулу:', error);
            return null;
        }
    },

    /**
     * Поиск деталей в системе
     * @param {string} article Артикул детали
     * @param {string} brand Название бренда
     * @param {string} brandId ID бренда
     * @param {string} detailId ID детали
     * @param {string} requestId ID запроса (опционально)
     * @returns {Promise<Object|null>} Результат поиска или null в случае ошибки
     */
    async searchSort1(article, brand, brandId, detailId, requestId = "") {
        try {
            const sessionId = await this.getSessionId();
            const profileId = await AsyncStorage.getItem('profileId') || "212"; // Значение по умолчанию
            
            // Список плагинов из примера запроса
            const plugins = ["1","2","5","14","16","18","19","20","27","31","49","73","80","92","97","123","124","125","133","137","149","193","220","223","256","300","305","307","309","328","373","385","387","392","397","402","418","440","442","478","479"];
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    profileId: profileId,
                    article: article,
                    brand: brand,
                    brands: brand,
                    brand_id: brandId,
                    detail_id: detailId,
                    request_id: requestId,
                    zakaz_detail_id: "0",
                    zakaz_id: "0",
                    zakaz_detail_count: "0",
                    show_price: "on",
                    plugins: plugins,
                    action: "search_sort1"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            if (response.data) {
                return response.data;
            } else {
                console.error('Ошибка при поиске деталей:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Ошибка при поиске деталей:', error);
            return null;
        }
    },
    
    /**
     * Поиск деталей с периодическими запросами
     * @param {string} article Артикул детали
     * @param {string} brand Название бренда
     * @param {string} brandId ID бренда
     * @param {string} detailId ID детали
     * @param {Function} onResult Колбэк для получения результатов
     * @param {Function} onComplete Колбэк при завершении поиска
     * @param {Function} onError Колбэк при ошибке
     * @returns {Object} Объект с методом stopSearch для остановки поиска
     */
    searchContinuous(article, brand, brandId, detailId, onResult, onComplete, onError) {
        let requestId = "";
        let isSearching = true;
        let searchInterval = null;
        let foundItems = [];
        
        const performSearch = async () => {
            try {
                if (!isSearching) return;
                
                const result = await this.searchSort1(article, brand, brandId, detailId, requestId);
                
                console.log('Результат поиска:', JSON.stringify(result, null, 2));
                
                if (!result) {
                    if (onError) onError("Ошибка при поиске деталей");
                    stopSearch();
                    return;
                }
                
                // Получаем requestId из первого ответа, если его еще нет
                if (!requestId && result.reqid) {
                    requestId = result.reqid;
                    console.log('Получен requestId:', requestId);
                }
                
                // Проверяем, есть ли новые детали
                if (result.items && Array.isArray(result.items)) {
                    console.log('Найдено деталей:', result.items.length);
                    
                    // Добавляем только новые детали
                    const newItems = result.items.filter(item => 
                        !foundItems.some(found => 
                            found.article === item.article && 
                            found.brand === item.brand && 
                            found.id === item.id
                        )
                    );
                    
                    console.log('Новых деталей:', newItems.length);
                    
                    if (newItems.length > 0) {
                        foundItems = [...foundItems, ...newItems];
                        console.log('Всего деталей:', foundItems.length);
                        
                        if (onResult) onResult({
                            items: foundItems,
                            totalCount: foundItems.length,
                            reqid: requestId
                        });
                    }
                }
                
                // Проверяем, завершен ли поиск
                if (result.res_res && result.res_res[requestId]) {
                    console.log('Статус поиска:', result.res_res[requestId]);
                    
                    if (result.res_res[requestId].end_search === 1) {
                        console.log('Поиск завершен');
                        if (onComplete) onComplete({
                            items: foundItems,
                            totalCount: foundItems.length,
                            reqid: requestId
                        });
                        stopSearch();
                    }
                }
            } catch (error) {
                console.error('Ошибка при поиске деталей:', error);
                if (onError) onError(error.message || "Ошибка при поиске деталей");
                stopSearch();
            }
        };
        
        const stopSearch = () => {
            isSearching = false;
            if (searchInterval) {
                clearInterval(searchInterval);
                searchInterval = null;
            }
            
            // Очищаем найденные элементы
            foundItems = [];
            requestId = "";
            
            console.log('Поиск остановлен, ресурсы очищены');
        };
        
        // Запускаем первый поиск немедленно
        performSearch();
        
        // Запускаем интервал для периодических запросов
        searchInterval = setInterval(performSearch, 2000);
        
        // Возвращаем метод для остановки поиска
        return {
            stopSearch
        };
    },
    
    /**
     * Получает идентификатор сессии из AsyncStorage
     * @returns {Promise<string|null>} Идентификатор сессии или null
     */
    async getSessionId() {
        return await AsyncStorage.getItem('sessionId');
    }
} 