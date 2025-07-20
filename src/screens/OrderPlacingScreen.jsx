import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import ProductCardOrder from "../components/productCard/ProductCardOrder";
import SearchProduct from "../components/search/SearchProduct";
import OrderPlacingProduct from "../components/orderPlacing/OrderPlacingProduct";
import ChangeAddressModal from "../components/orderPlacing/modal/ChangeAddressModal";
import SearchClientModal from "../components/orderPlacing/modal/SearchClientModal";
import ContractModal from "../components/orderPlacing/modal/ContractModal";
import BasketApi, { basketUpdateEvent } from "../api/BasketApi";
import Toast from 'react-native-toast-message';

const OrderPlacingScreen = ({ route, navigation }) => {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [searchClientModalOpen, setSearchClientModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSklad, setSelectedSklad] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contractsLoading, setContractsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Показ Toast-уведомления
  const showToast = (message) => {
    Toast.show({
      type: 'customToast',
      text1: message || 'Заказ успешно оформлен',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  };

  // Получаем товары из параметров навигации
  useEffect(() => {
    if (route.params && route.params.items) {
      setOrderItems(route.params.items);
      calculateTotalPrice(route.params.items);
    } else {
      // Если товары не переданы, возвращаемся на экран корзины
      navigation.goBack();
    }
  }, [route.params]);

  // Устанавливаем клиента "Себе на склад" по умолчанию при первой загрузке
  useEffect(() => {
    // Создаем клиента "Себе на склад" по умолчанию
    const defaultClient = {
      id: -1,
      name: 'Себе на склад',
      company_id: '-1'
    };
    
    setSelectedClient(defaultClient);
    
    // Загружаем склад по умолчанию
    loadDefaultSklad();
  }, []);

  // Загружаем договоры при выборе клиента
  useEffect(() => {
    if (selectedClient && selectedClient.company_id && selectedClient.company_id !== '-1') {
      loadClientContracts(selectedClient.company_id);
    } else {
      setSelectedContract(null);
    }
  }, [selectedClient]);

  // Расчет общей стоимости товаров
  const calculateTotalPrice = (items) => {
    if (!Array.isArray(items)) return;
    
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const count = parseInt(item.count) || 0;
      return sum + (price * count);
    }, 0);
    
    setTotalPrice(total);
  };

  // Форматирование цены
  const formatPrice = (price) => {
    if (!price) return '0 ₽';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const loadDefaultSklad = async () => {
    try {
      setLoading(true);
      const response = await BasketApi.getDeliverySklads();
      
      if (response && response.status === "ok" && response.sklads && response.sklads.length > 0) {
        setSelectedSklad(response.sklads[0]);
      }
    } catch (error) {
      console.error('Error loading default sklad:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClientContracts = async (companyId) => {
    try {
      setContractsLoading(true);
      const response = await BasketApi.getCompanyDogovors(companyId);
      
      if (response && response.status === "ok" && response.dogovors && response.dogovors.length > 0) {
        // Автоматически выбираем первый договор
        setSelectedContract(response.dogovors[0]);
      } else {
        setSelectedContract(null);
      }
    } catch (error) {
      console.error('Error loading client contracts:', error);
      setSelectedContract(null);
    } finally {
      setContractsLoading(false);
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleSelectSklad = (sklad) => {
    setSelectedSklad(sklad);
  };

  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
  };

  // Подготовка данных для отправки заказа
  const prepareOrderData = () => {
    // Формируем массив товаров для заказа
    const details = orderItems.map(item => ({
      id: item.id,
      basket_id: item.basket_id || "",
      detail_id: item.detail_id || "",
      brand_id: item.brand_id || "",
      article: item.article || "",
      brand: item.brand_name || item.brand || "",
      name: item.name || "",
      sort1_id: item.sort1_id || "",
      sort1_sreqid: item.sort1_sreqid || "",
      max_count: item.max_count || "",
      count: item.count || "1",
      old_count: item.old_count || "0",
      min_count: item.min_count || "0",
      multiplicity: item.multiplicity || "1",
      price: item.price || "0",
      dealer_price: item.dealer_price || "0",
      time: item.time || "0",
      status: item.status || "1",
      deliverer_type: item.deliverer_type || "1",
      deliverer_id: item.deliverer_id || "0",
      deliverer_online_profile_id: item.deliverer_online_profile_id || "0",
      create_date: item.create_date || "",
      update_date: item.update_date || "",
      comment: item.comment || "",
      checked: item.checked || "1",
      fast_sale: item.fast_sale || "0",
      ean13: item.ean13 || "",
      my_code: item.my_code || "",
      document_detail_id: item.document_detail_id || "0",
      imported_from_user_id: item.imported_from_user_id || "0",
      is_excise: item.is_excise || "0",
      is_marking: item.is_marking || "0",
      session_id: item.session_id || "",
      deliverer_name: item.deliverer_name || null,
      sklad_name: item.sklad_name || "",
      pricelist_name: item.pricelist_name || null,
      company_name: item.company_name || "",
      company_id: item.company_id || "",
      sklad_id: item.sklad_id || "",
      city_name: item.city_name || "",
      imported_from_user_name: item.imported_from_user_name || null,
      imported_from_user_lastname: item.imported_from_user_lastname || null
    }));

    // Формируем данные заказа
    return {
      details: details,
      company_id: selectedClient ? selectedClient.company_id : "",
      company_dogovor_id: selectedContract ? selectedContract.id : 0,
      delivery_type: 1, // Самовывоз
      delivery_address: selectedSklad ? selectedSklad.address : "",
      delivery_type_id: selectedSklad ? selectedSklad.id : "",
      payment_type: 1, // Наличные
      sum: totalPrice,
      zakaz_cashback_discount: "0",
      car_id: null
    };
  };

  // Обработчик нажатия на кнопку "Оформить заказ"
  const handlePlaceOrder = async () => {
    // Проверяем, выбран ли клиент
    if (!selectedClient) {
      showToast('Выберите клиента');
      return;
    }
    

    // Проверяем, выбран ли склад
    if (!selectedSklad) {
      showToast('Выберите склад');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Подготавливаем данные заказа
      const orderData = prepareOrderData();
      
      // Отправляем запрос на оформление заказа
      const response = await BasketApi.saveZakaz(orderData);
      
      if (response && response.status === "ok" && response.zakaz_id) {
        // Очищаем корзину
        await BasketApi.clearBasket();
        
        // Показываем сообщение об успешном оформлении
        showToast(`Заказ №${response.zakaz_id} успешно оформлен`);
        
        // Переходим на экран заказов
        setTimeout(() => {
          navigation.navigate("Orders");
        }, 500);
      } else {
        // Показываем сообщение об ошибке
        showToast('Не удалось оформить заказ');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showToast('Произошла ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Text style={styles.clientChoice}>
                  {selectedClient ? selectedClient.name : 'Выбор клиента'}
                </Text>
            </View>
            <TouchableOpacity>
                <Image
                style={styles.clientArrow}
                source={require('@assets/images/arrow_right.png')}
                />
            </TouchableOpacity>
            </View>
        </TouchableOpacity>
        
        {/* Договор */}
        {selectedClient && selectedClient.company_id && selectedClient.company_id !== '-1' && (
          <TouchableOpacity onPress={() => setContractModalOpen(true)}>
              <View style={styles.clientCard}>
              <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>Договор №</Text>
                  <Text style={styles.clientChoice}>
                    {contractsLoading 
                      ? 'Загрузка...' 
                      : (selectedContract 
                        ? selectedContract.num 
                        : 'Нет доступных договоров')}
                  </Text>
              </View>
              <TouchableOpacity>
                  <Image
                  style={styles.clientArrow}
                  source={require('@assets/images/arrow_right.png')}
                  />
              </TouchableOpacity>
              </View>
          </TouchableOpacity>
        )}

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
            {selectedSklad ? selectedSklad.address : 'Загрузка...'}
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
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <OrderPlacingProduct 
                      key={item.id} 
                      item={item}
                    />
                  ))
                ) : (
                  <Text style={styles.emptyText}>Нет товаров для оформления</Text>
                )}
            </View>
        </View>

      </View>
      </ScrollView>  


        {/* FOOTER */}
        <View style={styles.footer}>
            <View style={styles.footerContainer}>
                <View style={styles.footerContainerText}>
                    <Text style={styles.footerContainerTextCounter}>
                        Итого {orderItems.length} {getItemsCountText(orderItems.length)} на сумму
                    </Text>
                    <Text style={styles.footerContainerTextPrice}>
                        {formatPrice(totalPrice)}
                    </Text>
                </View>
                <TouchableOpacity 
                  onPress={handlePlaceOrder} 
                  disabled={isSubmitting || orderItems.length === 0}
                >
                    <View style={isSubmitting ? styles.rightButtonContainerDisabled : styles.rightButtonContainer}>
                        {isSubmitting ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Text style={styles.rightButtonText}>
                            Оформить заказ
                          </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>

      <ChangeAddressModal 
        visible={addressModalOpen} 
        onClose={() => setAddressModalOpen(false)}
        onSelectSklad={handleSelectSklad}
        selectedSkladId={selectedSklad ? selectedSklad.id : ''}
      />
      <SearchClientModal 
        visible={searchClientModalOpen} 
        onClose={() => setSearchClientModalOpen(false)}
        onSelectClient={handleSelectClient}
      />
      <ContractModal 
        visible={contractModalOpen} 
        onClose={() => setContractModalOpen(false)}
        onSelectContract={handleSelectContract}
        selectedContractId={selectedContract ? selectedContract.id : ''}
        companyId={selectedClient ? selectedClient.company_id : ''}
      />
    </View>
  );
};

// Функция для правильного склонения слова "товар"
const getItemsCountText = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'товаров';
  }
  
  if (lastDigit === 1) {
    return 'товар';
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товара';
  }
  
  return 'товаров';
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
  emptyText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
        backgroundColor: '#2F80ED',
        borderRadius: 8
    },
    rightButtonContainerDisabled: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: '#BDBDBD',
        borderRadius: 8
    },
    rightButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

});
