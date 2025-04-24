import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Order from './components/Order';

const ContractorOrders = () => {
    return (
        <View style={{gap: 4}}>
            <Order/>
            <Order/>
            <Order/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ContractorOrders;
