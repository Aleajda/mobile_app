import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Order = ({ order }) => {
    const navigation = useNavigation();
    
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('ru', { month: 'short' });
        const year = date.getFullYear().toString().slice(2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day} ${month} ${year} в ${hours}:${minutes}`;
    };
    
    
    const getStatusText = (statusCode) => {
        const statuses = {
            '11': 'Новый',
            '12': 'В обработке',
            '70': 'Отгружен',
            '201': 'Завершен',
            
        };
        
        return statuses[statusCode] || 'Новый';
    };

    
    const getStatusColor = (statusCode) => {
        const colors = {
            '11': { bg: '#27AE601A', text: '#27AE60' },
            '12': { bg: '#F2C94C1A', text: '#F2C94C' },
            '70': { bg: '#2F80ED1A', text: '#2F80ED' },
            '201': { bg: '#9B51E01A', text: '#9B51E0' },
            
        };
        
        return colors[statusCode] || { bg: '#27AE601A', text: '#27AE60' };
    };
    
    
    if (!order) return null;
    
    const statusColor = getStatusColor(order.status);

    return (
        <TouchableOpacity 
            style={styles.order} 
            onPress={() => navigation.navigate("OrderDescription", { orderId: order.id })}
        >
            <Text style={styles.orderTitle}>№{order.id || '—'}</Text>
            <Text style={styles.orderTitle2}>Заказ</Text>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Покупатель</Text>
                <Text style={styles.orderBuyerName}>{order.company_name || 'Не указан'}</Text>
            </View>
            <View style={[styles.orderStatus, { backgroundColor: statusColor.bg }]}>
                <Text style={[styles.orderStatusText, { color: statusColor.text }]}>
                    {getStatusText(order.status)}
                </Text>
            </View>
            <View style={styles.orderBorder}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Дата создания
                </Text>
                <Text style={styles.orderParamText}>
                    {formatDate(order.create_date)}
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Сумма
                </Text>
                <Text style={styles.orderParamText}>
                    {order.zakaz_sum ? `${Number(order.zakaz_sum).toLocaleString('ru-RU')} ₽` : '0 ₽'}
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Оплачено
                </Text>
                <Text style={styles.orderParamText}>
                    {order.oplachen === "1" ? (order.pay_sum ? `${Number(order.pay_sum).toLocaleString('ru-RU')} ₽` : order.zakaz_sum ? `${Number(order.zakaz_sum).toLocaleString('ru-RU')} ₽` : '0 ₽') : '0 ₽'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
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

export default Order;
