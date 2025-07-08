import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import BasketApi from '../../../api/BasketApi';

const DetailModal = ({ navigation, detailData, article, brand, visible = false, onClose, onAddToBasket, onBasketUpdated }) => {
    const [modalVisible, setModalVisible] = useState(visible);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToBasket, setIsAddingToBasket] = useState(false);
    const [showQuantityControls, setShowQuantityControls] = useState(false);
    
    // Синхронизируем состояние с пропсами
    useEffect(() => {
        setModalVisible(visible);
    }, [visible]);

    const showToast = (message) => {
        Toast.show({
            type: 'customToast',
            text1: message || 'Добавлено в корзину',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 60,
        });
    };

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

    const handleClose = () => {
        setModalVisible(false);
        setQuantity(1);
        setShowQuantityControls(false);
        if (onClose) {
            onClose();
        }
    };

    // Увеличение количества товара
    const increaseQuantity = () => {
        const maxAvailable = parseInt(detailData?.count) || 10;
        if (quantity < maxAvailable) {
            setQuantity(quantity + 1);
        } else {
            showToast(`Максимальное доступное количество: ${maxAvailable}`);
        }
    };

    // Уменьшение количества товара
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Добавление товара в корзину
    const handleAddToBasket = async () => {
        if (isAddingToBasket) return;
        
        // Показываем элементы управления количеством при первом нажатии
        if (!showQuantityControls) {
            setShowQuantityControls(true);
            return;
        }
        
        setIsAddingToBasket(true);
        
        try {
            // Подготавливаем данные для запроса
            const detailToAdd = {
                my_code: detailData?.my_code || "",
                ean13: detailData?.ean13 || "",
                article: detailData?.article || article || "",
                brand: detailData?.brand || brand || "",
                name: detailData?.name || "",
                cost: detailData?.cost || detailData?.price || 0,
                count: detailData?.count || 0,
                mcount: detailData?.mcount || 0,
                time: detailData?.time || 0,
                deliverer: detailData?.pl_name || detailData?.supplier || "Основной",
                deliverer_id: detailData?.deliverer_id || 3,
                is_excise: detailData?.is_excise || 0,
                deliverer_type: detailData?.deliverer_type || "sklad",
                detail_id: detailData?.id || detailData?.detail_id || 0,
                brand_id: detailData?.brand_id || 0,
                price: detailData?.price || detailData?.sale_price || 0,
                to_cart_count: quantity,
                comment: ""
            };
            
            console.log('Отправляем данные для добавления в корзину:', detailToAdd);
            const result = await BasketApi.addToBasket(detailToAdd);
            console.log('Результат добавления в корзину:', result);
            
            if (result && result.status === 'ok') {
                showToast(`${quantity} шт. добавлено в корзину`);
                
                // Если передан колбэк, вызываем его
                if (onAddToBasket) {
                    onAddToBasket();
                }
                
                // Закрываем модальное окно после успешного добавления
                handleClose();
            } else {
                Alert.alert("Ошибка", "Не удалось добавить товар в корзину");
            }
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            Alert.alert("Ошибка", "Произошла ошибка при добавлении товара в корзину");
        } finally {
            setIsAddingToBasket(false);
        }
    };

    return (
        <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View style={styles.goBackHeader}>
                            <TouchableOpacity onPress={handleClose}><Image style={styles.goBackIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/></TouchableOpacity>
                            <View>
                                <View style={styles.searchIconContainer}>
                                    <TouchableOpacity onPress={null}><Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')}/></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {detailData?.name || 'Деталь'}
                            </Text>
                            <Text style={styles.titleDescription}>
                                {detailData?.brand || brand || 'Производитель'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <ScrollView style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false}>
                           <View style={styles.card}>
                                <InfoRow label="Артикул" value={detailData?.article || article || 'Н/Д'} />
                                <InfoRow label="Бренд" value={detailData?.brand || brand || 'Н/Д'} />
                                <InfoRow label="Наименование" value={detailData?.name || 'Н/Д'} />
                                <InfoRow label="Количество" value={`${detailData?.count || '0'} шт.`} />
                                <InfoRow label="Срок доставки" value={detailData?.time || '0'} />
                                <InfoRow label="Тип" value={detailData?.type || 'Склад'} />
                                <InfoRow label="Поставщик" value={detailData?.pl_name || detailData?.supplier || 'Основной'} />
                                <InfoRow label="Закуп. цена" value={formatPrice(detailData?.price || detailData?.sale_price || detailData?.cost)} />
                            </View>
                        </ScrollView>
                    </View>
                
                    <View style={styles.footer}>
                        {showQuantityControls ? (
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity 
                                    style={styles.quantityButton} 
                                    onPress={decreaseQuantity}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                
                                <Text style={styles.quantityText}>{quantity}</Text>
                                
                                <TouchableOpacity 
                                    style={styles.quantityButton} 
                                    onPress={increaseQuantity}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        
                        <TouchableOpacity 
                            style={styles.saveButton} 
                            onPress={handleAddToBasket}
                            disabled={isAddingToBasket}
                        >
                            <Text style={styles.saveText}>
                                {showQuantityControls ? 'Добавить' : 'В корзину'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0E0E0',
    },

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



    main: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1
    },


     card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#828282',
        fontFamily: 'Roboto',
        fontSize: 16,
        width: '50%'
    },
    value: {
        color: '#333333',
        fontSize: 16,
        fontFamily: 'Roboto',
        width: '50%'
    },

    //   FOOTER

    footer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    saveButton: {
        backgroundColor: "#2F80ED",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontFamily: 'Roboto'
    },

    footerTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#828282'
    },
    
    // Стили для элементов управления количеством
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginHorizontal: 12
    }
})

export default DetailModal; 