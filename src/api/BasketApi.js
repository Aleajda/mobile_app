import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Создаем событие для обновления корзины
export const basketUpdateEvent = {
    listeners: [],
    
    // Добавление слушателя
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    },
    
    // Вызов всех слушателей
    emit() {
        this.listeners.forEach(callback => callback());
    }
};

export default BasketApi = {
    /**
     * Добавляет деталь в корзину
     * @param {Object} detail Объект с данными о детали
     * @returns {Promise<Object|null>} Результат операции или null в случае ошибки
     */
    async addToBasket(detail) {
        try {
            const sessionId = await this.getSessionId();
            
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
                brand_id: detail.brand_id || 0,
                price: detail.price || 0,
                to_cart_count: detail.to_cart_count || 1,
                comment: detail.comment || "",
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
                // Вызываем событие обновления корзины
                basketUpdateEvent.emit();
                return response.data;
            } else {
                console.error('Ошибка при добавлении в корзину:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
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
            
            console.log('Ответ getBasketCount:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                return response.data.details_count || 0;
            } else {
                console.error('Ошибка при получении количества товаров в корзине:', response.data);
                return 0;
            }
        } catch (error) {
            console.error('Ошибка при получении количества товаров в корзине:', error);
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
            
            console.log('Ответ getBasketDetails:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                // Преобразуем данные, чтобы обеспечить совместимость
                const basketDetails = response.data.basket_details || [];
                
                // Убедимся, что count всегда представлен как число
                return basketDetails.map(item => ({
                    ...item,
                    count: item.count ? parseInt(item.count) : 1,
                    // Добавляем to_cart_count для обратной совместимости
                    to_cart_count: item.count ? parseInt(item.count) : 1
                }));
            } else {
                console.error('Ошибка при получении списка товаров в корзине:', response.data);
                return [];
            }
        } catch (error) {
            console.error('Ошибка при получении списка товаров в корзине:', error);
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
                // Вызываем событие обновления корзины
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при удалении товара из корзины:', response.data);
                return { status: 'error', message: 'Не удалось удалить товар из корзины' };
            }
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
            return { status: 'error', message: error.message };
        }
    },
    
    /**
     * Обновляет товар в корзине
     * @param {number} index Индекс товара в корзине
     * @param {Object} updatedItem Обновленные данные товара
     * @returns {Promise<Object>} Результат операции
     */
    async updateBasketItem(index, updatedItem) {
        try {
            const sessionId = await this.getSessionId();
            
            // Получаем текущие товары в корзине
            const basketDetails = await this.getBasketDetails();
            
            if (!basketDetails || !basketDetails[index]) {
                return { status: 'error', message: 'Товар не найден' };
            }
            
            const originalItem = basketDetails[index];
            const itemId = originalItem.id || originalItem.detail_id;
            
            if (!itemId) {
                return { status: 'error', message: 'Не удалось определить ID товара' };
            }
            
            // Подготавливаем данные для запроса
            const requestData = {
                action: "save_basket_detail",
                my_code: originalItem.my_code || "",
                ean13: originalItem.ean13 || "",
                article: originalItem.article || "",
                brand: originalItem.brand || "",
                name: originalItem.name || "",
                cost: originalItem.cost || 0,
                count: originalItem.count || 0,
                mcount: originalItem.mcount || 0,
                time: originalItem.time || 0,
                deliverer: originalItem.deliverer || "Основной",
                deliverer_id: originalItem.deliverer_id || 0,
                is_excise: originalItem.is_excise || 0,
                deliverer_type: originalItem.deliverer_type || "sklad",
                detail_id: itemId,
                brand_id: originalItem.brand_id || 0,
                price: updatedItem.price !== undefined ? updatedItem.price : originalItem.price,
                to_cart_count: updatedItem.quantity !== undefined ? 
                    (updatedItem.quantity - originalItem.count) : // Если указано конкретное количество
                    (updatedItem.increment ? 1 : -1), // Если указано только направление изменения
                comment: originalItem.comment || ""
            };
            
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
            
            console.log('Ответ updateBasketItem:', response.data);
            
            if (response.data && response.data.status === 'ok') {
                // Вызываем событие обновления корзины
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при обновлении товара в корзине:', response.data);
                return { status: 'error', message: 'Не удалось обновить товар в корзине' };
            }
        } catch (error) {
            console.error('Ошибка при обновлении товара в корзине:', error);
            return { status: 'error', message: error.message };
        }
    }
} 