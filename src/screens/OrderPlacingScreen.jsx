import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import ProductCardOrder from "../components/productCard/ProductCardOrder";
import SearchProduct from "../components/search/SearchProduct";
import OrderPlacingProduct from "../components/orderPlacing/OrderPlacingProduct";
import ChangeAddressModal from "../components/orderPlacing/modal/ChangeAddressModal";
import SearchClientModal from "../components/orderPlacing/modal/SearchClientModal";

const OrderPlacingScreen = ({ route, navigation }) => {


  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [searchClientModalOpen, setSearchClientModalOpen] = useState(false);


  return (
    <View style={styles.wrapper}>
  
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Оформление</Text>
      </View>
      <ScrollView style={{ width: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => setSearchClientModalOpen(true)}>
            <View style={styles.clientCard}>
            <View style={styles.clientInfo}>
                <Text style={styles.clientName}>Клиент</Text>
                <Text style={styles.clientChoice}>Выбор клиента</Text>
            </View>
            <TouchableOpacity>
                <Image
                style={styles.clientArrow}
                source={require('@assets/images/arrow_right.png')}
                />
            </TouchableOpacity>
            </View>
        </TouchableOpacity>
        

        {/* Способ доставки */}
        <View style={styles.deliveryCard}>
          <Text style={styles.deliveryLabel}>Способ доставки</Text>
          <View style={styles.deliveryTag}>
            <Text style={styles.deliveryTagText}>Самовывоз</Text>
          </View>
        </View>

        {/* Склад */}
        <View style={styles.warehouseCard}>
          <Text style={styles.warehouseLabel}>Склад</Text>
          <Text style={styles.warehouseAddress}>
            Россия, Республика Татарстан, Верхнеуслонский р-н, Иннополис, Спортивная ул, 136, кв 45
          </Text>
          <View style={styles.warehouseDivider} />
          <TouchableOpacity style={styles.warehouseButton} onPress={() => setAddressModalOpen(true)}>
            <Text style={styles.warehouseButtonText}>Изменить</Text>
          </TouchableOpacity>
        </View>

        {/* Товары */}
        <View style={styles.products}>
            <Text style={styles.productsTitle}>
                Товары
            </Text>
            <View style={styles.productsContainer}>
                <OrderPlacingProduct/>
                <OrderPlacingProduct/>
            </View>
        </View>

      </View>
      </ScrollView>  


        {/* FOOTER */}
        <View style={styles.footer}>
            <View style={styles.footerContainer}>
                <View style={styles.footerContainerText}>
                    <Text style={styles.footerContainerTextCounter}>
                        Итого 1 товар на сумму
                    </Text>
                    <Text style={styles.footerContainerTextPrice}>
                        1760 ₽
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                    <View style={styles.rightButtonContainer}>
                        <Text style={styles.rightButtonText}>
                            Оформить заказ
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

      <ChangeAddressModal visible={addressModalOpen} onClose={() => setAddressModalOpen(false)}/>
      <SearchClientModal visible={searchClientModalOpen} onClose={() => setSearchClientModalOpen(false)}/>
    </View>
  );
};

export default OrderPlacingScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E0E0E0',
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 64,
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  body: {
    flex: 1,
    padding: 16,
    gap: 4
  },
  clientCard: {
    height: 72,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientInfo: {},
  clientName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  clientChoice: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    opacity: 0.7,
    color: '#333333',
  },
  clientArrow: {
    width: 32,
    height: 32,
  },



//   ДОСТАВКА

  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    
  },
  deliveryLabel: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  deliveryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#EAF2FF',
  },
  deliveryTagText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#2F80ED',
    fontWeight: '500',
  },


//   СКЛАД

  warehouseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  warehouseLabel: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  warehouseAddress: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
  },
  warehouseDivider: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  warehouseButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#2F80ED',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  warehouseButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#2F80ED',
  },

//   ТОВАРЫ

  products: {

  },
  productsTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  productsContainer: {
    gap: 4
  },


  //   FOOTER
    footer: {
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    footerContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    footerContainerText: {

    },
    footerContainerTextCounter: {
        color: '#828282',
        fontFamily: 'Roboto',
        fontSize: 12
    },
    footerContainerTextPrice: {
        color: '#333333',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold'
    },
    


    rightButtonContainer: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        // borderColor: '#2F80ED99',
        // borderWidth: 1,
        backgroundColor: '#2F80ED',
        borderRadius: 8
      },
      rightButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },

});
