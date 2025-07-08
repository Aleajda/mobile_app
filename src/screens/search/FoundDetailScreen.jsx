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


// Компонент для отображения товаров на складе
const WarehouseBlock = ({ navigation, searchResult, article, brand }) => {
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

    // Если нет результатов, показываем сообщение
    if (!items || items.length === 0) {
        return (
            <View style={warehouseStyles.emptyContainer}>
                <Text style={warehouseStyles.emptyText}>Товары на складе не найдены</Text>
            </View>
        );
    }

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
            
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <SearchProduct item={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item.id ? `warehouse-${item.id}` : `warehouse-${item.article}-${item.brand}-${index}`}
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
                />
            )}
        </View>
    );
};

// Стили для компонента WarehouseBlock (копия стилей из OriginalBlock)
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
});


const FoundDetailScreen = ({ navigation, route }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
    const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    // Добавляем состояние для фильтра доставки: null - без фильтра, 0 - в наличии, 1-3 - до 3 дней, 4-7 - 3-7 дней
    const [deliveryFilter, setDeliveryFilter] = useState("all");
    // Состояние для хранения данных со склада
    const [warehouseData, setWarehouseData] = useState({ items: [], analogs: [] });
    const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
    
    // Получаем параметры из навигации
    const { article, brand, brandId, detailId } = route.params || {};
    
    // Состояния для поиска
    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState({ items: [], analogs: [] });
    const [filteredResults, setFilteredResults] = useState({ items: [], analogs: [] });
    const [searchController, setSearchController] = useState(null);
    const [itemsCount, setItemsCount] = useState({ originals: 0, analogs: 0, warehouse: 0 });
    
    // Запускаем поиск при загрузке экрана
    useEffect(() => {
        return () => {
            // Останавливаем поиск при размонтировании компонента
            if (searchController) {
                searchController.stopSearch();
            }
        };
    }, []);
    
    // Функция для очистки данных
    const clearSearchData = () => {
        if (searchController) {
            searchController.stopSearch();
        }
        setSearchResults({ items: [], analogs: [] });
        setFilteredResults({ items: [], analogs: [] });
        setItemsCount({ originals: 0, analogs: 0, warehouse: itemsCount.warehouse });
        setIsSearching(false);
    };
    
    // Применяем фильтр по доставке к результатам
    useEffect(() => {
        if (!searchResults.items && !searchResults.analogs) return;
        
        // Функция для фильтрации по времени доставки
        const filterByDelivery = (items) => {
            if (deliveryFilter === "all") return items; // Без фильтра
            
            return items.filter(item => {
                const time = parseInt(item.time) || 0;
                
                if (deliveryFilter === 0) {
                    // В наличии (время доставки = 0)
                    return time === 0;
                } else if (deliveryFilter === 3) {
                    // До 3 дней (время доставки от 1 до 3 дней)
                    return time > 0 && time <= 3;
                } else if (deliveryFilter === 7) {
                    // 3-7 дней (время доставки от 3 до 7 дней)
                    return time >= 3 && time <= 7;
                }
                
                return true;
            });
        };
        
        // Применяем фильтр к оригиналам и аналогам
        const filteredItems = filterByDelivery(searchResults.items || []);
        const filteredAnalogs = filterByDelivery(searchResults.analogs || []);
        
        // Обновляем отфильтрованные результаты
        setFilteredResults({
            items: filteredItems,
            analogs: filteredAnalogs
        });
        
        // Обновляем счетчики
        setItemsCount(prevCounts => ({
            ...prevCounts,
            originals: filteredItems.length,
            analogs: filteredAnalogs.length
        }));
        
    }, [searchResults, deliveryFilter]);
    
    // Загружаем данные со склада при первой загрузке
    useEffect(() => {
        loadWarehouseData();
    }, [article, brand, brandId]);
    
    // Запускаем поиск при фокусе на экране и очищаем при потере фокуса
    useFocusEffect(
        useCallback(() => {
            console.log('Экран получил фокус, запускаем поиск');
            // Очищаем предыдущие результаты и запускаем новый поиск
            clearSearchData();
            startSearch();
            
            return () => {
                console.log('Экран потерял фокус, очищаем данные');
                clearSearchData();
            };
        }, [article, brand, brandId, detailId]) // Зависимости для перезапуска поиска при изменении параметров
    );
    
    // Функция для загрузки данных со склада
    const loadWarehouseData = async () => {
        setIsLoadingWarehouse(true);
        try {
            const result = await SearchApi.searchByArticle(article, brand, brandId);
            
            console.log('Получен ответ от search_by_article');
            
            // Проверяем наличие поля sklad_details в ответе
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
                // Разделяем результаты на оригиналы и аналоги
                const originals = skladDetails.filter(item => 
                    item && item.brand && 
                    brand && 
                    item.brand.toUpperCase() === brand.toUpperCase()
                );
                
                const analogs = skladDetails.filter(item => 
                    item && item.brand && 
                    brand && 
                    item.brand.toUpperCase() !== brand.toUpperCase()
                );
                
                console.log('Найдено оригиналов на складе:', originals.length);
                console.log('Найдено аналогов на складе:', analogs.length);
                
                // Объединяем все товары для отображения на складе без сортировки
                const allItems = [...originals, ...analogs];
                
                console.log('Всего товаров для отображения на складе:', allItems.length);
                
                setWarehouseData({
                    items: originals,
                    analogs: analogs,
                    all: allItems
                });
                
                // Обновляем счетчик товаров на складе
                setItemsCount(prevCounts => ({
                    ...prevCounts,
                    warehouse: allItems.length
                }));
            } else {
                console.log('Нет товаров на складе');
                // Устанавливаем пустые массивы, чтобы показать сообщение "не найдены"
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
            // В случае ошибки также устанавливаем пустые массивы
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
    
    // Обработчик изменения фильтра доставки
    const handleDeliveryFilterChange = (newFilter) => {
        // Если нажали на тот же фильтр, возвращаемся к "Все"
        const updatedFilter = deliveryFilter === newFilter ? "all" : newFilter;
        setDeliveryFilter(updatedFilter);
        
        // Перезапускаем поиск с новым фильтром
        clearSearchData();
        startSearch();
    };
    
    // Функция для запуска поиска
    const startSearch = () => {
        setIsSearching(true);
        setSearchResults({ items: [], analogs: [] });
        setFilteredResults({ items: [], analogs: [] });
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
            // Обработка новых результатов
            (result) => {
                console.log('Получены результаты:', result.totalCount);
                
                if (result && result.items) {
                    // Разделяем результаты на оригиналы и аналоги
                    const originals = result.items.filter(item => 
                        item.brand && item.brand.toUpperCase() === brand.toUpperCase()
                    );
                    const analogs = result.items.filter(item => 
                        item.brand && item.brand.toUpperCase() !== brand.toUpperCase()
                    );
                    
                    // Сортируем по цене (от меньшей к большей)
                    const sortByPrice = (a, b) => {
                        const priceA = parseFloat(a.price || a.sale_price || a.cost || 0);
                        const priceB = parseFloat(b.price || b.sale_price || b.cost || 0);
                        return priceA - priceB;
                    };
                    
                    // Сортируем и ограничиваем до 10 элементов
                    const sortedOriginals = [...originals].sort(sortByPrice).slice(0, 10);
                    const sortedAnalogs = [...analogs].sort(sortByPrice).slice(0, 10);
                    
                    console.log('Оригиналов (всего/отображено):', originals.length, '/', sortedOriginals.length);
                    console.log('Аналогов (всего/отображено):', analogs.length, '/', sortedAnalogs.length);
                    
                    setSearchResults({
                        items: sortedOriginals,
                        analogs: sortedAnalogs
                    });
                }
            },
            // Обработка завершения поиска
            (finalResult) => {
                setIsSearching(false);
            },
            // Обработка ошибок
            (error) => {
                console.error('Ошибка поиска:', error);
                setIsSearching(false);
            }
        );
        
        setSearchController(controller);
    };
    
    // Функция для остановки поиска
    const stopSearch = () => {
        if (searchController) {
            searchController.stopSearch();
            setIsSearching(false);
        }
    };

    // Обработчик нажатия кнопки назад
    const handleGoBack = () => {
        // Сбрасываем фильтр доставки на значение по умолчанию
        setDeliveryFilter("all");
        clearSearchData();
        navigation.navigate("Search detail");
    };

    // Рендер контента в зависимости от активной кнопки
    const renderContent = () => {
        if (activeButton === 1) {
            return (
                <OriginalBlock 
                    navigation={navigation} 
                    searchResult={{ items: filteredResults.items }} 
                    article={article}
                    brand={brand}
                />
            );
        } else if (activeButton === 2) {
            return (
                <AnalogBlock 
                    navigation={navigation} 
                    searchResult={{ analogs: filteredResults.analogs }}
                />
            );
        } else if (activeButton === 3) {
            // Для вкладки "На складе"
            if (isLoadingWarehouse) {
                return (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2F80ED" />
                        <Text style={styles.loaderText}>Загрузка данных со склада...</Text>
                    </View>
                );
            }
            
            // Показываем все товары со склада
            return (
                <WarehouseBlock 
                    navigation={navigation} 
                    searchResult={{ items: warehouseData.all }} 
                    article={article}
                    brand={brand}
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
    headerSwitchButtons: {
        flexDirection: 'row',
        gap: 16
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
