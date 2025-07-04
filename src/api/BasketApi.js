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
                // Вызываем событие обновления корзины
                basketUpdateEvent.emit();
                return { status: 'ok' };
            } else {
                console.error('Ошибка при сохранении корзины:', response.data);
                return { status: 'error', message: 'Не удалось сохранить корзину' };
            }
        } catch (error) {
            console.error('Ошибка при сохранении корзины:', error);
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
            
            // Создаем копию товара для обновления
            const updatedBasketItem = { ...item };
            
            // Обновляем цену продажи, если она указана
            if (updatedItem.price !== undefined) {
                updatedBasketItem.price = updatedItem.price.toString();
            }
            
            // Обновляем количество с учетом максимально доступного количества
            if (updatedItem.quantity !== undefined) {
                const maxCount = parseInt(item.max_count || "9999");
                
                // Проверяем, не превышает ли новое количество максимально доступное
                if (updatedItem.quantity > maxCount) {
                    updatedItem.quantity = maxCount;
                }
                
                // Проверяем, не меньше ли новое количество минимально допустимого (0)
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
            
            // Обновляем товар в массиве корзины
            const newBasketDetails = [...basketDetails];
            newBasketDetails[index] = updatedBasketItem;
            
            // Сохраняем обновленную корзину
            return await this.saveBasket(newBasketDetails);
        } catch (error) {
            console.error('Ошибка при обновлении товара в корзине:', error);
            return { status: 'error', message: error.message };
        }
    }
} 