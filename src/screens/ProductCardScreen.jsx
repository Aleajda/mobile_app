import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import ProductCardBlock from "../components/productCard/ProductCardBlock";
import ProductCardSettingsModal from "../components/productCard/modal/ProductCardSettingsModal";
import ProductCardEditModal from "../components/productCard/modal/ProductCardEditModal";
import ProductCardActionsModal from "../components/productCard/modal/ProductCardActionsModal";
import BasketApi, { basketUpdateEvent } from "../api/BasketApi";

const ProductCardScreen = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [productCardCounter, setProductCardCounter] = useState({ count: 0, totalPrice: 0 });
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasItems, setHasItems] = useState(false);
    const [actionsModalVisible, setActionsModalVisible] = useState(false);
    
    // Создаем ref для доступа к методам ProductCardBlock
    const productCardBlockRef = useRef(null);

    // Функция для обновления данных корзины
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // Вызываем событие обновления корзины
            basketUpdateEvent.emit();
            setRefreshing(false);
        } catch (error) {
            console.error('Ошибка при обновлении корзины:', error);
            setRefreshing(false);
        }
    }, []);

    // Проверка наличия товаров в корзине
    useEffect(() => {
        const checkBasketItems = async () => {
            try {
                const items = await BasketApi.getBasketDetails();
                setHasItems(Array.isArray(items) && items.length > 0);
            } catch (error) {
                console.error('Ошибка при проверке товаров в корзине:', error);
                setHasItems(false);
            }
        };
        
        checkBasketItems();
        
        // Подписываемся на событие обновления корзины
        const unsubscribe = basketUpdateEvent.addListener(() => {
            checkBasketItems();
        });
        
        // Отписываемся при размонтировании компонента
        return () => {
            unsubscribe();
        };
    }, []);

    // Форматирование цены
    const formatPrice = (price) => {
        if (!price) return '0 ₽';
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };
    
    // Обработчик открытия модального окна действий
    const handleActionsPress = () => {
        setActionsModalVisible(true);
    };
    
    // Получение выбранных товаров
    const getSelectedItems = () => {
        if (productCardBlockRef.current && productCardBlockRef.current.getSelectedItemIds) {
            return productCardBlockRef.current.getSelectedItemIds();
        }
        return [];
    };
    
    // Выбор всех товаров
    const handleSelectAll = () => {
        if (productCardBlockRef.current && productCardBlockRef.current.handleSelectAll) {
            productCardBlockRef.current.handleSelectAll();
        }
    };
    
    // Отмена выбора всех товаров
    const handleUnselectAll = () => {
        if (productCardBlockRef.current && productCardBlockRef.current.handleUnselectAll) {
            productCardBlockRef.current.handleUnselectAll();
        }
    };
    
    // Проверка, все ли товары выбраны
    const isAllSelected = () => {
        if (productCardBlockRef.current && productCardBlockRef.current.isAllSelected) {
            return productCardBlockRef.current.isAllSelected();
        }
        return false;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Корзина
                    </Text>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Search detail")}>
                            <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                {hasItems && (
                    <View style={styles.headerInfo}>
                        <View style={styles.headerInfoSelected}>
                            <Text style={styles.headerInfoSelectedText}>Выбраны</Text>
                            <View style={styles.headerInfoSelectedCountContainer}>
                                <Text style={styles.headerInfoSelectedCount}>{productCardCounter.count}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleActionsPress}>
                            <View style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>
                                    Действия
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={styles.main}>
                <ScrollView 
                    style={{ width: '100%' }} 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#2F80ED']}
                        />
                    }
                >
                    <ProductCardBlock 
                        key={refreshing ? 'refreshing' : 'not-refreshing'} 
                        setProductCardCounter={setProductCardCounter}
                        ref={productCardBlockRef}
                    />
                </ScrollView>
            </View>
            {hasItems && (
                <View style={styles.footer}>
                    <View style={styles.footerContainer}>
                        <View style={styles.footerContainerText}>
                            <Text style={styles.footerContainerTextCounter}>
                                {productCardCounter.count} товаров на сумму
                            </Text>
                            <Text style={styles.footerContainerTextPrice}>
                                {formatPrice(productCardCounter.totalPrice)}
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
            )}

            <ProductCardEditModal visible={modalOpen} onClose={() => setModalOpen(false)}/>
            <ProductCardSettingsModal setEditModalOpen={() => setModalOpen(true)} visible={visible} setVisible={setVisible}/>
            <ProductCardActionsModal 
                visible={actionsModalVisible} 
                setVisible={setActionsModalVisible}
                selectedItems={getSelectedItems()}
                onSelectAll={handleSelectAll}
                onUnselectAll={handleUnselectAll}
                isAllSelected={isAllSelected()}
            />
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
