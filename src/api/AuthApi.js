import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { sha256 } from "js-sha256";

export default AuthApi = {
    /**
     * Получает SEED с сервера для последующей авторизации
     * @returns {Promise<string>} SEED-значение или null в случае ошибки
     */
    async getSeed() {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { action: 'get_seed' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            if (response.data.status === 'ok') {
                return response.data.seed;
            } else {
                console.error('Ошибка при получении SEED:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Ошибка при получении SEED:', error);
            return null;
        }
    },
    
    /**
     * Авторизация пользователя
     * @param {string} login Логин пользователя
     * @param {string} password Пароль пользователя (исходный)
     * @returns {Promise<string|null>} Идентификатор сессии или null в случае ошибки
     */
    async login(login, password) {
        try {
            // Получаем SEED для хеширования пароля
            const seed = await this.getSeed();
            if (!seed) {
                throw new Error('Не удалось получить SEED');
            }
            
            // Хешируем пароль с использованием SEED
            const hashedPassword = sha256(password + seed);
            
            // Получаем текущий sessionId, если есть
            const sessionId = await this.getSessionId();
            
            const loginResponse = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: 'login', 
                    login, 
                    password: hashedPassword 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Cookie': sessionId ? `SORT1SESSID=${sessionId}` : ''
                    }
                }
            );
            
            if (loginResponse.data.status === 'ok') {
                const newSessionId = loginResponse.data.sesskey;
                await AsyncStorage.setItem('sessionId', newSessionId);
                console.log('Сохранен sessionId:', newSessionId);
                return newSessionId;
            } else {
                throw new Error(loginResponse.data.err || 'Ошибка входа');
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            return null;
        }
    },
    
    /**
     * Регистрация нового пользователя
     * @param {Object} userData Данные пользователя
     * @param {string} userData.lastname Фамилия
     * @param {string} userData.name Имя
     * @param {string} userData.middlename Отчество
     * @param {string} userData.inn ИНН
     * @param {string} userData.email Email
     * @param {string} userData.mphone Мобильный телефон
     * @returns {Promise<Object|null>} Результат регистрации или null в случае ошибки
     */
    async registerUser(userData) {
        try {
            const sessionId = await this.getSessionId();
            
            const response = await axios.post(
                process.env.EXPO_PUBLIC_API_URL,
                { 
                    action: 'register_user',
                    ...userData
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
                throw new Error(response.data.msg || 'Ошибка регистрации');
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            return null;
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
     * Очищает идентификатор сессии (выход из системы)
     * @returns {Promise<void>}
     */
    async logout() {
        await AsyncStorage.removeItem('sessionId');
    }
}