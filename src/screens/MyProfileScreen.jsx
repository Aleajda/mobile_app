import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import MyProfileSettingsModal from "../components/myProfile/modal/MyProfileSettingsModal";
import AboutMeBlock from "../components/myProfile/AboutMeBlock";
import CompaniesBlock from "../components/myProfile/CompaniesBlock";
import EditProfileModal from "../components/myProfile/modal/EditProfileModal";
import EditRoleModal from "../components/myProfile/modal/EditRoleModal";
import EditPasswordModal from "../components/myProfile/modal/EditPasswordModal";


SplashScreen.preventAutoHideAsync();

const MyProfileScreen = ({ route }) => {

  const [activeButton, setActiveButton] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const { aboutMeButton, role, username } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nameAndRoleContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {username ? username : 'Рустам Кутлубаев'}
            </Text>
            <View style={[styles.openDropDown, aboutMeButton ? null : {display: 'none'}]} >
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Image style={styles.dropDownIcon} source={require('../../assets/images/drop_down.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.roleContainer}>
            <Text style={styles.role}>
              {role ? role : 'Владелец сайта'}
            </Text>
          </View>
        </View>
        <View style={styles.headerButtons}>
					<TouchableOpacity onPress={() => setActiveButton(1)}>
            <View style={[styles.reviewButtonContainer, activeButton == 1 ? styles.activeHeaderButtonContainer : null]}>
              <Text style={[styles.reviewButton, activeButton == 1 ? styles.activeHeaderButton : null]}>
                Обзор
              </Text>
            </View>
          </TouchableOpacity>   
          <TouchableOpacity onPress={() => setActiveButton(2)}>
            <View style={[styles.companiesButtonContainer, activeButton == 2 ? styles.activeHeaderButtonContainer : null]}>
              <Text style={[styles.companiesButton, activeButton == 2 ? styles.activeHeaderButton : null]}>
                Компании
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <ScrollView style={{ width: '100%' }} >
          {activeButton == 1
          ?
          <AboutMeBlock />
          :
          <CompaniesBlock/>
          }
        </ScrollView>
      </View>
      {/* Это тип футер */}
      
      <MyProfileSettingsModal visible={modalOpen} setVisible={setModalOpen} setChangeInfoModalOpen={setChangeInfoModalOpen} setChangeRoleModalOpen={setChangeRoleModalOpen} setChangePasswordModalOpen={setChangePasswordModalOpen}/>
      <EditProfileModal visible={changeInfoModalOpen} onClose={() => setChangeInfoModalOpen(false)}/>
      <EditRoleModal visible={changeRoleModalOpen} onClose={() => setChangeRoleModalOpen(false)}/>
      <EditPasswordModal visible={changePasswordModalOpen} onClose={() => setChangePasswordModalOpen(false)}/>
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
  nameAndRoleContainer: {
    marginBottom: 24
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'Roboto'
  },
  openDropDown: {

  },
  dropDownIcon: {
    width: 32,
    height: 32
  },
  roleContainer: {

  },
  role: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 16,
    opacity: 0.7,
    color: '#333333'
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16
  },
  activeHeaderButtonContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#2F80ED'
  },
  activeHeaderButton: {
    color: '#2F80ED'
  },
  reviewButtonContainer: {
    paddingTop: 8,
    paddingBottom: 8
  },
  reviewButton: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333'
  },
  companiesButtonContainer: {
    paddingTop: 8,
    paddingBottom: 8
  },
  companiesButton: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333'
  },
  main: {
    padding: 16,
    flex: 1
  },
})
