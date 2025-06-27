import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';
import SearchApi from '../../api/SearchApi';

const SearchDetailScreen = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState('');
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearInput = () => {
        setSearchValue('');
        setBrands([]);
    };

    const searchBrands = async () => {
        if (!searchValue.trim() || searchValue.length < 3) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const result = await SearchApi.getBrands(searchValue.toUpperCase());
            if (result) {
                // Ensure each item has a unique key property
                const brandsWithKeys = result.map((brand, index) => ({
                    ...brand,
                    uniqueKey: `brand-${brand.brand_id || ''}-${brand.brand || ''}-${index}`
                }));
                setBrands(brandsWithKeys);
            } else {
                setError('Не удалось найти бренды по указанному артикулу');
            }
        } catch (err) {
            console.error('Ошибка поиска брендов:', err);
            setError('Произошла ошибка при поиске. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    // Автоматический поиск при вводе 3 и более символов
    useEffect(() => {
        if (searchValue.length >= 3) {
            const timer = setTimeout(() => {
                searchBrands();
            }, 500); // Задержка 500мс для предотвращения частых запросов при быстром вводе
            
            return () => clearTimeout(timer);
        } else if (searchValue.length === 0) {
            setBrands([]);
        }
    }, [searchValue]);

    const handleBrandSelect = (brand) => {
        navigation.navigate("Found detail", { 
            article: searchValue, 
            brand: brand.brand,
            brandId: brand.brand_id,
            detailId: brand.detail_id || '',
            description: brand.name || ''
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.headerTextTitle}>Поиск детали</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.headerTextCancel}>Отменить</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerInput}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#828282"
                            cursorColor="#2F80ED"
                            placeholder="Поиск детали"
                            value={searchValue}
                            onChangeText={setSearchValue}
                            returnKeyType="search"
                        />
                        {searchValue.length > 0 && (
                            <TouchableOpacity onPress={clearInput} style={styles.iconWrapper}>
                                <Image
                                    style={styles.icon}
                                    source={require('@assets/images/close_24px.png')}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.main}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2F80ED" />
                        <Text style={styles.loadingText}>Поиск брендов...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : brands.length > 0 ? (
                    <View style={styles.mainContent}>
                        <Text style={styles.mainContentBrands}>Бренды</Text>
                        <FlatList
                            data={brands}
                            keyExtractor={(item) => item.uniqueKey || `brand-${item.brand || ''}-${Math.random().toString(36).substr(2, 9)}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleBrandSelect(item)}>
                                    <View style={styles.brandListItem}>
                                        <Text style={styles.brandListTitle}>{item.brand}</Text>
                                        <Text style={styles.brandListDescription}>{item.name || 'Неизвестно'}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            style={styles.mainContentBrandList}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                ) : searchValue.length > 0 && searchValue.length < 3 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Введите минимум 3 символа для поиска</Text>
                    </View>
                ) : searchValue.length >= 3 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Ничего не найдено</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTextTitle: {
        fontSize: 24,
        color: '#333333',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0 
    },
    headerTextCancel: {
        fontSize: 16,
        color: '#333333',
        color: '#2F80ED',
        fontWeight: 'bold',
        letterSpacing: 0 
    },
    headerInput: {
        gap: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#2D9CDB',
        borderRadius: 8,    
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 16,
        height: 40,
        fontFamily: 'Roboto',
        fontSize: 16
    },
    iconWrapper: {
        marginRight: 12
    },
    icon: {
        width: 24,
        height: 24,
    },
    main: {
        flex: 1,
        padding: 16,
    },
    mainContent: {
        flex: 1,
    },
    mainContentBrands: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'Roboto'
    },
    mainContentBrandList: {
        flex: 1,
    },
    brandListItem: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 4,
    },
    brandListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#333333'
    },
    brandListDescription: {
        fontSize: 16,
        color: '#333333',
        fontFamily: 'Roboto',
        opacity: 0.7
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#EB5757',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#828282',
        textAlign: 'center',
    },
});

export default SearchDetailScreen;
