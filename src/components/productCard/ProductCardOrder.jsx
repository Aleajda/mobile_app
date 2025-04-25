import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const ProductCardOrder = ({ price, setProductCardCounter }) => {

    const [checked, setChecked] = useState(false);

    const onChecked = () => {
        if (checked) {
            setProductCardCounter(prev => ({
                totalPrice: prev.totalPrice - price,
                count: prev.count - 1,
            }));
            setChecked(false);
        } else {
            setProductCardCounter(prev => ({
                totalPrice: prev.totalPrice + price,
                count: prev.count + 1,
            }));
            setChecked(true);
        }

    }
    

    return (
        <View style={styles.order}>
            <View style={styles.orderHeader}>
                <Pressable onPress={() => onChecked()} style={styles.wrapper}>
                    <View style={[styles.box, checked && styles.checkedBox]}>
                        {checked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                </Pressable>
                <View>
                    <Text style={styles.orderTitle}>Масляной фильтр</Text>
                    <Text style={styles.orderTitle2}>Mahle/Knecht</Text>
                </View>
            </View>
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
                    {price} ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Продать за
                </Text>
                <Text style={styles.orderParamText}>
                    {price} ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Количество
                </Text>
                <Text style={styles.orderParamText}>
                    1 шт.
                </Text>
            </View>
            <View style={[styles.orderBorder, {marginTop: 16}]}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Итого
                </Text>
                <Text style={styles.orderParamText}>
                    {price} ₽
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
    },

    // HEADER

    orderHeader: {
        flexDirection: 'row'
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
        width: '50%',
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

    // ГАЛОЧКА

    wrapper: {
        paddingTop: 3,
        marginRight: 15
      },
      box: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#2F80ED', // синий цвет
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      },
      checkedBox: {
        backgroundColor: '#1a73e8',
      },
      checkmark: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 16,
      },
})

export default ProductCardOrder;
