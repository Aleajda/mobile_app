import React from 'react';
import { StyleSheet, View } from 'react-native';
import Order from '../myProfile/contractors/components/Order';

const ProductCardBlock = () => {
    return (
        <View style={{gap: 4}}>
            <Order/>
            <Order/>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default ProductCardBlock;
