import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import SitesBlock from "../components/sites/SitesBlock";
import { useNavigation } from "@react-navigation/native";
import EditSiteModal from "../components/sites/modal/EditSiteModal";
import EditSitePropertiesModal from "../components/sites/modal/EditSitePropertiesModal";




const SiteScreen = ({ navigation, route }) => {

  const { name, company } = route.params;
  const [visible, setVisible] = useState(false);
  const [editSiteModalOpen, setEditSiteModalOpen] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Sites')}><Image style={styles.menuIcon} source={require('@assets/images/blue_arrow_left_32px.png')} /></TouchableOpacity>
        <View>
          <View style={styles.productCardContainer}>
            <TouchableOpacity onPress={() => setVisible(true)}><Image style={styles.productCardIcon} source={require('@assets/images/drop_down.png')} /></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerTitle}>
          {name}
        </Text>
        <Text style={styles.titleContainerDescription}>
          {company}
        </Text>
      </View>

      {/* MAIN */}


      <View style={styles.main}>

      <View style={styles.mainInfoContainer}>
        <Text style={styles.mainInfoTitle}>Основные данные</Text>
        <View style={styles.mainInfo}>
          <View style={styles.mainInfoBlock}>
            <View style={styles.mainInfoBlockLeft}>
              <Text style={styles.mainInfoBlockTitle}>Имя</Text>
              <Text style={styles.mainInfoBlockText}>
                {name}
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
              <Text style={styles.mainInfoBlockTitle}>Принадлежность компании</Text>
              <Text style={styles.mainInfoBlockText}>
                {company}
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
      
      <EditSitePropertiesModal visible={visible} setVisible={setVisible} setEditSiteModalOpen={setEditSiteModalOpen}/>
      <EditSiteModal onClose={() => setEditSiteModalOpen(false)} visible={editSiteModalOpen}/>
    </View>
  );
};

export default SiteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8
  },
  productCardContainer: {

    flexDirection: 'row',
    alignItems: 'center'
  },
  productCardCount: {
    fontFamily: 'Roboto',
    marginLeft: 4,
    color: '#2F80ED',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuIcon: {
    width: 32,
    height: 32
  },
  productCardIcon: {
    width: 32,
    height: 32
  },

  titleContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20
  },

  titleContainerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'Roboto'
  },

  titleContainerDescription: {
    marginTop: 8,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 16,
    opacity: 0.7,
    color: '#333333'
  },




  main: {
    padding: 16
  },

  // MAIN INFO

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
// anotherBlock: {
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: "#FFFFFF",
//     marginBottom: 4,
// },
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
})
