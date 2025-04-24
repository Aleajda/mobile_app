import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AboutMeBlock = () => {
    return (
        <View>
            <View style={styles.mainInfoContainer}>
                <Text style={styles.mainInfoTitle}>Основные данные</Text>
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>Имя</Text>
                            <Text style={styles.mainInfoBlockText}>
                                Рустам Кутлубаев
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("../../../assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoBlockBorder}></View>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={styles.mainInfoBlockTitle}>Email</Text>
                            <Text style={styles.mainInfoBlockText}>
                                rust.k@sort-1.pro
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("../../../assets/images/arrow_right.png")}
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
                                +7 (903) 960-84-66
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={styles.mainInfoBlockImage}
                                source={require("../../../assets/images/arrow_right.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={styles.mainInfoBlockTitle}>
                            Уровень доступа
                        </Text>
                        <Text style={styles.mainInfoBlockText}>
                            Владелец сайта
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("../../../assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={styles.mainInfoBlockTitle}>Пароль</Text>
                        <Text style={styles.mainInfoBlockText}>
                            Изменен 2 Дек 2022
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("../../../assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={styles.mainInfoBlockTitle}>API</Text>
                        <Text style={styles.mainInfoBlockText}>Включен</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("../../../assets/images/arrow_right.png")}
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
        fontWeight: 'bold',
        marginBottom: 4,
    },
    mainInfoBlockText: {
        fontStyle: "Roboto",
        fontSize: 16,
        color: "#333333",
        opacity: 0.7
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
        marginBottom: 16,
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
});

export default AboutMeBlock;
