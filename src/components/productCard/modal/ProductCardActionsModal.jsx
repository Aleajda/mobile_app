import React, { useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert
} from "react-native";
import BasketApi, { basketUpdateEvent } from "../../../api/BasketApi";
import Toast from 'react-native-toast-message';

const ProductCardActionsModal = ({ visible, setVisible, selectedItems, onSelectAll, onUnselectAll, isAllSelected }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    
    
    const showToast = (message) => {
        Toast.show({
            type: 'customToast',
            text1: message || 'Товары удалены из корзины',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 60,
        });
    };
    
    
    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            onUnselectAll();
        } else {
            onSelectAll();
        }
        setVisible(false);
    };
    
    
    const handleDeleteSelected = async () => {
        if (isProcessing || selectedItems.length === 0) return;
        
        
        Alert.alert(
            "Удаление товаров",
            `Вы уверены, что хотите удалить ${selectedItems.length} ${selectedItems.length === 1 ? 'товар' : 'товаров'} из корзины?`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setIsProcessing(true);
                            
                            
                            const result = await BasketApi.removeMultipleFromBasket(selectedItems);
                            
                            if (result && result.status === 'ok') {
                                showToast(`${selectedItems.length} ${selectedItems.length === 1 ? 'товар удален' : 'товаров удалено'} из корзины`);
                                
                                
                                setVisible(false);
                                
                                
                                basketUpdateEvent.emit();
                            } else {
                                Alert.alert("Ошибка", "Не удалось удалить товары из корзины");
                            }
                        } catch (error) {
                            console.error("Ошибка при удалении товаров:", error);
                            Alert.alert("Ошибка", "Произошла ошибка при удалении товаров");
                        } finally {
                            setIsProcessing(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.backgroundOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={handleToggleSelectAll}>
                        <View
                            style={[
                                styles.blockContainer,
                                { flexDirection: "row" },
                            ]}
                        >
                            <Image
                                style={styles.icon}
                                source={require("@assets/images/check_16px.png")}
                            />
                            <Text style={styles.blockText}>
                                {isAllSelected ? 'Снять выбор' : 'Выбрать все'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleDeleteSelected} 
                        disabled={isProcessing || selectedItems.length === 0}
                    >
                        <View
                            style={[
                                styles.blockContainer, 
                                { flexDirection: 'row', opacity: selectedItems.length === 0 ? 0.5 : 1 }
                            ]}
                        >
                            <Image style={styles.icon} source={require('@assets/images/delete_24px.png')} />
                            <Text style={[styles.blockText, {color: '#EB5757'}]}>
                                Удалить выбранное
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast config={toastConfig}/>
        </Modal>
    );
};

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
    backgroundOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalContent: {
        width: "100%",
        backgroundColor: "#E0E0E0",
        borderRadius: 16,
        padding: 16,
    },
    blockContainer: {
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginBottom: 4,
    },
    blockText: {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
});

export default ProductCardActionsModal; 