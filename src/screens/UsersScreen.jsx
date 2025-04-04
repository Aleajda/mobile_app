import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import MyProfileSettingsModal from "../components/myProfile/modal/MyProfileSettingsModal";
import AboutMeBlock from "../components/myProfile/AboutMeBlock";
import UsersBlock from "../components/users/UsersBlock";
import EditProfileModal from "../components/myProfile/modal/EditProfileModal";
import EditRoleModal from "../components/myProfile/modal/EditRoleModal";


SplashScreen.preventAutoHideAsync();

const MyProfileScreen = ({ navigation }) => {

  // const [activeButton, setActiveButton] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Пользователи
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
              Владелец
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={styles.headerButton}>
            <Text style={styles.headerButtonText}>
              Менеджер
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={styles.headerButton}>
            <Text style={styles.headerButtonText}>
              Кассир
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={styles.headerButton}>
            <Text style={styles.headerButtonText}>
              Логист
            </Text>
          </View>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </View>
      <View style={styles.main}>
        <ScrollView style={{ width: '100%' }} >
          <UsersBlock navigation={navigation}/>   
        </ScrollView>
      </View>
      {/* Это тип футер */}
      
      {/* <MyProfileSettingsModal visible={modalOpen} setVisible={setModalOpen} setChangeInfoModalOpen={setChangeInfoModalOpen} setChangeRoleModalOpen={setChangeRoleModalOpen}/>
      <EditProfileModal visible={changeInfoModalOpen} onClose={() => setChangeInfoModalOpen(false)}/>
      <EditRoleModal visible={changeRoleModalOpen} onClose={() => setChangeRoleModalOpen(false)}/> */}
    </View>
  );
};

export default MyProfileScreen;

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
  
  
  main: {
    padding: 16,
    flex: 1
  },
})
