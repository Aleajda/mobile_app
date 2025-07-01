import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Image } from 'react-native';
import ProductCardSettingsModal from './modal/ProductCardSettingsModal';
import ProductCardEditModal from './modal/ProductCardEditModal';

const ProductCardOrder = ({ item, price, setProductCardCounter, index, onItemUpdated }) => {
    // Инициализируем состояние чекбокса как не выбранное
    const [checked, setChecked] = useState(false);
    // Состояние для модальных окон
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    
    // Не обновляем счетчик при монтировании компонента,
    // так как изначально все товары не выбраны

    const onChecked = () => {
        // Получаем актуальное количество товара
        const itemCount = parseInt(item?.count || item?.to_cart_count || 1);
        // Получаем актуальную цену за все количество товара
        const totalItemPrice = price * itemCount;
        
        if (checked) {
            // Снимаем выделение с товара и вычитаем его цену из общей суммы
            setProductCardCounter(prev => ({
                totalPrice: prev.totalPrice - totalItemPrice,
                count: prev.count - 1,
            }));
            setChecked(false);
        } else {
            // Выделяем товар и добавляем его цену к общей сумме
            setProductCardCounter(prev => ({
                totalPrice: prev.totalPrice + totalItemPrice,
                count: prev.count + 1,
            }));
            setChecked(true);
        }
    }
    
    // Определение статуса наличия
    const getAvailabilityStatus = () => {
        if (!item) return { text: 'Нет в наличии', color: '#EB5757', bgColor: '#EB57571A' };
        
        const quantity = parseInt(item.count) || 0;
        const time = parseInt(item.time) || 0;
        
        if (quantity > 0 && time === 0) {
            return { 
                text: `В наличии — ${quantity} шт.`, 
                color: '#27AE60',
                bgColor: '#27AE601A'
            };
        } else if (time === 0) {
            return { 
                text: 'В наличии', 
                color: '#27AE60',
                bgColor: '#27AE601A'
            };
        } else {
            return { 
                text: `Доставка ${time} ${time === 1 ? 'день' : time < 5 ? 'дня' : 'дней'}`, 
                color: '#F2994A',
                bgColor: '#F2994A1A'
            };
        }
    };
    
    // Открытие модального окна редактирования
    const openEditModal = () => {
        setEditModalVisible(true);
    };
    
    // Обработчик обновления товара
    const handleItemUpdated = () => {
        if (onItemUpdated) {
            onItemUpdated();
        }
    };
    
    const availability = getAvailabilityStatus();
    
    // Форматирование количества
    const formatQuantity = () => {
        const count = item?.count || item?.to_cart_count || 1;
        return `${count} шт.`;
    };

    return (
        <View style={styles.order}>
            <View style={styles.orderHeader}>
                <Pressable onPress={() => onChecked()} style={styles.wrapper}>
                    <View style={[styles.box, checked && styles.checkedBox]}>
                        {checked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                </Pressable>
                <View style={{flex: 1}}>
                    <Text style={styles.orderTitle}>{item?.name || 'Масляной фильтр'}</Text>
                    <Text style={styles.orderTitle2}>{item?.brand || 'Mahle/Knecht'}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.settingsButton}
                    onPress={() => setSettingsModalVisible(true)}
                >
                    <Image 
                        source={require('@assets/images/menu_icon.png')}
                        style={styles.settingsIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Поставщик</Text>
                <Text style={styles.orderBuyerName}>{item?.deliverer || 'ООО "ПАРТКОМ"'}</Text>
            </View>
            <View style={[styles.orderStatus, { backgroundColor: availability.bgColor }]}>
                <Text style={[styles.orderStatusText, { color: availability.color }]}>
                    {availability.text}
                </Text>
            </View>
            <View style={styles.orderBorder}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Стоимость
                </Text>
                <Text style={styles.orderParamText}>
                    {price} ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Продать за
                </Text>
                <Text style={styles.orderParamText}>
                    {price} ₽
                </Text>
            </View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Количество
                </Text>
                <Text style={styles.orderParamText}>
                    {formatQuantity()}
                </Text>
            </View>
            <View style={[styles.orderBorder, {marginTop: 16}]}></View>
            <View style={styles.orderParam}>
                <Text style={styles.orderParamTitle}>
                    Итого
                </Text>
                <Text style={styles.orderParamText}>
                    {price * (item?.count || item?.to_cart_count || 1)} ₽
                </Text>
            </View>
            
            {/* Модальное окно настроек */}
            <ProductCardSettingsModal 
                visible={settingsModalVisible}
                setVisible={setSettingsModalVisible}
                setEditModalOpen={openEditModal}
                itemIndex={index}
                onItemDeleted={handleItemUpdated}
            />
            
            {/* Модальное окно редактирования */}
            <ProductCardEditModal 
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                item={item}
                itemIndex={index}
                onItemUpdated={handleItemUpdated}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    orderTitle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },
    orderTitle2: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7,
        marginBottom: 16,
    },
    orderBuyer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2F80ED1A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    orderBuyerStatus: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        opacity: 0.5
    },
    orderBuyerName: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderStatus: {
        backgroundColor: '#27AE601A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    orderStatusText: {
        fontFamily: 'Roboto',
        color: '#27AE60',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderBorder: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    orderParam: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    orderParamTitle: {
        width: '50%',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7
    },
    orderParamText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        letterSpacing: 0
    },
    wrapper: {
        paddingTop: 3,
        marginRight: 15
    },
    box: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#2F80ED',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    checkedBox: {
        backgroundColor: '#1a73e8',
    },
    checkmark: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 16,
    },
    settingsButton: {
        padding: 5,
    },
    settingsIcon: {
        width: 24,
        height: 24,
    }
})

export default ProductCardOrder;
