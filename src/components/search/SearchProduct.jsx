import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const SearchProduct = ({ item = {} }) => {
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

    return (
        <View style={styles.order}>
            <TouchableOpacity style={styles.productCardContainer}>
                <Image style={styles.productCard} source={require("@assets/images/basket_filled_24px.png")}/>
            </TouchableOpacity>
            <Text style={styles.orderTitle}>{item.name || 'Деталь'}</Text>
            <Text style={styles.orderTitle2}>{item.brand || 'Бренд'}</Text>
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
            
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Стоимость
                </Text>
                <Text style={styles.orderParamText}>
                    {formatPrice(item.price || item.sale_price || item.cost)}
                </Text>
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
        right: 20
    },
    productCard: {
        width: 24,
        height: 24,
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
    orderParam: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
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
