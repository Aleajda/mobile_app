import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApiMiddleware from "./ApiMiddleware";

export const basketUpdateEvent = {
    listeners: [],
    
    
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    },
    
    
    emit() {
        this.listeners.forEach(callback => callback());
    }
};

const BasketApi = {
    /**
     * Добавляет деталь в корзину
     * @param {Object} detail Объект с данными о детали
     * @param {string} sreqid Идентификатор запроса search_sort1
     * @returns {Promise<Object|null>} Результат операции или null в случае ошибки
     */
    async addToBasket(detail, sreqid = "") {
        try {
            const sessionId = await this.getSessionId();
            console.log('detail', detail);
            console.log('sreqid', sreqid);
            
            const requestData = {
                my_code: detail.my_code || "",
                ean13: detail.ean13 || "",
                article: detail.article || "",
                brand: detail.brand || "",
                name: detail.name || "",
                cost: detail.cost || 0,
                count: detail.count || 0,
                mcount: detail.mcount || 0,
                time: detail.time || 0,
                deliverer: detail.deliverer || "Основной",
                deliverer_id: detail.deliverer_id || 0,
                is_excise: detail.is_excise || 0,
                deliverer_type: detail.deliverer_type || "sklad",
                detail_id: detail.detail_id || 0,
                sort1_id: detail.id || 0,
                
                brand_id: detail.brand_id || 0,
                price: detail.price || 0,
                to_cart_count: detail.to_cart_count || 1,
                comment: detail.comment || "",
                sort1_sreqid: sreqid,
                action: "save_basket_detail"
            };
            
            console.log('Добавление в корзину:', requestData);
            console.log('URL API:', process.env.EXPO_PUBLIC_API_URL);
            console.log('SessionID:', sessionId);
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            console.log('Ответ addToBasket:', response.data);
            
            if (response.data) {
                basketUpdateEvent.emit();
                return response.data;
            } else {
                console.error('Ошибка при добавлении в корзину:', response.data);
                return null;
            }
        } catch (error) {
            if (!error.isAuthError) {
                console.error('Ошибка при добавлении в корзину:', error);
            }
            return null;
        }
    },

    /**
     * Получает количество товаров в корзине
     * @returns {Promise<number>} Количество товаров в корзине или 0 в случае ошибки
     */
    async getBasketCount() {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: "get_basket_count"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            
            if (response.data && response.data.status === 'ok') {
                return response.data.details_count || 0;
            } else {
                
                return 0;
            }
        } catch (error) {
            if (!error.isAuthError) {
                // console.error('Ошибка при получении количества товаров в корзине:', error);
            }
            return 0;
        }
    },

    /**
     * Получает список товаров в корзине
     * @returns {Promise<Array|null>} Список товаров в корзине или null в случае ошибки
     */
    async getBasketDetails() {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: "get_basket_details"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            // console.log('Ответ getBasketDetails:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                const basketDetails = response.data.basket_details || [];
                
                
                return basketDetails.map(item => ({
                    ...item,
                    count: item.count ? parseInt(item.count) : 1,
                    
                    to_cart_count: item.count ? parseInt(item.count) : 1
                }));
            } else {
                // console.error('Ошибка при получении списка товаров в корзине:', response.data);
                return [];
            }
        } catch (error) {
            
            if (!error.isAuthError) {
                // console.error('Ошибка при получении списка товаров в корзине:', error);
            }
            return [];
        }
    },

    /**
     * Получает идентификатор сессии из AsyncStorage
     * @returns {Promise<string|null>} Идентификатор сессии или null
     */
    async getSessionId() {
        return await AsyncStorage.getItem('sessionId');
    },
    
    /**
     * Удаляет товар из корзины по индексу
     * @param {number} index Индекс товара в корзине
     * @returns {Promise<Object>} Результат операции
     */
    async removeFromBasket(index) {
        try {
            const sessionId = await this.getSessionId();
            
            // Получаем текущие товары в корзине
            const basketDetails = await this.getBasketDetails();
            
            if (!basketDetails || !basketDetails[index]) {
                return { status: 'error', message: 'Товар не найден' };
            }
            
            const item = basketDetails[index];
            const itemId = item.id || item.detail_id;
            const basketId = item.basket_id;
            
            if (!itemId) {
                return { status: 'error', message: 'Не удалось определить ID товара' };
            }
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: "delete_basket_detail",
                    id: itemId,
                    basket_id: basketId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            console.log('Ответ removeFromBasket:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при удалении товара из корзины:', response.data);
                return { status: 'error', message: 'Не удалось удалить товар из корзины' };
            }
        } catch (error) {
            
            if (!error.isAuthError) {
                console.error('Ошибка при удалении товара из корзины:', error);
            }
            return { status: 'error', message: error.message };
        }
    },
    
    /**
     * Сохраняет корзину с обновленными данными
     * @param {Array} basketDetails Массив товаров в корзине
     * @returns {Promise<Object>} Результат операции
     */
    async saveBasket(basketDetails) {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: "save_basket",
                    basket_details: basketDetails
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            console.log('Ответ saveBasket:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при сохранении корзины:', response.data);
                return { status: 'error', message: 'Не удалось сохранить корзину' };
            }
        } catch (error) {
            
            if (!error.isAuthError) {
                console.error('Ошибка при сохранении корзины:', error);
            }
            return { status: 'error', message: error.message };
        }
    },
    
    /**
     * Обновляет товар в корзине
     * @param {number} index Индекс товара в корзине
     * @param {Object} updatedItem Обновленные данные товара (price - цена продажи, quantity - новое количество)
     * @returns {Promise<Object>} Результат операции
     */
    async updateBasketItem(index, updatedItem) {
        try {
            // Получаем текущие товары в корзине
            const basketDetails = await this.getBasketDetails();
            
            if (!basketDetails || !basketDetails[index]) {
                return { status: 'error', message: 'Товар не найден' };
            }
            
            const item = basketDetails[index];
            
            
            const updatedBasketItem = { ...item };
            
            
            if (updatedItem.price !== undefined) {
                updatedBasketItem.price = updatedItem.price.toString();
            }
            
            
            if (updatedItem.quantity !== undefined) {
                const maxCount = parseInt(item.max_count || "9999");
                
                
                if (updatedItem.quantity > maxCount) {
                    updatedItem.quantity = maxCount;
                }

                
                if (updatedItem.quantity < 0) {
                    updatedItem.quantity = 0;
                }
                
                updatedBasketItem.count = updatedItem.quantity;
                updatedBasketItem.old_count = item.count.toString();
            } else if (updatedItem.increment !== undefined) {
                // Если указано направление изменения (увеличение/уменьшение)
                const maxCount = parseInt(item.max_count || "9999");
                const currentCount = parseInt(item.count);
                let newCount;
                
                if (updatedItem.increment) {
                    // Увеличиваем количество на 1, но не больше максимального
                    newCount = Math.min(currentCount + 1, maxCount);
                } else {
                    // Уменьшаем количество на 1, но не меньше 0
                    newCount = Math.max(currentCount - 1, 0);
                }
                
                updatedBasketItem.count = newCount;
                updatedBasketItem.old_count = currentCount.toString();
            }
            
            const newBasketDetails = [...basketDetails];
            newBasketDetails[index] = updatedBasketItem;
            
            
            return await this.saveBasket(newBasketDetails);
        } catch (error) {
            if (!error.isAuthError) {
                console.error('Ошибка при обновлении товара в корзине:', error);
            }
            return { status: 'error', message: error.message };
        }
    },

    /**
     * Удаляет несколько товаров из корзины одновременно
     * @param {Array} detailIds Массив идентификаторов товаров для удаления
     * @returns {Promise<Object>} Результат операции
     */
    async removeMultipleFromBasket(detailIds) {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: "delete_basket_details",
                    details: detailIds.map(id => ({ id }))
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            console.log('Ответ removeMultipleFromBasket:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при удалении товаров из корзины:', response.data);
                return { status: 'error', message: 'Не удалось удалить товары из корзины' };
            }
        } catch (error) {
            if (!error.isAuthError) {
                console.error('Ошибка при удалении товаров из корзины:', error);
            }
            return { status: 'error', message: error.message };
        }
    },

    searchClients: async (searchText, page = 1) => {
        try {
            const response = await ApiMiddleware.post({
                data: {
                    search_clients_client_name: searchText,
                    page: page,
                    action: "get_clients"
                }
            });
            
            return response;
        } catch (error) {
            console.error("Error searching clients:", error);
            throw error;
        }
    },

    getDeliverySklads: async () => {
        try {
            const response = await ApiMiddleware.post({
                data: {
                    action: "get_delivery_sklads"
                }
            });
            
            return response;
        } catch (error) {
            console.error("Error getting delivery sklads:", error);
            throw error;
        }
    },

    getCompanyDogovors: async (companyId) => {
        try {
            const response = await ApiMiddleware.post({
                data: {
                    company_id: companyId,
                    action: "get_company_dogovors"
                }
            });
            
            return response;
        } catch (error) {
            console.error("Error getting company dogovors:", error);
            throw error;
        }
    },

    saveZakaz: async (orderData) => {
        try {
            const response = await ApiMiddleware.post({
                data: {
                    ...orderData,
                    action: "save_zakaz"
                }
            });
            
            return response;
        } catch (error) {
            console.error("Error saving zakaz:", error);
            throw error;
        }
    },

    clearBasket: async () => {
        try {
            // Вызываем событие обновления корзины
            basketUpdateEvent.emit();
            return { status: "ok" };
        } catch (error) {
            console.error("Error clearing basket:", error);
            throw error;
        }
    }
};

export default BasketApi;