import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Order = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.order} onPress={() => navigation.navigate("OrderDescription")}>
            <Text style={styles.orderTitle}>№65520</Text>
            <Text style={styles.orderTitle2}>Заказ</Text>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Покупатель</Text>
                <Text style={styles.orderBuyerName}>Айнур Зарипов</Text>
            </View>
            <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>Новый</Text>
            </View>
            <View style={styles.orderBorder}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Дата создания
                </Text>
                <Text style={styles.orderParamText}>
                    8 Окт 22 в 15:37
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Сумма
                </Text>
                <Text style={styles.orderParamText}>
                    1 760 ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Оплачено
                </Text>
                <Text style={styles.orderParamText}>
                    1 760 ₽
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
