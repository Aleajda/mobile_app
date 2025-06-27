import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const OrderPlacingProduct = () => {
    return (
        <View style={styles.order}>
            <TouchableOpacity style={styles.productCardContainer}>
                <Image style={styles.productCard} source={require("@assets/images/drop_down.png")}/>
            </TouchableOpacity>
            <Text style={styles.orderTitle}>Масляной фильтр</Text>
            <Text style={styles.orderTitle2}>Mahle/Knecht</Text>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Поставщик</Text>
                <Text style={styles.orderBuyerName}>ООО "ПАРТКОМ"</Text>
            </View>
            <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>В наличии — 7 шт.</Text>
            </View>
            <View style={styles.orderBorder}></View>
            
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Стоимость
                </Text>
                <Text style={styles.orderParamText}>
                    1 600 ₽
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
