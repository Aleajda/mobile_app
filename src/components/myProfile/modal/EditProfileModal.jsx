import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

const EditProfileModal = ({visible, onClose}) => {
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
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Имя
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Имя"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Фамилия
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Фамилия"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Отчество
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Отчество"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Имя пользователя
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Имя пользователя"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Email
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Email"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Мобильный номер
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Мобильный номер"
                                        // secureTextEntry
                                        // value={password}
                                        // onChangeText={setPassword}
                                    />
                                </View>
                            </View>
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
      form: {
        gap: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16
      },
      inputContainer: {

      },
      inputTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        opacity: 0.7,
        color: '#828282',
        marginBottom: 4
      },
      input: {
        fontFamily: 'Roboto',
        height: 40,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 8,
        padding: 10,
        color: '#333333',
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

export default EditProfileModal;
