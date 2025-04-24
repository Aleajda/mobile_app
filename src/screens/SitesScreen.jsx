import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import SitesBlock from "../components/sites/SitesBlock";




const SitesScreen = ({ navigation }) => {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Сайты
            </Text>
            <View style={styles.searchContainer}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')} />
              </TouchableOpacity>
            </View>
          </View>
        
      </View>
      <View style={styles.main}>
        <ScrollView style={{ width: '100%' }} >
          <SitesBlock navigation={navigation}/>   
        </ScrollView>
      </View>
    </View>
  );
};

export default SitesScreen;

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
