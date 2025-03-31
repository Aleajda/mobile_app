import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MyProfileSettingsModal from "../components/myProfile/MyProfileSettingsModal";


SplashScreen.preventAutoHideAsync();

const MyProfileScreen = () => {

  const [activeButton, setActiveButton] = useState(1);
  const [modalOpen, setModalOpen] = useState([false]);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.nameAndRoleContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                        Рустам Кутлубаев
                    </Text>
                    <View style={styles.openDropDown}>
                        <TouchableOpacity onPress={() => setModalOpen(true)}>
                            <Image style={styles.dropDownIcon} source={require('../../assets/images/drop_down.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.roleContainer}>
                    <Text style={styles.role}>
                        Владелец сайта
                    </Text>
                </View>
            </View>
            <View style={styles.headerButtons}>
                <View style={[styles.reviewButtonContainer, activeButton == 1 ? styles.activeHeaderButtonContainer : null]}>
                    <Text style={[styles.reviewButton, activeButton == 1 ? styles.activeHeaderButton : null]}>
                        Обзор
                    </Text>
                </View>
                <View style={[styles.companiesButtonContainer, activeButton == 2 ? styles.activeHeaderButtonContainer : null]}>
                    <Text style={[styles.companiesButton, activeButton == 2 ? styles.activeHeaderButton : null]}>
                        Компании
                    </Text>
                </View>
            </View>
        </View>
        <View style={styles.main}>
           <View style={styles.mainInfoContainer}>
              <Text style={styles.mainInfoTitle}>
                Основные данные
              </Text>
              <View style={styles.mainInfo}>
                  <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                      <Text style={styles.mainInfoBlockTitle}>
                        Имя
                      </Text>
                      <Text style={styles.mainInfoBlockText}>
                        Рустам Кутлубаев
                      </Text>
                    </View>
                    <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
                  </View>
                  <View style={styles.mainInfoBlockBorder}></View>
                  <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                      <Text style={styles.mainInfoBlockTitle}>
                        Email
                      </Text>
                      <Text style={styles.mainInfoBlockText}>
                        rust.k@sort-1.pro
                      </Text>
                    </View>
                    <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
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
                    <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
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
                <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
              </View>
           </View>
           <View style={styles.anotherBlock}>
            <View style={styles.mainInfoBlock}>
                <View style={styles.mainInfoBlockLeft}>
                  <Text style={styles.mainInfoBlockTitle}>
                    Пароль
                  </Text>
                  <Text style={styles.mainInfoBlockText}>
                    Изменен 2 Дек 2022
                  </Text>
                </View>
                <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
              </View>
           </View>
           <View style={styles.anotherBlock}>
            <View style={styles.mainInfoBlock}>
                <View style={styles.mainInfoBlockLeft}>
                  <Text style={styles.mainInfoBlockTitle}>
                    API
                  </Text>
                  <Text style={styles.mainInfoBlockText}>
                    Включен
                  </Text>
                </View>
                <TouchableOpacity><Image style={styles.mainInfoBlockImage} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
              </View>
           </View>
        </View>
        <MyProfileSettingsModal visible={modalOpen} setVisible={setModalOpen}/>
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
    fontWeight: 500,
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
    fontWeight: 500,
    color: '#333333'
  },
  companiesButtonContainer: {
    paddingTop: 8,
    paddingBottom: 8
  },
  companiesButton: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 500,
    color: '#333333'
  },
  main: {
    padding: 16,
  },
  mainInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  mainInfo: {
    
  },
  mainInfoTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 500,
    lineHeight: 24,
    marginBottom: 4,
    color: '#333333'
  },
  mainInfoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainInfoBlockLeft: {
    
  },
  mainInfoBlockTitle: {
    fontStyle: 'Roboto',
    fontSize: 16,
    color: '#333333',
    opacity: 0.7,
    marginBottom: 4
  },
  mainInfoBlockText: {
    fontStyle: 'Roboto',
    fontSize: 16,
    color: '#333333',
  },
  mainInfoBlockImage: {
    width: 32,
    height: 32
  },
  mainInfoBlockBorder: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16
  },
  anotherBlock:{
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 4
  },
})
