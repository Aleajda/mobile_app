import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import DateRangeModal from "../components/DateRangeModal";

const ProfileScreen = ({ route, navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Главная</Text>
      </View>
      <View style={styles.contentContainer}>
          <View style={styles.aboutMeContainer}>
            <View style={styles.aboutMe}>
              <Text style={styles.aboutMeName}>{route.params?.username || "Имя пользователя"}</Text>
              <Text style={styles.aboutMeEmail}>email@email.com</Text>
            </View>
            <TouchableOpacity><Image style={styles.aboutMeArrowIcon} source={require('../../assets/images/arrow_right.png')}/></TouchableOpacity>
          </View>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={[
                  styles.tabContainer,
                  styles.firstTabContainer
                ]}
              >
                <Text
                  style={styles.tab}
                >
                  Даты
                </Text>
                <Image style={styles.tabArrowIcon} source={require('../../assets/images/arrow_down.png')}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[
                  styles.tabContainer,
                  styles.activeTabContainer
                ]}
              >
                <Text
                  style={[styles.tab, styles.activeTab]}
                >
                  {selectedRange.startDate ? `${selectedRange.startDate} - ${selectedRange.endDate}` : 'Этот месяц'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
            <View style={styles.infoContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.info}>
                  <Text style={styles.infoText1}>11 заказов на сумму</Text>
                  <View style={styles.infoBorder}></View>
                  <Text style={styles.infoText2}>12 345.67₽</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoText1}>Платежи покупателей</Text>
                  <View style={styles.infoBorder}></View>
                  <Text style={styles.infoText2}>12 345.67₽</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoText1}>Возвраты</Text>
                  <View style={styles.infoBorder}></View>
                  <Text style={styles.infoText2}>12 345.67₽</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoText1}>Платежи поставщикам</Text>
                  <View style={styles.infoBorder}></View>
                  <Text style={styles.infoText2}>12 345.67₽</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoText1}>Платежи поставщикам</Text>
                  <View style={styles.infoBorder}></View>
                  <Text style={styles.infoText2}>12 345.67₽</Text>
                </View>
              </ScrollView>
            </View>
      </View>
      <DateRangeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    height: '100%'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 64,
    backgroundColor: '#FFFFFF',
    paddingLeft: 16
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333'
  },
  contentContainer: {
    flex: 1,
    
    padding: 16,
  },
  aboutMeContainer: {
    marginBottom: 24,
    height: 72,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  aboutMe: {
    
  },
  aboutMeName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    
    color: "#333333"
  },
  aboutMeEmail: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    opacity: 0.7,
    color: "#333333"
  },
  aboutMeArrowIcon: {
    width: 32,
    height: 32
  },
  tabs: {
    gap: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  tabContainer: {
    backgroundColor: "#3333330D",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  firstTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tab: {
    fontFamily: 'Roboto',
    textAlign: "center",
    fontSize: 16,
    color: "#333333B2",
    fontWeight: 'bold',
  },
  activeTabContainer: {
    backgroundColor: "#2F80ED1A",
  },
  activeTab: {
    color: "#2F80ED",
  },
  tabArrowIcon: {
    width: 16,
    height: 16,
  },
  infoContainer: {
    flex: 1
  },
  info: {
    height: 120,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 4
  },
  infoText1: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoText2: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: 'bold'
  },
  infoBorder: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed'
    
  },




  // ВЫБОР ДАТЫ
  

})
