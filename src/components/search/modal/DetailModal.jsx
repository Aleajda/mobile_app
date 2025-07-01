import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


const DetailModal = ({ navigation, detailData, article, brand, visible = false, onClose }) => {
    const [modalVisible, setModalVisible] = useState(visible);
    
    // Синхронизируем состояние с пропсами
    useEffect(() => {
        setModalVisible(visible);
    }, [visible]);

    const showToast = () => {
        Toast.show({
        type: 'customToast',
        text1: 'Добавлено в корзину',
        text2: 'Subtitle',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 60,
        });
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

    const handleClose = () => {
        setModalVisible(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View style={styles.goBackHeader}>
                            <TouchableOpacity onPress={handleClose}><Image style={styles.goBackIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/></TouchableOpacity>
                            <View>
                                <View style={styles.searchIconContainer}>
                                    <TouchableOpacity onPress={null}><Image style={styles.searchIcon} source={require('@assets/images/search_32px.png')}/></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {detailData?.name || 'Деталь'}
                            </Text>
                            <Text style={styles.titleDescription}>
                                {detailData?.brand || brand || 'Производитель'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <ScrollView style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false}>
                           <View style={styles.card}>
                                <InfoRow label="Артикул" value={detailData?.article || article || 'Н/Д'} />
                                <InfoRow label="Бренд" value={detailData?.brand || brand || 'Н/Д'} />
                                <InfoRow label="Наименование" value={detailData?.name || 'Н/Д'} />
                                <InfoRow label="Срок доставки" value={detailData?.time || '0'} />
                                <InfoRow label="Тип" value={detailData?.type || 'Склад'} />
                                <InfoRow label="Поставщик" value={detailData?.pl_name || detailData?.supplier || 'Основной'} />
                                <InfoRow label="Закуп. цена" value={formatPrice(detailData?.price || detailData?.sale_price || detailData?.cost)} />
                            </View>
                        </ScrollView>
                    </View>
                
                    <View style={styles.footer}>                
                        <TouchableOpacity style={styles.saveButton} onPress={showToast}>
                            <Text style={styles.saveText}>В корзину</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Toast config={toastConfig}/>
        </Modal>
    );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const toastConfig = {
  customToast: ({ text1, text2, ...rest }) => (
    <View
      style={{
        backgroundColor: '#1c1c1c',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
      }}
    >
      <Image
        source={require('@assets/images/check_16px.png')}
        style={{ width: 16, height: 16, marginRight: 10 }}
      />
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{text1}</Text>
        {text2 ? (
          <Text style={{ color: '#aaa', fontSize: 13 }}>{text2}</Text>
        ) : null}
      </View>
    </View>
  ),
};



const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0E0E0',
    },

    // GO BACK HEADER

    goBackHeader: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 24
    },
    searchIconContainer: { 
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackIcon: {
        width: 32,
        height: 32
    },
    searchIcon: {
        width: 32,
        height: 32
    },


    // MAIN CONTENT


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
        marginBottom: 8,
        marginBottom: 24,
        gap: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Roboto'
    },
    titleDescription: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 16,
        opacity: 0.7,
        color: '#333333'
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
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1
    },


     card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#828282',
        fontFamily: 'Roboto',
        fontSize: 16,
        width: '50%'
    },
    value: {
        color: '#333333',
        fontSize: 16,
        fontFamily: 'Roboto',
        width: '50%'
    },

    //   FOOTER

  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  saveButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontFamily: 'Roboto'
  },

  footerTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#828282'
  }

})

export default DetailModal; 