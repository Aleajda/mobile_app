import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Order from "../components/orders/Order";
import DateRangeModal from "../components/DateRangeModal";

const OrdersScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });

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
                            <View style={[styles.tab, styles.tabActive]}>
                                <Text style={[styles.tabText, styles.tabTextActive]}>
                                    {selectedRange.startDate ? `${selectedRange.startDate} - ${selectedRange.endDate}` : 'Этот месяц'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.tab}>
                                <Text style={styles.tabText}>Прошлый месяц</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.content}>
                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                    <View style={styles.ordersList}>
                        <Order />
                        <Order />
                        <Order />
                        <Order />
                    </View>
                </ScrollView>
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
});
