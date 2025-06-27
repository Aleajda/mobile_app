import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native';
import Order from './Order';
import OrderDetailModal from './modal/OrderDetailModal';

const ProductsBlock = () => {


    return (
        <View>
            <TouchableOpacity onPress={null}>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Добавить товар</Text>
                </View>
            </TouchableOpacity>
            <Order/>
        </View>
    );
}

const styles = StyleSheet.create({
    addNewBtn: {
        height: 64,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 24
    },
    addNewBtnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED'
    },
})

export default ProductsBlock;
