import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import BasketApi from '../../api/BasketApi';
import Toast from 'react-native-toast-message';

const SearchProduct = ({ item = {}, onAddToBasket, onBasketUpdated, reqid = "" }) => {
    const [isAddingToBasket, setIsAddingToBasket] = useState(false);
    
    // Форматирование цены
    const formatPrice = (price) => {
        if (!price) return '0 ₽';
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };
    
    // Определение статуса наличия
    const getAvailabilityStatus = () => {
        if (!item) return { text: 'Нет в наличии', color: '#EB5757' };
        
        const quantity = parseInt(item.count) || 0;
        const time = parseInt(item.time) || 0;
        
        if (quantity > 0 && time === 0) {
            return { 
                text: `В наличии — ${quantity} шт.`, 
                color: '#27AE60',
                bgColor: '#27AE601A'
            };
        } else if (time === 0) {
            return { 
                text: 'В наличии', 
                color: '#27AE60',
                bgColor: '#27AE601A'
            };
        } else {
            return { 
                text: `Доставка ${time} ${time === 1 ? 'день' : time < 5 ? 'дня' : 'дней'}`, 
                color: '#F2994A',
                bgColor: '#F2994A1A'
            };
        }
    };
    
    const availability = getAvailabilityStatus();

    // Функция для показа уведомления
    const showToast = (message) => {
        Toast.show({
            type: 'customToast',
            text1: message || 'Добавлено в корзину',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 60,
        });
    };

    // Функция добавления товара в корзину
    const handleAddToBasket = async () => {
        if (isAddingToBasket) return;
        
        setIsAddingToBasket(true);
        
        try {
            // Подготавливаем данные для запроса
            const detailData = {
                my_code: item.my_code || "",
                ean13: item.ean13 || "",
                article: item.article || "",
                brand: item.brand || "",
                name: item.name || "",
                cost: item.cost || item.price || 0,
                count: item.count || 0,
                mcount: item.mcount || 0,
                time: item.time || 0,
                deliverer: item.pl_name || item.supplier || "Основной",
                deliverer_id: item.deliverer_id || 3,
                is_excise: item.is_excise || 0,
                deliverer_type: item.deliverer_type || "sklad",
                detail_id: item.id || item.detail_id || 0,
                brand_id: item.brand_id || 0,
                price: item.price || item.sale_price || 0,
                to_cart_count: 1,
                comment: ""
            };
            
            const result = await BasketApi.addToBasket(detailData, reqid);
            
            if (result && result.status === 'ok') {
                showToast("Товар добавлен в корзину");
                
                // Если передан колбэк, вызываем его
                if (onAddToBasket) {
                    onAddToBasket();
                }
            } else {
                Alert.alert("Ошибка", "Не удалось добавить товар в корзину");
            }
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            Alert.alert("Ошибка", "Произошла ошибка при добавлении товара в корзину");
        } finally {
            setIsAddingToBasket(false);
        }
    };

    return (
        <View style={styles.order}>
            <TouchableOpacity 
                style={styles.productCardContainer} 
                onPress={handleAddToBasket}
                disabled={isAddingToBasket}
            >
                <Image style={styles.productCard} source={require("@assets/images/basket_filled_24px.png")}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.orderTitle} numberOfLines={1} ellipsizeMode="tail">{item.name || 'Деталь'}</Text>
                <Text style={styles.orderTitle2} numberOfLines={1} ellipsizeMode="tail">{item.brand || 'Бренд'}</Text>
            </View>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Поставщик</Text>
                <Text style={styles.orderBuyerName}>{item.pl_name || item.supplier || 'Основной'}</Text>
            </View>
            <View style={[styles.orderStatus, { backgroundColor: availability.bgColor }]}>
                <Text style={[styles.orderStatusText, { color: availability.color }]}>
                    {availability.text}
                </Text>
            </View>
            <View style={styles.orderBorder}></View>
            
            <View style={styles.orderParamContainer}>
                <View style={styles.orderParam}>
                    <Text style={styles.orderParamTitle}>
                        Стоимость
                    </Text>
                    <Text style={styles.orderParamText}>
                        {formatPrice(item.price || item.sale_price || item.cost)}
                    </Text>
                </View>
                
                <View style={styles.orderParam}>
                    <Text style={styles.orderParamTitle}>
                        Количество
                    </Text>
                    <Text style={styles.orderParamText}>
                        {parseInt(item.count) || 0} шт.
                    </Text>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        position: 'relative'
    },
    productCardContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1
    },
    productCard: {
        width: 24,
        height: 24,
    },
    textContainer: {
        paddingRight: 50, // Отступ справа для предотвращения перекрытия текста и иконки
    },
    orderTitle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },
    orderTitle2: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7,
        marginBottom: 16,
    },
    orderBuyer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2F80ED1A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    orderBuyerStatus: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        opacity: 0.5
    },
    orderBuyerName: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderStatus: {
        backgroundColor: '#27AE601A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    orderStatusText: {
        fontFamily: 'Roboto',
        color: '#27AE60',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderBorder: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    orderParamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    orderParam: {
        flexDirection: 'column',
    },
    orderParamTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7
    },
    orderParamText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        letterSpacing: 0
    },
})

export default SearchProduct;
