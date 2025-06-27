import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Компонент для отображения строки информации
const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
);

const DetailScreen = ({ navigation, route }) => {
    const [modalOpen, setModalOpen] = useState(false);
    
    // Получаем данные о детали из навигации
    const { detailData, article, brand } = route.params || {};
    
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

    const showToast = () => {
        Toast.show({
            type: 'customToast',
            text1: 'Добавлено в корзину',
            text2: 'Subtitle',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 60,
        });
    };
    
    // Возврат к результатам поиска
    const returnToSearch = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.goBackHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.goBackIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.searchIconContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Search detail")}>
                                <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')}/>
                            </TouchableOpacity>
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
                        <InfoRow label="Артикул" value={detailData?.article || article} />
                        <InfoRow label="Бренд" value={detailData?.brand || brand} />
                        <InfoRow label="Наименование" value={detailData?.name} />
                        <InfoRow label="Срок доставки" value={`${detailData?.time || 0} дн.`} />
                        <InfoRow label="Тип" value={detailData?.type === 'warehouse' ? 'Склад' : 'Поставщик'} />
                        <InfoRow label="Поставщик" value={detailData?.pl_name || detailData?.supplier || 'Основной'} />
                        <InfoRow label="Закуп. цена" value={formatPrice(detailData?.price || detailData?.sale_price || detailData?.cost)} />
                    </View>
                    
                    <TouchableOpacity style={styles.returnButton} onPress={returnToSearch}>
                        <Text style={styles.returnButtonText}>Вернуться к результатам поиска</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            
            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Цена</Text>
                    <Text style={styles.priceValue}>{formatPrice(detailData?.price || detailData?.sale_price || detailData?.cost)}</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={showToast}>
                    <Text style={styles.addButtonText}>В корзину</Text>
                </TouchableOpacity>
            </View>
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
    main: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    infoLabel: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7,
    },
    infoValue: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    returnButton: {
        backgroundColor: "#2F80ED",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    returnButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontFamily: 'Roboto'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#828282',
    },
    priceValue: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    addButton: {
        backgroundColor: "#2F80ED",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontFamily: 'Roboto'
    },
})

export default DetailScreen;
