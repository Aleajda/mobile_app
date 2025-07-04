import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import ProductCardOrder from './ProductCardOrder';
import BasketApi, { basketUpdateEvent } from '../../api/BasketApi';
import { useNavigation } from '@react-navigation/native';

const ProductCardBlock = ({ setProductCardCounter }) => {
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    // Загрузка товаров из корзины при монтировании компонента
    useEffect(() => {
        loadBasketItems();
        
        // Подписываемся на событие обновления корзины
        const unsubscribe = basketUpdateEvent.addListener(loadBasketItems);
        
        // Отписываемся при размонтировании компонента
        return () => {
            unsubscribe();
        };
    }, []);

    // Функция загрузки товаров из корзины
    const loadBasketItems = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const items = await BasketApi.getBasketDetails();
            
            if (Array.isArray(items)) {
                setBasketItems(items);
                
                // Обновляем счетчик в родительском компоненте
                // Изначально ничего не выбрано, поэтому count = 0
                setProductCardCounter({
                    count: 0,
                    totalPrice: 0
                });
            } else {
                setBasketItems([]);
                setProductCardCounter({ count: 0, totalPrice: 0 });
            }
        } catch (err) {
            console.error('Ошибка при загрузке товаров из корзины:', err);
            setError('Не удалось загрузить товары из корзины');
            setBasketItems([]);
            setProductCardCounter({ count: 0, totalPrice: 0 });
        } finally {
            setLoading(false);
        }
    };

    // Обработчик обновления товара
    const handleItemUpdated = () => {
        // Перезагружаем список товаров
        loadBasketItems();
    };

    // Если идет загрузка, показываем индикатор
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#2F80ED" />
                <Text style={styles.loaderText}>Загрузка товаров...</Text>
            </View>
        );
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // Если корзина пуста, показываем сообщение
    if (basketItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Здесь пока пусто</Text>
                <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={() => navigation.navigate('Search detail')}
                >
                    <Text style={styles.searchButtonText}>Искать детали</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{gap: 4}}>
            {basketItems.map((item, index) => (
                <ProductCardOrder 
                    key={`${item.id || item.detail_id || ''}-${index}`}
                    item={item}
                    price={parseFloat(item.price) || 0}
                    price_dealer= {item.dealer_price}
                    setProductCardCounter={setProductCardCounter}
                    index={index}
                    onItemUpdated={handleItemUpdated}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        marginTop: 10
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFEBEE',
        borderRadius: 8
    },
    errorText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#B00020',
        textAlign: 'center'
    },
    emptyContainer: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        minHeight: 300
    },
    emptyTitle: {
        fontFamily: 'Roboto',
        fontSize: 24,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 20
    },
    searchButton: {
        backgroundColor: '#2F80ED',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20
    },
    searchButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ProductCardBlock;
