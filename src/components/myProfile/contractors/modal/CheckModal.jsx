import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'

const CheckModal = ({visible, onClose}) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Счет
                            </Text>
                            <TouchableOpacity onPress={() => onClose()}>
                                <Text style={styles.headerClose}>
                                    Отменить
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.mainContent}>
                          <View style={styles.anotherBlock}>
                                <View style={styles.mainInfoBlock}>
                                    <View style={styles.mainInfoBlockLeft}>
                                        <Text style={styles.mainInfoBlockTitle}>
                                            Контрагент
                                        </Text>
                                        <Text style={styles.mainInfoBlockText}>
                                            Зарипов Айнур Фаизович
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
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Банк
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Банк"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        БИК
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="БИК"
                                    />
                                </View>    
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        Р/C
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="Р/C"
                                    />
                                </View>  
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputTitle}>
                                        К/C
                                    </Text>
                                    <TextInput
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        placeholder="К/C"
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
        fontWeight: 'bold',
        color: '#FFFFFF',
      },

      //   КОНТРАГЕНТ
  mainInfoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainInfoBlockLeft: {},
  mainInfoBlockTitle: {
    fontStyle: 'Roboto',
    fontSize: 16,
    color: "#333333",
    marginBottom: 4,
    fontWeight: "600"
  },
  mainInfoBlockText: {
    fontStyle: "Roboto",
    fontSize: 16,
    color: "#333333",
    opacity: 0.7,
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
  anotherBlock: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 4,
  },
})

export default CheckModal;
