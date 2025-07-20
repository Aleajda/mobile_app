import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import ProductCardOrder from './ProductCardOrder';
import BasketApi, { basketUpdateEvent } from '../../api/BasketApi';
import { useNavigation } from '@react-navigation/native';

const ProductCardBlock = forwardRef(({ setProductCardCounter }, ref) => {
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigation = useNavigation();

    
    useImperativeHandle(ref, () => ({
        getSelectedItemIds: () => selectedItems,
        handleSelectAll: () => {
            const allItemIds = basketItems.map(item => item.id || item.detail_id);
            setSelectedItems(allItemIds);
        },
        handleUnselectAll: () => {
            setSelectedItems([]);
        },
        isAllSelected: () => {
            if (!basketItems.length) return false;
            return selectedItems.length === basketItems.length;
        }
    }));

    
    useEffect(() => {
        loadBasketItems();
        
        
        const unsubscribe = basketUpdateEvent.addListener(loadBasketItems);
        
        
        return () => {
            unsubscribe();
        };
    }, []);

    
    useEffect(() => {
        updateProductCounter();
    }, [selectedItems, basketItems]);

    
    const loadBasketItems = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const items = await BasketApi.getBasketDetails();
            
            if (Array.isArray(items)) {
                setBasketItems(items);
                
                
                setSelectedItems([]);
            } else {
                setBasketItems([]);
                setSelectedItems([]);
            }
        } catch (err) {
            console.error('Ошибка при загрузке товаров из корзины:', err);
            setError('Не удалось загрузить товары из корзины');
            setBasketItems([]);
            setSelectedItems([]);
        } finally {
            setLoading(false);
        }
    };

    
    const updateProductCounter = () => {
        if (!basketItems.length) {
            setProductCardCounter({ count: 0, totalPrice: 0 });
            return;
        }
        
        let totalPrice = 0;
        
        
        selectedItems.forEach(itemId => {
            const item = basketItems.find(basketItem => 
                (basketItem.id === itemId || basketItem.detail_id === itemId)
            );
            
            if (item) {
                const itemPrice = parseFloat(item.price) || 0;
                const itemCount = parseInt(item.count || item.to_cart_count || 1);
                totalPrice += itemPrice * itemCount;
            }
        });
        
        setProductCardCounter({
            count: selectedItems.length,
            totalPrice
        });
    };

    
    const handleItemSelect = (itemId, isSelected) => {
        if (isSelected) {
            setSelectedItems(prev => [...prev, itemId]);
        } else {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        }
    };

    
    const handleItemUpdated = () => {
        
        loadBasketItems();
    };

    
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#2F80ED" />
                <Text style={styles.loaderText}>Загрузка товаров...</Text>
            </View>
        );
    }


    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    
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
                    index={index}
                    onItemUpdated={handleItemUpdated}
                    onSelect={handleItemSelect}
                    isSelected={selectedItems.includes(item.id || item.detail_id)}
                />
            ))}
        </View>
    );
});

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
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300
    },
    emptyTitle: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 20
    },
    searchButton: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: '#2F80ED99',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'transparent'
    },
    searchButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED',
        textAlign: 'center'
    }
});

export default ProductCardBlock;
