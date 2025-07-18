import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const OrderPlacingProduct = ({ item }) => {
    // Проверяем, есть ли данные товара
    if (!item) {
        return null;
    }

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

    // Получаем бренд из данных (может быть в поле brand или brand_name)
    const getBrand = () => {
        if (item.brand_name) return item.brand_name;
        if (item.brand) return item.brand;
        return 'Бренд не указан';
    };

    return (
        <View style={styles.order}>
            <Text style={styles.orderTitle}>{item.name || 'Товар без названия'}</Text>
            <Text style={styles.orderTitle2}>{getBrand()}</Text>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Поставщик</Text>
                <Text style={styles.orderBuyerName}>{item.company_name || 'Не указан'}</Text>
            </View>
            <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>Количество — {item.count || 0} шт.</Text>
            </View>
            <View style={styles.orderBorder}></View>
            
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Стоимость
                </Text>
                <Text style={styles.orderParamText}>
                    {formatPrice(parseFloat(item.price) * parseInt(item.count))}
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

export default OrderPlacingProduct;
