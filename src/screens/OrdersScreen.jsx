import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import Order from "../components/orders/Order";
import DateRangeModal from "../components/DateRangeModal";
import { getOrders } from "../api/OrdersApi";
import { useFocusEffect } from "@react-navigation/native";

const OrdersScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("thisMonth");

    // Функция получения данных о заказах без фильтрации
    const fetchOrders = async () => {
        try {
            setError(null);
            setLoading(true);
            
            // Получаем все заказы без фильтрации по датам
            const response = await getOrders();
            
            // Выводим результат в консоль
            console.log('Ответ API заказов:', JSON.stringify(response, null, 2));
            
            // Проверяем наличие данных в ответе (поле zakazs, а не data)
            if (response && response.zakazs && response.zakazs.length > 0) {
                setOrders(response.zakazs);
                console.log(`Загружено ${response.zakazs.length} заказов`);
            } else {
                console.log('Заказы не найдены в ответе API');
                setOrders([]);
            }
        } catch (err) {
            console.error('Ошибка при загрузке заказов:', err);
            setError('Не удалось загрузить заказы');
            setOrders([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Загрузка данных при первом рендере
    useEffect(() => {
        fetchOrders();
    }, []);

    // Обновление данных при возврате на экран
    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [])
    );

    // Обработка обновления списка (pull-to-refresh)
    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Заказы</Text>
                    <TouchableOpacity>
                        <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.tabs}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={[styles.tab, styles.tabWithIcon]}>
                                <Text style={styles.tabText}>Даты</Text>
                                <Image style={styles.tabIcon} source={require('@assets/images/arrow_down.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.tab, activeTab === "thisMonth" && styles.tabActive]}>
                                <Text style={[styles.tabText, activeTab === "thisMonth" && styles.tabTextActive]}>
                                    Этот месяц
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.tab, activeTab === "lastMonth" && styles.tabActive]}>
                                <Text style={[styles.tabText, activeTab === "lastMonth" && styles.tabTextActive]}>
                                    Прошлый месяц
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {activeTab === "custom" && (
                            <TouchableOpacity>
                                <View style={[styles.tab, styles.tabActive]}>
                                    <Text style={[styles.tabText, styles.tabTextActive]}>
                                        {selectedRange.startDate && selectedRange.endDate ? 
                                            `${selectedRange.startDate} - ${selectedRange.endDate}` : 
                                            'Выберите даты'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </View>

            <View style={styles.content}>
                {loading && !refreshing ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2F80ED" />
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={() => fetchOrders()}>
                            <Text style={styles.retryButtonText}>Повторить</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ScrollView 
                        style={styles.scrollArea} 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={["#2F80ED"]}
                            />
                        }
                    >
                        <View style={styles.ordersList}>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <Order key={`order-${order.id || index}`} order={order} />
                                ))
                            ) : (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>Заказы не найдены</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                )}
            </View>

            <DateRangeModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
            />
        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#FFFFFF',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Roboto',
    },
    searchIcon: {
        width: 32,
        height: 32,
    },
    tabs: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 24,
    },
    tab: {
        backgroundColor: "#3333330D",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    tabWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: "#333333B2",
    },
    tabTextActive: {
        color: "#2F80ED",
    },
    tabActive: {
        backgroundColor: "#2F80ED1A",
    },
    tabIcon: {
        width: 16,
        height: 16,
        marginLeft: 6,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollArea: {
        width: '100%',
        paddingTop: 16,
    },
    ordersList: {
        gap: 4,
        marginBottom: 32,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#EB5757',
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#2F80ED',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    retryButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    emptyContainer: {
        padding: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7,
    },
});

