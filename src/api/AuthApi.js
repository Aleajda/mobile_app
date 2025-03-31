import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { sha256 } from "js-sha256";


export default AuthApi = {

    // async getSessionId(){
    //     try {
    //         const response = await axios.post(
    //         process.env.EXPO_PUBLIC_API_URL,
    //         { action: 'get_seed' },
    //         {
            
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Requested-With': 'XMLHttpRequest',
    //         },
    //         }
    //     );
        
    //     console.log(response.data);
    //     const cookies = response.headers.get('set-cookie');
    //     console.log("КУУУУКИИИ", cookies);
    //     return response.data.seed;
    //     } catch (error) {
    //     console.error('Ошибка при получении SEED:', error);
    //     }
    // },
    async getSeed(){
        try {
            const response = await axios.post(
            process.env.EXPO_PUBLIC_API_URL,
            { action: 'get_seed' },
            {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            }
        );
        
        // console.log(response.data);
        return response.data.seed;
        } catch (error) {
        console.error('Ошибка при получении SEED:', error);
        }
    },
    async Login(login, password, seed){
        try {

            const hashedPassword = sha256(password + seed);
    
            const loginResponse = await axios.post(
              process.env.EXPO_PUBLIC_API_URL,
              { action: 'login', login, password: hashedPassword },
            );
            
            // console.log("LOGIN_RES");
            // console.log(loginResponse);
            if (loginResponse.data.status === 'ok') {
              const sessionId = loginResponse.data.sesskey; // Берем sessionId из ответа
              await AsyncStorage.setItem('sessionId', sessionId);
              return sessionId;
            } else {
              throw new Error(loginResponse.data.err || 'Ошибка входа');
            }
          } catch (error) {
            console.error('Ошибка авторизации:', error);
            return null;
          }
    },
    async getSessionId() {
        return await AsyncStorage.getItem('sessionId');
    }
    
}