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

const ChangeAddressModal = ({ visible, onClose }) => {

    const [value, setValue] = useState('1');

    return (
        <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Способ доставки
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
                                                Склад
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Россия, Республика Татарстан, Верхнеуслонский р-н, Иннополис, Спортивная ул, 136, кв 45
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='2' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Склад
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Россия, Республика Татарстан, Верхнеуслонский р-н, Иннополис, Спортивная ул, 136, кв 45
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.selectContainer}>
                                        <View style={styles.radioButton}><RadioButton value='3' color='#2F80ED' uncheckedColor='#BDBDBD'/></View>
                                        <View style={styles.selectText}>
                                            <Text style={styles.selectTitle}>
                                                Склад
                                            </Text>
                                            <Text style={styles.selectDescription}>
                                                Россия, Республика Татарстан, Верхнеуслонский р-н, Иннополис, Спортивная ул, 136, кв 45
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
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
      headerClose: {
        color: '#2F80ED',
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        color: '#FFFFFF',
      }
})

export default ChangeAddressModal;
