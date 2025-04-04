import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";


const CompaniesBlock = ({ navigation }) => {

    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Создать пользователя</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("UsersWithHomeButtons")}>
            <View style={styles.usersBlock}>
                <View style={styles.usersBlockText}>
                    <Text style={styles.usersBlockTitle}>Ильина Людмила</Text>
                    <Text style={styles.usersBlockDescription}>Менеджер</Text>
                    <View style={styles.usersBlockGroups}>
                        <View style={styles.usersBlockGroupsApi}>
                            <Text style={styles.usersBlockGroupsApiText}>API</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("UsersWithHomeButtons")}>
            <View style={styles.usersBlock}>
                <View style={styles.usersBlockText}>
                    <Text style={styles.usersBlockTitle}>Рустам Кутлубаев</Text>
                    <Text style={styles.usersBlockDescription}>Владелец сайта</Text>
                    <View style={styles.usersBlockGroups}>
                        <View style={styles.usersBlockGroupsApi}>
                            <Text style={styles.usersBlockGroupsApiText}>API</Text>
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

    },
    usersBlockGroupsApi: {
        
        backgroundColor: "#27AE601A",
        paddingHorizontal: 12,
        height: 32,
        width: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    usersBlockGroupsApiText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27AE60'
    },
    editUserImage: {
        width: 32,
        height: 32
    }
});

export default CompaniesBlock;
