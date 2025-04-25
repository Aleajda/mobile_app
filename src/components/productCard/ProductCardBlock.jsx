import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Order from '../myProfile/contractors/components/Order';
import ProductCardOrder from './ProductCardOrder';

const ProductCardBlock = ({ setProductCardCounter }) => {

    return (
        <View style={{gap: 4}}>
            <ProductCardOrder price={1760} setProductCardCounter={setProductCardCounter}/>
            <ProductCardOrder price={4900} setProductCardCounter={setProductCardCounter}/>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default ProductCardBlock;
