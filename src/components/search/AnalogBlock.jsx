import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import SearchProduct from './SearchProduct';

const AnalogBlock = ({ navigation, searchResult }) => {
    // Получаем аналоги из результатов поиска
    const getAnalogs = () => {
        if (!searchResult || !searchResult.analogs) return [];
        return searchResult.analogs;
    };
    
    const analogs = getAnalogs();
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate("Detail", { 
                detailData: item,
                article: item.article,
                brand: item.brand
            })}
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
                            10 самых дешевых аналогов от других производителей
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
