import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import SitesBlock from "../components/sites/SitesBlock";
import ProductCardBlock from "../components/productCard/ProductCardBlock";
import ProductCardSettingsModal from "../components/productCard/modal/ProductCardSettingsModal";
import ProductCardEditModal from "../components/productCard/modal/ProductCardEditModal";




const ProductCardScreen = ({ navigation }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [productCardCounter, setProductCardCounter] = useState({ count: 0, totalPrice: 0 });
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Корзина
                    </Text>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={null}>
                            <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerInfo}>
                    <View style={styles.headerInfoSelected}>
                        <Text style={styles.headerInfoSelectedText}>Выбраны</Text>
                        <View style={styles.headerInfoSelectedCountContainer}>
                            <Text style={styles.headerInfoSelectedCount}>{productCardCounter.count}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>
                                Действия
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.main}>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <ProductCardBlock setProductCardCounter={setProductCardCounter} />
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerContainer}>
                    <View style={styles.footerContainerText}>
                        <Text style={styles.footerContainerTextCounter}>
                            {productCardCounter.count} товаров на сумму
                        </Text>
                        <Text style={styles.footerContainerTextPrice}>
                            {productCardCounter.totalPrice} ₽
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("OrderPlacing")}>
                        <View style={styles.rightButtonContainer}>
                            <Text style={styles.rightButtonText}>
                                Оформить заказ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ProductCardEditModal visible={modalOpen} onClose={() => setModalOpen(false)}/>
            <ProductCardSettingsModal setEditModalOpen={() => setModalOpen(true)} visible={visible} setVisible={setVisible}/>
        </View>
    );
};

export default ProductCardScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        height: '100%',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#FFFFFF'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Roboto'
    },
    searchContainer: {

    },
    searchIcon: {
        width: 32,
        height: 32
    },
    headerButtons: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8
    },
    headerButton: {
        height: 32,
        paddingHorizontal: 12,
        backgroundColor: '#3333330D',
        borderRadius: 8,
        justifyContent: 'center',
    },
    headerButtonText: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333B2'
    },

    //   Низ header
    headerInfo: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerInfoSelected: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerInfoSelectedText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        fontWeight: 'semibold'
    },

    //   СЧЕТЧИК

    headerInfoSelectedCountContainer: {
        borderRadius: 16,
        backgroundColor: '#3333331A',
        width: 19,
        height: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4
    },

    headerInfoSelectedCount: {
        fontFamily: 'Roboto',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 12,
    },

    //   КНОПКА ДЕЙСТВИЯ
    actionButton: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: '#2F80ED99',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 8,
    },
    actionButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED',
    },


    // MAIN
    main: {
        padding: 16,
        flex: 1
    },

    //   FOOTER
    footer: {
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    footerContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    footerContainerText: {

    },
    footerContainerTextCounter: {
        color: '#828282',
        fontFamily: 'Roboto',
        fontSize: 12
    },
    footerContainerTextPrice: {
        color: '#333333',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold'
    },
    


    rightButtonContainer: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        // borderColor: '#2F80ED99',
        // borderWidth: 1,
        backgroundColor: '#2F80ED',
        borderRadius: 8
      },
      rightButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
})
