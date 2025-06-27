import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MainBlock = () => {
    return (
        <View style={styles.container}>

            <View style={styles.orderBuyer}>
                <Text style={styles.orderBuyerStatus}>Покупатель</Text>
                <Text style={styles.orderBuyerName}>Айнур Зарипов</Text>
            </View>

            <View style={styles.border}/>
            
            <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Адрес доставки</Text>
                <Text style={styles.infoBlockDescription}>Москва, ул. Рябиновская, 23</Text>
            </View>

            <View style={styles.border}/>

            <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Пункт выдачи</Text>
                <Text style={styles.infoBlockDescription}>Основной</Text>
            </View>

            <View style={styles.border}/>

            <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Менеджер</Text>
                <Text style={styles.infoBlockDescription}>Кутлубаев</Text>
            </View>

            <View style={styles.border}/>

            <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Комментарий</Text>
                <Text style={styles.infoBlockDescription}>—</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 16
    },
    orderBuyer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2F80ED1A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    orderBuyerStatus: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        opacity: 0.5
    },
    orderBuyerName: {
        fontFamily: 'Roboto',
        color: '#2F80ED',
        fontSize: 16,
        fontWeight: 'bold',
    },
    border: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 16
    },

    // INFO BLOCK

    infoBlockTitle: {
        fontStyle: "Roboto",
        fontSize: 16,
        color: "#333333",
        marginBottom: 4,
        opacity: 0.7,
    },
    infoBlockDescription: {
        fontStyle: "Roboto",
        fontSize: 16,
        color: "#333333",
    }
})

export default MainBlock;
