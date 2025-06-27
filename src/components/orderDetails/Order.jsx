import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import OrderDetailModal from './modal/OrderDetailModal';

const Order = () => {

    const navigation = useNavigation();

    const [orderDetailModalOpen, setOrderDetailModalOpen] = useState(false);

    return (
        <View style={styles.order}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderTitle}>Масляной фильтр</Text>
                    <Text style={styles.orderTitle2}>Mahle/Knecht</Text>
                </View>
                <TouchableOpacity style={styles.editContainer} onPress={() => setOrderDetailModalOpen(true)}>
                    <Image style={styles.editIcon} source={require("@assets/images/drop_down.png")}/>
                </TouchableOpacity>
            </View>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Поставщик</Text>
                <Text style={styles.orderBuyerName}>ООО "ПАРТКОМ"</Text>
            </View>
            <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>Передан в доставку</Text>
            </View>
            <View style={styles.orderBorder}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Стоимость
                </Text>
                <Text style={styles.orderParamText}>
                    1 760 ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Продать за
                </Text>
                <Text style={styles.orderParamText}>
                    1 760 ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Количество
                </Text>
                <Text style={styles.orderParamText}>
                    1
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Итого
                </Text>
                <Text style={styles.orderParamText}>
                    000.00 ₽
                </Text>
            </View>
            <OrderDetailModal visible={orderDetailModalOpen} setVisible={setOrderDetailModalOpen}/>
        </View>
    );
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
    },

    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    editContainer: {
        
    },
    editIcon: {
        width: 32,
        height: 32,
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
        opacity: 0.7,
        width: '50%'
    },
    orderParamText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        letterSpacing: 0,
        width: '50%'
    },
})

export default Order;
