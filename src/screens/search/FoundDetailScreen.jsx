import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import OriginalBlock from '../../components/search/OriginalBlock';
import AnalogBlock from '../../components/search/AnalogBlock';
import SearchApi from '../../api/SearchApi';
import { useFocusEffect } from '@react-navigation/native';


const FoundDetailScreen = ({ navigation, route }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
    const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    
    // Получаем параметры из навигации
    const { article, brand, brandId, detailId } = route.params || {};
    
    // Состояния для поиска
    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState({ items: [], analogs: [] });
    const [searchController, setSearchController] = useState(null);
    const [itemsCount, setItemsCount] = useState({ originals: 0, analogs: 0 });
    
    // Функция для очистки данных
    const clearSearchData = () => {
        if (searchController) {
            searchController.stopSearch();
        }
        setSearchResults({ items: [], analogs: [] });
        setItemsCount({ originals: 0, analogs: 0 });
        setIsSearching(false);
    };
    
    // Запускаем поиск при загрузке экрана
    useEffect(() => {
        return () => {
            // Останавливаем поиск при размонтировании компонента
            if (searchController) {
                searchController.stopSearch();
            }
        };
    }, []);
    
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
    
    // Функция для запуска поиска
    const startSearch = () => {
        setIsSearching(true);
        setSearchResults({ items: [], analogs: [] });
        setItemsCount({ originals: 0, analogs: 0 });
        
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
                    
                    setItemsCount({
                        originals: sortedOriginals.length,
                        analogs: sortedAnalogs.length
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
        clearSearchData();
        navigation.navigate("Search detail");
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
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    В наличии
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    до 3 дней
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    3-7 дней
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.headerSwitchButtons}>
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
                    {activeButton == 1 
                    ? <OriginalBlock 
                        navigation={navigation} 
                        searchResult={{ items: searchResults.items }} 
                        article={article}
                        brand={brand}
                      />
                    : activeButton == 2
                    ? <AnalogBlock 
                        navigation={navigation} 
                        searchResult={{ analogs: searchResults.analogs }}
                      />
                    : null
                    }
                </ScrollView>
            </View>
        
            <View style={styles.footer}>
                {isSearching ? (
                    <View style={styles.searchingContainer}>
                        <ActivityIndicator size="small" color="#2F80ED" />
                        <Text style={styles.footerTitle}>Ищем...</Text>
                    </View>
                ) : (
                    <Text style={styles.footerTitle}>Поиск завершен</Text>
                )}
                
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={isSearching ? stopSearch : startSearch}
                >
                    <Text style={styles.saveText}>
                        {isSearching ? "Остановить поиск" : "Повторить поиск"}
                    </Text>
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
  }

})

export default FoundDetailScreen;
