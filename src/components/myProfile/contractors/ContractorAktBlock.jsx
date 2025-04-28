import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Order from './components/Order';
import DateRangeModal from '../../DateRangeModal';

const ContractorAktBlock = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });


    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View
                            style={[
                                styles.tabContainer,
                                styles.firstTabContainer
                            ]}
                        >
                            <Text
                                style={styles.tab}
                            >
                                Даты
                            </Text>
                            <Image style={styles.tabArrowIcon} source={require('@assets/images/arrow_down.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={[
                                styles.tabContainer,
                                styles.activeTabContainer
                            ]}
                        >
                            <Text
                                style={[styles.tab, styles.activeTab]}
                            >
                                {selectedRange.startDate ? `${selectedRange.startDate} - ${selectedRange.endDate}` : 'Этот месяц'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={[
                                styles.tabContainer,
                                styles.firstTabContainer
                            ]}
                        >
                            <Text
                                style={styles.tab}
                            >
                                Прошлый месяц
                            </Text>
                            
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.info}>
                <Text style={[styles.infoText1, { marginBottom: 4 }]}>Зарезервировано под заказы</Text>
                <Text style={styles.infoText2}>84 743.82₽</Text>
            </View>
            <View style={styles.info}>
                <Text style={[styles.infoText1, { marginBottom: 24 }]}>Зарезервировано под заказы</Text>
                <Text style={styles.infoText2}>84 743.82₽</Text>
            </View>
            <View style={{ gap: 4 }}>
                <Order />
                <Order />
                <Order />
            </View>
            <DateRangeModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tabs: {
        gap: 8,
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    tabContainer: {
        backgroundColor: "#3333330D",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    firstTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tab: {
        fontFamily: 'Roboto',
        textAlign: "center",
        fontSize: 16,
        color: "#333333B2",
        fontWeight: 'bold',
    },
    activeTabContainer: {
        backgroundColor: "#2F80ED1A",
    },
    activeTab: {
        color: "#2F80ED",
    },
    tabArrowIcon: {
        width: 16,
        height: 16,
    },
    infoContainer: {
        flex: 1
    },


    info: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginBottom: 4
    },
    infoText1: {
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 'bold'
    },
    infoText2: {
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 'bold'
    },
})

export default ContractorAktBlock;
