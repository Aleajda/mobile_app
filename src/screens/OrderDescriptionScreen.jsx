import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import OriginalBlock from '../components/search/OriginalBlock';
import AnalogBlock from '../components/search/AnalogBlock';
import MainBlock from '../components/orderDetails/MainBlock';
import ProductsBlock from '../components/orderDetails/ProductsBlock';
import PaymentModal from '../components/orderDetails/modal/PaymentModal';
import SettingsModal from '../components/orderDetails/modal/SettingsModal';


const OrderDescriptionScreen = ({ navigation }) => {
    const [activeButton, setActiveButton] = useState(1);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.goBackHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate("Orders")}><Image style={styles.goBackIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/></TouchableOpacity>
                    <View>
                        <View style={styles.searchIconContainer}>
                            <TouchableOpacity onPress={() => setSettingsModalOpen(true)}><Image style={styles.searchIcon} source={require('@assets/images/drop_down.png')}/></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        №65520
                    </Text>
                    <Text style={styles.titleDescription}>
                        Заказ от 9 Окт 2022 в 11:07
                    </Text>
                </View>
                <View style={styles.headerSwitchButtons}>
                    <TouchableOpacity onPress={() => setActiveButton(1)}>
                        <View style={[styles.headerSwitchButtonContainer, activeButton == 1 ? styles.activeHeaderSwitchButtonContainer : null]}>
                            <Text style={[styles.headerSwitchButton, activeButton == 1 ? styles.activeHeaderSwitchButton : null]}>
                                Обзор
                            </Text>
                            {/* <View style={[styles.countContainer, activeButton == 1 ? styles.activeCountContainer : null]}>
                                <Text style={[styles.count, activeButton == 1 ? styles.activeCount : null]}>
                                    24
                                </Text>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveButton(2)}>
                        <View style={[styles.headerSwitchButtonContainer, activeButton == 2 ? styles.activeHeaderSwitchButtonContainer : null]}>
                            <Text style={[styles.headerSwitchButton, activeButton == 2 ? styles.activeHeaderSwitchButton : null]}>
                                Товары
                            </Text>
                            <View style={[styles.countContainer, activeButton == 2 ? styles.activeCountContainer : null]}>
                                <Text style={[styles.count, activeButton == 2 ? styles.activeCount : null]}>
                                    1
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveButton(3)}>
                        <View style={[styles.headerSwitchButtonContainer, activeButton == 3 ? styles.activeHeaderSwitchButtonContainer : null]}>
                            <Text style={[styles.headerSwitchButton, activeButton == 3 ? styles.activeHeaderSwitchButton : null]}>
                                Оплаты
                            </Text>
                            {/* <View style={[styles.countContainer, activeButton == 3 ? styles.activeCountContainer : null]}>
                                <Text style={[styles.count, activeButton == 3 ? styles.activeCount : null]}>
                                    1
                                </Text>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.main}>
                <ScrollView style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false}>
                    {activeButton == 1 
                    ? <MainBlock navigation={navigation}/>
                    : activeButton == 2
                    ? <ProductsBlock navigation={navigation}/>
                    : null
                    }
                </ScrollView>
            </View>
        
            {/* FOOTER */}
            <View style={styles.footer}>
                <View style={styles.footerContainer}>
                    <View style={styles.footerContainerText}>
                        <Text style={styles.footerContainerTextCounter}>
                            Итого 1 товар на сумму
                        </Text>
                        <Text style={styles.footerContainerTextPrice}>
                            1760 ₽
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setPaymentModalOpen(true)}>
                        <View style={styles.rightButtonContainer}>
                            <Text style={styles.rightButtonText}>
                                Оплатить
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <PaymentModal visible={paymentModalOpen} setVisible={setPaymentModalOpen}/>
            <SettingsModal visible={settingsModalOpen} setVisible={setSettingsModalOpen}/>
        </View>
    );
}

const styles = StyleSheet.create({

    // GO BACK HEADER

    goBackHeader: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 24
    },
    searchIconContainer: { 
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackIcon: {
        width: 32,
        height: 32
    },
    searchIcon: {
        width: 32,
        height: 32
    },


    // MAIN CONTENT


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
        marginBottom: 8,
        marginBottom: 24,
        gap: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Roboto'
    },
    titleDescription: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 16,
        opacity: 0.7,
        color: '#333333'
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



    // SWITCHES
    headerSwitchButtons: {
        flexDirection: 'row',
        gap: 16
      },
      activeHeaderSwitchButtonContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#2F80ED'
      },
      activeHeaderSwitchButton: {
        color: '#2F80ED'
      },
      headerSwitchButtonContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'flex-end'
      },
      headerSwitchButton: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
      },
      countContainer: {
        borderRadius: 16,
        backgroundColor: '#3333331A',
        width: 19,
        height: 19,
        alignItems: 'center',
        justifyContent: 'center',
        
        marginLeft: 4
      },
      activeCountContainer: {
        backgroundColor: '#2F80ED33'
      },
      count: {
        fontFamily: 'Roboto',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 12,
      },
      activeCount: {
        color: '#2F80ED'
      },


    main: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0,
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

export default OrderDescriptionScreen;
