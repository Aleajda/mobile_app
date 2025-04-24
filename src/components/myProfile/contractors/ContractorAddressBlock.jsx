import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const ContractorAddressBlock = () => {

    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Добавить адрес</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.mainInfoContainer}>
                {/* <Text style={styles.mainInfoTitle}>Юридические данные</Text> */}
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={[styles.mainInfoBlockTitle, {opacity: 1, fontWeight: 'bold'}]}>Адрес</Text>
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
                            <Text style={styles.mainInfoBlockTitle}>Рабочие дни</Text>
                            <Text style={styles.mainInfoBlockText}>
                                Пн, Вт, Ср, Чт, Пт
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
                                Время
                            </Text>
                            <Text style={styles.mainInfoBlockText}>
                                с 00:00:00 по 00:00:00
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
                {/* <Text style={styles.mainInfoTitle}>Юридические данные</Text> */}
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoBlock}>
                        <View style={styles.mainInfoBlockLeft}>
                            <Text style={[styles.mainInfoBlockTitle, {opacity: 1, fontWeight: 'bold'}]}>Адрес</Text>
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
                            <Text style={styles.mainInfoBlockTitle}>Рабочие дни</Text>
                            <Text style={styles.mainInfoBlockText}>
                                Пн, Вт, Ср, Чт, Пт
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
                                Время
                            </Text>
                            <Text style={styles.mainInfoBlockText}>
                                с 00:00:00 по 00:00:00
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

        </View>
    );
};

const styles = StyleSheet.create({
    addNewBtn: {
        height: 64,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 24
    },
    addNewBtnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED'
    },
    

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
});

export default ContractorAddressBlock;
