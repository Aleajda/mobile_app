import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import SearchProduct from './SearchProduct';
import DetailModal from './modal/DetailModal';

const AnalogBlock = ({ navigation, searchResult }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    
    // Получаем аналоги из результатов поиска
    const getAnalogs = () => {
        if (!searchResult || !searchResult.analogs) return [];
        return searchResult.analogs;
    };
    
    const analogs = getAnalogs();
    
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
            {analogs.length > 0 ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Аналоги
                        </Text>
                        <Text style={styles.description}>
                            найденные аналоги от других производителей
                        </Text>
                    </View>
                    
                    <FlatList
                        data={analogs}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id ? `analog-${item.id}` : `analog-${item.article}-${item.brand}-${index}`}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                    />
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Пока не найдено аналогов
                    </Text>
                </View>
            )}
            
            {selectedItem && (
                <DetailModal
                    navigation={navigation}
                    detailData={selectedItem}
                    article={selectedItem.article}
                    brand={selectedItem.brand}
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

export default AnalogBlock;
