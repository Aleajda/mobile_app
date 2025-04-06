import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";


const FizBlock = () => {

    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Создать контрагента</Text>
                </View>
            </TouchableOpacity>
            {/* navigation.navigate("MainPage", { username }); */}
            <TouchableOpacity>
            <View style={styles.usersBlock}>
                <View style={styles.usersBlockText}>
                    <Text style={styles.usersBlockTitle}>Зарипов Айнур Фаизович</Text>
                    <Text style={styles.usersBlockDescription}>Контрагент</Text>
                    <View style={styles.usersBlockGroups}>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Покупатель</Text>
                        </View>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Физ. лицо</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editUserImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.usersBlock}>
                <View style={styles.usersBlockText}>
                    <Text style={styles.usersBlockTitle}>Зарипов Айнур Фаизович</Text>
                    <Text style={styles.usersBlockDescription}>Контрагент</Text>
                    <View style={styles.usersBlockGroups}>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Покупатель</Text>
                        </View>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Физ. лицо</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editUserImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.usersBlock}>
                <View style={styles.usersBlockText}>
                    <Text style={styles.usersBlockTitle}>Зарипов Айнур Фаизович</Text>
                    <Text style={styles.usersBlockDescription}>Контрагент</Text>
                    <View style={styles.usersBlockGroups}>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Покупатель</Text>
                        </View>
                        <View style={styles.usersBlockGroupsContainer}>
                            <Text style={styles.usersBlockGroupsText}>Физ. лицо</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editUserImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </View>
    );
};

export default FizBlock;

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
    usersBlock:{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 4
    },
    usersBlockText: {
        flexDirection: 'column',
        marginRight: 16,
        width: 248
    },
    usersBlockTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    usersBlockDescription: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        color: '#333333',
        opacity: 0.7,
        marginBottom: 16
    },
    usersBlockGroups: {
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap'
    },
    usersBlockGroupsContainer: {
        
        backgroundColor: "#2F80ED1A",
        paddingHorizontal: 12,
        height: 32,
        flex: 0,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    usersBlockGroupsText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED'
    },
    editUserImage: {
        width: 32,
        height: 32
    }
});
