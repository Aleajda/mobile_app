import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import OriginalBlock from '../../components/search/OriginalBlock';
import AnalogBlock from '../../components/search/AnalogBlock';
import SearchApi from '../../api/SearchApi';
import BasketApi, { basketUpdateEvent } from '../../api/BasketApi';
import { useFocusEffect } from '@react-navigation/native';
import SearchProduct from '../../components/search/SearchProduct';
import DetailModal from '../../components/search/modal/DetailModal';


const removeSpecialChars = (str) => {
    if (!str) return '';
    return str.replace(/[\s+\.\/_&\-#]/g, '').toUpperCase();
};


const WarehouseBlock = ({ navigation, searchResult, article, brand, brandId, reqid }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    
    
    const getItems = () => {
        if (!searchResult || !searchResult.items) return [];
        return searchResult.items;
    };
    
    const items = getItems();
    
    
    const originals = items.filter(item => 
        item.article && item.brand && 
        removeSpecialChars(item.article) === removeSpecialChars(article) && 
        (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
         (item.brand_id && brandId && item.brand_id === brandId))
    );
    
    const analogs = items.filter(item => 
        !(item.article && item.brand && 
        removeSpecialChars(item.article) === removeSpecialChars(article) && 
        (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
         (item.brand_id && brandId && item.brand_id === brandId)))
    );
    
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
            <View style={warehouseStyles.emptyContainer}>
                <Text style={warehouseStyles.emptyText}>Товары на складе не найдены</Text>
            </View>
        );
    }

    
    const renderItemsList = (itemsList, title) => {
        if (!itemsList || itemsList.length === 0) return null;
        
        return (
            <View style={warehouseStyles.section}>
                <Text style={warehouseStyles.sectionTitle}>{title}</Text>
                <FlatList
                    data={itemsList}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item)}>
                            <SearchProduct item={item} reqid={reqid} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => item.id ? `warehouse-${title}-${item.id}` : `warehouse-${title}-${item.article}-${item.brand}-${index}`}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                />
            </View>
        );
    };

    return (
        <View style={{marginBottom: 32}}>
            <View style={warehouseStyles.header}>
                <Text style={warehouseStyles.title}>
                    Склад
                </Text>
                <Text style={warehouseStyles.description}>
                    найденные детали на складе
                </Text>
            </View>
            
            {renderItemsList(originals, "Оригиналы")}
            {renderItemsList(analogs, "Аналоги")}
            
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
};


const warehouseStyles = StyleSheet.create({
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
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
        marginBottom: 8,
    },
});


