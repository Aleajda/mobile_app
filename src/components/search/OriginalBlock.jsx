import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import SearchProduct from './SearchProduct';
import DetailModal from './modal/DetailModal';

    
const removeSpecialChars = (str) => {
    if (!str) return '';
    return str.replace(/[\s+\.\/_&\-#]/g, '').toUpperCase();
};

const OriginalBlock = ({ navigation, searchResult, article, brand, brandId, reqid = "" }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    
    
    const getItems = () => {
        if (!searchResult || !searchResult.items) return [];
        
        
        return searchResult.items.filter(item => 
            item && item.article && article && 
            removeSpecialChars(item.article) === removeSpecialChars(article) && 
            ((item.brand && brand && removeSpecialChars(item.brand) === removeSpecialChars(brand)) || 
             (item.brand_id && brandId && item.brand_id === brandId))
        );
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

    
    if (!items || items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Оригинальные детали не найдены</Text>
            </View>
        );
    }

    return (
        <View style={{marginBottom: 32}}>
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
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <SearchProduct item={item} reqid={reqid} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item.id ? `original-${item.id}` : `original-${item.article}-${item.brand}-${index}`}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            />
            
            {selectedItem && (
                <DetailModal
                    navigation={navigation}
                    detailData={selectedItem}
                    article={article}
                    brand={brand}
                    visible={detailModalVisible}
                    onClose={handleCloseDetail}
                    reqid={reqid}
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
