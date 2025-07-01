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
import BasketApi from "../../../api/BasketApi";
import Toast from 'react-native-toast-message';

const ProductCardSettingsModal = ({ visible, setVisible, setEditModalOpen, itemIndex, onItemDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Функция для показа уведомления
    const showToast = (message) => {
        Toast.show({
            type: 'customToast',
            text1: message || 'Товар удален из корзины',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 60,
        });
    };
    
    // Обработчик удаления товара
    const handleDeleteItem = async () => {
        if (isDeleting) return;
        
        // Запрашиваем подтверждение
        Alert.alert(
            "Удаление товара",
            "Вы уверены, что хотите удалить этот товар из корзины?",
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
                            setIsDeleting(true);
                            
                            // Вызываем API для удаления товара
                            const result = await BasketApi.removeFromBasket(itemIndex);
                            
                            if (result && result.status === 'ok') {
                                showToast('Товар удален из корзины');
                                
                                // Закрываем модальное окно
                                setVisible(false);
                                
                                // Вызываем колбэк для обновления родительского компонента
                                if (onItemDeleted) {
                                    onItemDeleted();
                                }
                            } else {
                                Alert.alert("Ошибка", "Не удалось удалить товар из корзины");
                            }
                        } catch (error) {
                            console.error("Ошибка при удалении товара:", error);
                            Alert.alert("Ошибка", "Произошла ошибка при удалении товара");
                        } finally {
                            setIsDeleting(false);
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
                    <TouchableOpacity onPress={() => {
                        setVisible(false);
                        setEditModalOpen();
                    }}>
                        <View
                            style={[
                                styles.blockContainer,
                                { flexDirection: "row" },
                            ]}
                        >
                            <Image
                                style={styles.icon}
                                source={require("@assets/images/edit_24px.png")}
                            />
                            <Text style={styles.blockText}>
                                Редактировать товар
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteItem} disabled={isDeleting}>
                        <View
                            style={[styles.blockContainer, { flexDirection: 'row' }]}
                        >
                            <Image style={styles.icon} source={require('@assets/images/delete_24px.png')} />
                            <Text style={[styles.blockText, {color: '#EB5757'}]}>
                                Удалить товар
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
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default ProductCardSettingsModal;
