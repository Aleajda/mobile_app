import React, { useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    View,
} from "react-native";
import { RadioButton } from 'react-native-paper';

const EditRoleModal = ({ visible, onClose }) => {

    const [value, setValue] = useState('first');

    return (
        <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Осн. данные
                            </Text>
                            <TouchableOpacity onPress={() => onClose()}>
                                <Text style={styles.headerClose}>
                                    Отменить
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.mainContent}>
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.selectRoleContainer}>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='1' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Владелец сайта
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Имеет полный доступ ко всему функционалу
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='2' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Администратор
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Имеет полный доступ ко всему функционалу
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='3' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Старший менеджер
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='4' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Менеджер
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='5' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Логист
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='6' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Склад
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='7' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Водитель
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='8' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Кассир
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='9' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Мастер приемщик
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='10' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Покупатель
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Описание уровня
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </RadioButton.Group>
                            <View style={{height: 32}}></View>
                        </ScrollView>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => onClose()}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>
                                        Сохранить
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        
      },
      header: {
        height: 64,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      headerText: {
        color: '#333333',
        fontSize: 24,
        fontWeight: 500,
        fontFamily: 'Roboto',
      },
      headerClose: {
        color: '#2F80ED',
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Roboto',
      },
      mainContent: {
        backgroundColor: '#E0E0E0',
        padding: 16,
      },
      selectRoleContainer: {
        gap: 4
      },
      selectContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16
      },
      radioButton: {
        height: 16
      },
      selectText: {
        marginLeft: 4
      },
      selectTitle: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Roboto',
      },
      selectDescription: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 400,
        fontFamily: 'Roboto',
        opacity: 0.7
      },
      footer: {
        height: 64,
        padding: 16,
        alignItems: 'flex-end'
      },
      buttonContainer: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: '#2F80ED',
        borderRadius: 8
      },
      buttonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        color: '#FFFFFF',
        lineHeight: 16,
      }
})

export default EditRoleModal;
