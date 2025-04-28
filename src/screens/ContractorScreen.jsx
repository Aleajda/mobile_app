import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import FizBlock from "../components/contractor/FizBlock";
import UrBlock from "../components/contractor/UrBlock";



const ContractorScreen = ({ navigation }) => {

    // const [activeButton, setActiveButton] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
    const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(1);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Контрагенты
                    </Text>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => setModalOpen(true)}>
                            <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    Покупатель
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    Поставщик
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    Моя компания
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>
                                    Перевозчик
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.headerSwitchButtons}>
                    <TouchableOpacity onPress={() => setActiveButton(1)}>
                        <View style={[styles.headerSwitchButtonContainer, activeButton == 1 ? styles.activeHeaderSwitchButtonContainer : null]}>
                            <Text style={[styles.headerSwitchButton, activeButton == 1 ? styles.activeHeaderSwitchButton : null]}>
                                Физ. лица
                            </Text>
                            <View style={[styles.countContainer, activeButton == 1 ? styles.activeCountContainer : null]}>
                                <Text style={[styles.count, activeButton == 1 ? styles.activeCount : null]}>
                                    3
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveButton(2)}>
                        <View style={[styles.headerSwitchButtonContainer, activeButton == 2 ? styles.activeHeaderSwitchButtonContainer : null]}>
                            <Text style={[styles.headerSwitchButton, activeButton == 2 ? styles.activeHeaderSwitchButton : null]}>
                                Юр. лица
                            </Text>
                            <View style={[styles.countContainer, activeButton == 2 ? styles.activeCountContainer : null]}>
                                <Text style={[styles.count, activeButton == 2 ? styles.activeCount : null]}>
                                    3
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.main}>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    {activeButton == 1 
                    ? <FizBlock navigation={navigation}/>
                    : activeButton == 2
                    ? <UrBlock/>
                    : null
                    }
                </ScrollView>
            </View>
            {/* Это тип футер */}

            {/* <MyProfileSettingsModal visible={modalOpen} setVisible={setModalOpen} setChangeInfoModalOpen={setChangeInfoModalOpen} setChangeRoleModalOpen={setChangeRoleModalOpen}/>
      <EditProfileModal visible={changeInfoModalOpen} onClose={() => setChangeInfoModalOpen(false)}/>
      <EditRoleModal visible={changeRoleModalOpen} onClose={() => setChangeRoleModalOpen(false)}/> */}
        </View>
    );
};

export default ContractorScreen;

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Roboto'
    },
    searchContainer: {

    },
    searchIcon: {
        width: 32,
        height: 32
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
        flex: 1
    },
})