const FoundDetailScreen = ({ navigation, route }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
    const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    
    const [deliveryFilter, setDeliveryFilter] = useState("all");
    
    const [warehouseData, setWarehouseData] = useState({ items: [], analogs: [] });
    const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
    
    
    const { article, brand, brandId, detailId } = route.params || {};
    
    
    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState({ items: [], analogs: [] });
    const [filteredResults, setFilteredResults] = useState({ items: [], analogs: [] });
    const [searchController, setSearchController] = useState(null);
    const [itemsCount, setItemsCount] = useState({ originals: 0, analogs: 0, warehouse: 0 });
    
    
    const [allSearchResults, setAllSearchResults] = useState({ items: [], analogs: [] });
    
    
    const [searchReqId, setSearchReqId] = useState("");

    
    useEffect(() => {
        return () => {
            
            if (searchController) {
                searchController.stopSearch();
            }
        };
    }, []);
    

    const clearSearchData = () => {
        if (searchController) {
            searchController.stopSearch();
        }
        setSearchResults({ items: [], analogs: [] });
        setFilteredResults({ items: [], analogs: [] });
        setAllSearchResults({ items: [], analogs: [] }); 
        setItemsCount({ originals: 0, analogs: 0, warehouse: itemsCount.warehouse });
        setIsSearching(false);
    };
    
    
    useEffect(() => {
        if (!allSearchResults.items && !allSearchResults.analogs) return;
        
        
        const filterByDelivery = (items) => {
            if (deliveryFilter === "all") return items; 
            
            return items.filter(item => {
                const time = parseInt(item.time) || 0;
                
                if (deliveryFilter === 0) {
                    
                    return time === 0;
                } else if (deliveryFilter === 3) {
                    
                    return time > 0 && time <= 3;
                } else if (deliveryFilter === 7) {
                    
                    return time >= 3 && time <= 7;
                }
                
                return true;
            });
        };
        
        
        const sortByPrice = (a, b) => {
            const priceA = parseFloat(a.price || a.sale_price || a.cost || 0);
            const priceB = parseFloat(b.price || b.sale_price || b.cost || 0);
            return priceA - priceB;
        };
        
        
        const filteredItems = filterByDelivery(allSearchResults.items || []);
        const filteredAnalogs = filterByDelivery(allSearchResults.analogs || []);
        
        
        const sortedItems = [...filteredItems].sort(sortByPrice).slice(0, 10);
        const sortedAnalogs = [...filteredAnalogs].sort(sortByPrice).slice(0, 10);
        
        console.log('Всего накоплено оригиналов:', allSearchResults.items.length);
        console.log('Всего накоплено аналогов:', allSearchResults.analogs.length);
        console.log('После фильтрации оригиналов:', filteredItems.length);
        console.log('После фильтрации аналогов:', filteredAnalogs.length);
        console.log('Топ-10 оригиналов по цене:', sortedItems.length);
        console.log('Топ-10 аналогов по цене:', sortedAnalogs.length);
        
        
        setFilteredResults({
            items: sortedItems,
            analogs: sortedAnalogs
        });
        
        
        setItemsCount(prevCounts => ({
            ...prevCounts,
            originals: Math.min(10, filteredItems.length),
            analogs: Math.min(10, filteredAnalogs.length)
        }));
        
    }, [allSearchResults, deliveryFilter]);
    
    
    useEffect(() => {
        loadWarehouseData();
    }, [article, brand, brandId]);
    
    
    useFocusEffect(
        useCallback(() => {
            console.log('Экран получил фокус, запускаем поиск');
            
            clearSearchData();
            startSearch();
            
            return () => {
                console.log('Экран потерял фокус, очищаем данные');
                clearSearchData();
            };
        }, [article, brand, brandId, detailId]) 
    );
    
    
    const loadWarehouseData = async () => {
        setIsLoadingWarehouse(true);
        try {
            const result = await SearchApi.searchByArticle(article, brand, brandId);
            
            console.log('Получен ответ от search_by_article');
            
            
            let skladDetails = [];
            
            if (result && result.sklad_details && Array.isArray(result.sklad_details)) {
                skladDetails = result.sklad_details;
                console.log('Найдено товаров на складе:', skladDetails.length);
                
                if (skladDetails.length > 0) {
                    console.log('Пример товара со склада:', JSON.stringify(skladDetails[0], null, 2));
                }
            } else {
                console.log('Поле sklad_details отсутствует или не является массивом');
            }
            
            if (skladDetails.length > 0) {
                
                const originals = skladDetails.filter(item => 
                    item && item.article && brand &&
                    removeSpecialChars(item.article) === removeSpecialChars(article) && 
                    (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
                     (item.brand_id && brandId && item.brand_id === brandId))
                );
                
                const analogs = skladDetails.filter(item => 
                    !(item && item.article && brand &&
                    removeSpecialChars(item.article) === removeSpecialChars(article) && 
                    (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
                     (item.brand_id && brandId && item.brand_id === brandId)))
                );
                
                console.log('Найдено оригиналов на складе:', originals.length);
                console.log('Найдено аналогов на складе:', analogs.length);
                
                setWarehouseData({
                    items: originals,
                    analogs: analogs,
                    all: skladDetails
                });
                
                
                setItemsCount(prevCounts => ({
                    ...prevCounts,
                    warehouse: skladDetails.length
                }));
            } else {
                console.log('Нет товаров на складе');
                
                setWarehouseData({
                    items: [],
                    analogs: [],
                    all: []
                });
                
                setItemsCount(prevCounts => ({
                    ...prevCounts,
                    warehouse: 0
                }));
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных со склада:', error);
            
            setWarehouseData({
                items: [],
                analogs: [],
                all: []
            });
            
            setItemsCount(prevCounts => ({
                ...prevCounts,
                warehouse: 0
            }));
        } finally {
            setIsLoadingWarehouse(false);
        }
    };
    
    
    const handleDeliveryFilterChange = (newFilter) => {
        
        const updatedFilter = deliveryFilter === newFilter ? "all" : newFilter;
        setDeliveryFilter(updatedFilter);
        
        
        clearSearchData();
        startSearch();
    };
    
    
    const startSearch = () => {
        setIsSearching(true);
        setSearchResults({ items: [], analogs: [] });
        setFilteredResults({ items: [], analogs: [] });
        setAllSearchResults({ items: [], analogs: [] }); 
        setSearchReqId(""); 
        setItemsCount(prevCounts => ({
            ...prevCounts,
            originals: 0,
            analogs: 0
        }));
        
        const controller = SearchApi.searchContinuous(
            article.toUpperCase(),
            brand,
            brandId,
            detailId,
            
            (result) => {
                console.log('Получены результаты:', result.totalCount);
                
                
                if (result && result.reqid && !searchReqId) {
                    console.log('Сохраняем reqid:', result.reqid);
                    setSearchReqId(result.reqid);
                }
                
                if (result && result.items) {
                    
                    const originals = result.items.filter(item => 
                        item.article && item.brand && 
                        removeSpecialChars(item.article) === removeSpecialChars(article) && 
                        (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
                         (item.brand_id && brandId && item.brand_id === brandId))
                    );
                    const analogs = result.items.filter(item => 
                        !(item.article && item.brand && 
                        removeSpecialChars(item.article) === removeSpecialChars(article) && 
                        (removeSpecialChars(item.brand) === removeSpecialChars(brand) || 
                         (item.brand_id && brandId && item.brand_id === brandId)))
                    );
                    
                    
                    setAllSearchResults(prevResults => {
                        
                        const isItemInArray = (item, array) => {
                            return array.some(existingItem => 
                                (item.id && existingItem.id && item.id === existingItem.id) || 
                                (item.article && item.brand && existingItem.article && existingItem.brand &&
                                 item.article === existingItem.article && item.brand === existingItem.brand)
                            );
                        };
                        
                        
                        const newOriginals = originals.filter(item => !isItemInArray(item, prevResults.items));
                        const newAnalogs = analogs.filter(item => !isItemInArray(item, prevResults.analogs));
                        
                        console.log('Получено новых оригиналов:', originals.length);
                        console.log('Добавлено новых уникальных оригиналов:', newOriginals.length);
                        console.log('Получено новых аналогов:', analogs.length);
                        console.log('Добавлено новых уникальных аналогов:', newAnalogs.length);
                        
                        return {
                            items: [...prevResults.items, ...newOriginals],
                            analogs: [...prevResults.analogs, ...newAnalogs]
                        };
                    });
                    
                    
                    setSearchResults({
                        items: originals,
                        analogs: analogs
                    });
                }
            },
            
            (finalResult) => {
                setIsSearching(false);
            },
            
            (error) => {
                console.error('Ошибка поиска:', error);
                setIsSearching(false);
            }
        );
        
        setSearchController(controller);
    };
    
    
    const stopSearch = () => {
        if (searchController) {
            searchController.stopSearch();
            setIsSearching(false);
        }
    };

    
    const handleGoBack = () => {
        
        setDeliveryFilter("all");
        clearSearchData();
        navigation.navigate("Search detail");
    };

    
    const renderContent = () => {
        if (activeButton === 1) {
            return (
                <OriginalBlock 
                    navigation={navigation} 
                    searchResult={{ items: filteredResults.items }} 
                    article={article}
                    brand={brand}
                    brandId={brandId}
                    reqid={searchReqId}
                />
            );
        } else if (activeButton === 2) {
            return (
                <AnalogBlock 
                    navigation={navigation} 
                    searchResult={{ analogs: filteredResults.analogs }}
                    article={article}
                    brand={brand}
                    brandId={brandId}
                    reqid={searchReqId}
                />
            );
        } else if (activeButton === 3) {
            
            if (isLoadingWarehouse) {
                return (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2F80ED" />
                        <Text style={styles.loaderText}>Загрузка данных со склада...</Text>
                    </View>
                );
            }
            
            
            return (
                <WarehouseBlock 
                    navigation={navigation} 
                    searchResult={{ items: warehouseData.all }} 
                    article={article}
                    brand={brand}
                    brandId={brandId}
                    reqid={searchReqId}
                />
            );
        }
        
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.goBackHeader}>
                    <TouchableOpacity onPress={handleGoBack}><Image style={styles.goBackIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/></TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {article || "CO90"}
                    </Text>
                    <Text style={styles.titleDescription}>
                        {brand || "Масляной фильтр"}
                    </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity onPress={() => handleDeliveryFilterChange("all")}>
                            <View style={[styles.headerButton, deliveryFilter === "all" ? styles.activeHeaderButton : null]}>
                                <Text style={[styles.headerButtonText, deliveryFilter === "all" ? styles.activeHeaderButtonText : null]}>
                                    Все
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeliveryFilterChange(0)}>
                            <View style={[styles.headerButton, deliveryFilter === 0 ? styles.activeHeaderButton : null]}>
                                <Text style={[styles.headerButtonText, deliveryFilter === 0 ? styles.activeHeaderButtonText : null]}>
                                    В наличии
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeliveryFilterChange(3)}>
                            <View style={[styles.headerButton, deliveryFilter === 3 ? styles.activeHeaderButton : null]}>
                                <Text style={[styles.headerButtonText, deliveryFilter === 3 ? styles.activeHeaderButtonText : null]}>
                                    до 3 дней
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeliveryFilterChange(7)}>
                            <View style={[styles.headerButton, deliveryFilter === 7 ? styles.activeHeaderButton : null]}>
                                <Text style={[styles.headerButtonText, deliveryFilter === 7 ? styles.activeHeaderButtonText : null]}>
                                    3-7 дней
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.headerSwitchButtonsScroll}>
                    <View style={styles.headerSwitchButtons}>
                        <TouchableOpacity onPress={() => setActiveButton(3)}>
                            <View style={[styles.headerSwitchButtonContainer, activeButton == 3 ? styles.activeHeaderSwitchButtonContainer : null]}>
                                <Text style={[styles.headerSwitchButton, activeButton == 3 ? styles.activeHeaderSwitchButton : null]}>
                                    На складе
                                </Text>
                                <View style={[styles.countContainer, activeButton == 3 ? styles.activeCountContainer : null]}>
                                    <Text style={[styles.count, activeButton == 3 ? styles.activeCount : null]}>
                                        {itemsCount.warehouse}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveButton(1)}>
                            <View style={[styles.headerSwitchButtonContainer, activeButton == 1 ? styles.activeHeaderSwitchButtonContainer : null]}>
                                <Text style={[styles.headerSwitchButton, activeButton == 1 ? styles.activeHeaderSwitchButton : null]}>
                                    Оригиналов
                                </Text>
                                <View style={[styles.countContainer, activeButton == 1 ? styles.activeCountContainer : null]}>
                                    <Text style={[styles.count, activeButton == 1 ? styles.activeCount : null]}>
                                        {itemsCount.originals}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveButton(2)}>
                            <View style={[styles.headerSwitchButtonContainer, activeButton == 2 ? styles.activeHeaderSwitchButtonContainer : null]}>
                                <Text style={[styles.headerSwitchButton, activeButton == 2 ? styles.activeHeaderSwitchButton : null]}>
                                    Аналогов
                                </Text>
                                <View style={[styles.countContainer, activeButton == 2 ? styles.activeCountContainer : null]}>
                                    <Text style={[styles.count, activeButton == 2 ? styles.activeCount : null]}>
                                        {itemsCount.analogs}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.main}>
                <ScrollView style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
        
            <View style={styles.footer}>
                {isSearching && activeButton !== 3 ? (
                    <View style={styles.searchingContainer}>
                        <ActivityIndicator size="small" color="#2F80ED" />
                        <Text style={styles.footerTitle}>Ищем...</Text>
                    </View>
                ) : (
                    <Text style={styles.footerTitle}>
                        {activeButton === 3 ? "Данные со склада" : "Поиск завершен"}
                    </Text>
                )}
                
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={activeButton === 3 ? loadWarehouseData : (isSearching ? stopSearch : startSearch)}
                >
                    <Text style={styles.saveText}>
                        {activeButton === 3 
                            ? "Обновить данные" 
                            : (isSearching ? "Остановить поиск" : "Повторить поиск")
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    // GO BACK HEADER

    goBackHeader: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 24
    },
    goBackIcon: {
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
    activeHeaderButton: {
        backgroundColor: '#2F80ED1A',
    },
    activeHeaderButtonText: {
        color: '#2F80ED',
    },



    // SWITCHES
    headerSwitchButtonsScroll: {
        marginBottom: 8
    },
    headerSwitchButtons: {
        flexDirection: 'row',
        gap: 16,
        paddingRight: 16
    },
    activeHeaderSwitchButtonContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#2F80ED'
    },
    activeHeaderSwitchButton: {
        color: '#2F80ED'
    },
    headerSwitchButtonContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'flex-end'
    },
    headerSwitchButton: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    countContainer: {
        borderRadius: 16,
        backgroundColor: '#3333331A',
        width: 19,
        height: 19,
        alignItems: 'center',
        justifyContent: 'center',
        
        marginLeft: 4
    },
    activeCountContainer: {
        backgroundColor: '#2F80ED33'
    },
    count: {
        fontFamily: 'Roboto',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 12,
    },
    activeCount: {
        color: '#2F80ED'
    },


    main: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1
    },

    //   FOOTER

  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  
  searchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32
  },
  loaderText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
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

export default FoundDetailScreen;
