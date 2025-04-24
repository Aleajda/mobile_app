import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AboutContractorBlock = () => {
    return (
        <View>
            <View style={styles.info}>
                <Text style={styles.infoText1}>Баланс</Text>
                <View style={styles.infoBorder}></View>
                <Text style={styles.infoText2}>9 923.03₽</Text>
            </View>
            <View style={styles.info}>
                <Text style={[styles.infoText1, { marginBottom: 4 }]}>Зарезервировано под заказы</Text>
                <Text style={styles.infoText2}>84 743.82₽</Text>
            </View>


            <TouchableOpacity>
                <View style={styles.okopfBlock}>
                    <View style={styles.okopfBlockText}>
                        <Text style={styles.okopfBlockTitle}>Тип и ОКОПФ</Text>
                        <View style={styles.okopfBlockGroups}>
                            <View style={styles.okopfBlockGroupsContainer}>
                                <Text style={styles.okopfBlockGroupsText}>Покупатель</Text>
                            </View>
                            <View style={styles.okopfBlockGroupsContainer}>
                                <Text style={styles.okopfBlockGroupsText}>Физ. лицо</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.arrowRightImage}
                            source={require("@assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={styles.mainInfoBlockTitle}>
                            Система налогообложения
                        </Text>
                        <Text style={styles.mainInfoBlockText}>
                            -0%
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("@assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mainInfoContainer}>
                <Text style={styles.mainInfoTitle}>Основные данные</Text>
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>Имя</Text>
                            <Text style={styles.mainInfoBlockText}>
                                Зарипов Айнур Фаизович
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoBlockBorder}></View>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>Email</Text>
                            <Text style={styles.mainInfoBlockText}>
                                nur@zarif.ru
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoBlockBorder}></View>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>
                                Мобильный номер
                            </Text>
                            <Text style={styles.mainInfoBlockText}>
                                +7 (917) 397 72 62
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View style={styles.mainInfoContainer}>
                <Text style={styles.mainInfoTitle}>Юридические данные</Text>
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>Адрес</Text>
                            <Text style={styles.mainInfoBlockText}>
                                Россия, Республика Татарстан, Верхнеуслонский р-н, Иннополис, Спортивная ул, 136, кв 45
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoBlockBorder}></View>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>ИНН</Text>
                            <Text style={styles.mainInfoBlockText}>
                                7346334454543
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoBlockBorder}></View>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>
                                КПП
                            </Text>
                            <Text style={styles.mainInfoBlockText}>
                                773301001
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("@assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={[styles.mainInfoBlockText, {fontWeight: 'bold'}]}>
                            Уведомление
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("@assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainInfoBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mainInfoBlockLeft: {},
    mainInfoBlockTitle: {
        fontStyle: "Roboto",
        fontSize: 16,
        color: "#333333",
        marginBottom: 4,
        opacity: 0.7,
    },
    mainInfoBlockText: {
        fontStyle: "Roboto",
        fontSize: 16,
        color: "#333333",
    },
    mainInfoBlockImage: {
        width: 32,
        height: 32,
    },
    mainInfoBlockBorder: {
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 1,
        marginTop: 16,
        marginBottom: 16,
    },
    anotherBlock: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        marginBottom: 4,
    },
    mainInfoContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 4,
    },
    mainInfo: {},
    mainInfoTitle: {
        fontSize: 16,
        fontFamily: "Roboto",
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 4,
        color: "#333333",
    },

    // Верхний блок с прерывистой чертой
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
    infoBorder: {
        marginVertical: 16,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed'

    },


    //   Тип и ОКОПФ
    okopfBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    okopfBlockText: {
        flexDirection: 'column',
        marginRight: 16,
        width: 248
    },
    okopfBlockTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        marginBottom: 24,
        fontWeight: 'bold',
        color: '#333333'
    },
    okopfBlockDescription: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        color: '#333333',
        opacity: 0.7,
        marginBottom: 16
    },
    okopfBlockGroups: {
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap'
    },
    okopfBlockGroupsContainer: {

        backgroundColor: "#2F80ED1A",
        paddingHorizontal: 12,
        height: 32,
        flex: 0,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    okopfBlockGroupsText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED'
    },
    arrowRightImage: {
        width: 32,
        height: 32,
        
    }
});

export default AboutContractorBlock;
