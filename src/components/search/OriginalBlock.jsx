import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import SearchProduct from './SearchProduct';
import DetailModal from './modal/DetailModal';

const OriginalBlock = ({ navigation, searchResult, article, brand }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    
    // Получаем данные из результатов поиска
    const getItems = () => {
        if (!searchResult || !searchResult.items) return [];
        return searchResult.items;
    };
    
    const items = getItems();
    
    const handleItemPress = (item) => {
        setSelectedItem(item);
        setDetailModalVisible(true);
    };
    
    const handleCloseDetail = () => {
        setDetailModalVisible(false);
        setSelectedItem(null);
    };
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => handleItemPress(item)}
        >
            <SearchProduct item={item} />
        </TouchableOpacity>
    );

    return (
        <View style={{marginBottom: 32}}>
            {items.length > 0 ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Оригинальные детали
                        </Text>
                        <Text style={styles.description}>
                            найденные оригинальные детали
                        </Text>
                    </View>
                    
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id ? `original-${item.id}` : `original-${item.article}-${item.brand}-${index}`}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                    />
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Пока не найдено оригинальных деталей
                    </Text>
                </View>
            )}
            
            {selectedItem && (
                <DetailModal
                    navigation={navigation}
                    detailData={selectedItem}
                    article={article}
                    brand={brand}
                    visible={detailModalVisible}
                    onClose={handleCloseDetail}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 16
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333'
    },
    description: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7
    },
    emptyContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#828282',
        textAlign: 'center',
    },
})

export default OriginalBlock;
