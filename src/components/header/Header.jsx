import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}><Image style={styles.menuIcon} source={require('@assets/images/menu_icon.png')}/></TouchableOpacity>
    
        <View style={styles.brandContainer}>
            <Text style={styles.brand}>Sort1.pro</Text>
        </View>

        <View>
            <View style={styles.productCardContainer}>
                <TouchableOpacity><Image style={styles.productCardIcon} source={require('@assets/images/basket_filled_24px.png')}/></TouchableOpacity>
                <Text style={styles.productCardCount}>2</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: '#1E1E1E',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    brandContainer: {
        // width: 84,
        height: 24,
        paddingHorizontal: 8,
        backgroundColor: "#2F80ED",
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    brand: {
        fontFamily: 'Roboto',
        color: "#333333",
        fontSize: 16,
        fontWeight: 'bold',
    },
    productCardContainer: {
        width: 58,
        paddingLeft: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productCardCount: {
        fontFamily: 'Roboto',
        marginLeft: 4,
        color: '#2F80ED',
        fontWeight: 'bold',
        fontSize: 16,
    },
    menuIcon: {
        width: 32,
        height: 32
    },
    productCardIcon: {
        width: 24,
        height: 24
    }
})

export default Header;
