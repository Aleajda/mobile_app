import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function PoliticModal({visible, onClose}) {

  return (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        О передаче данных
                    </Text>
                </View>
                <ScrollView style={styles.mainContent}>
                    <Text style={styles.mainHeader}>
                        Lorem ipsum dolor sit amet
                    </Text> 
                    <Text style={styles.mainText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis distinctio alias nam minus ducimus. Cum beatae, debitis iste error exercitationem consectetur totam dignissimos necessitatibus? Reprehenderit magni tempora debitis dolore sit!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quas sit laborum cumque possimus! Omnis vel aperiam pariatur, veniam placeat, reprehenderit beatae iure, explicabo nihil quis facilis provident sapiente odit.
                    </Text>
                    <Text style={styles.mainHeader}>
                        Lorem ipsum dolor sit amet
                    </Text> 
                    <Text style={styles.mainText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis distinctio alias nam minus ducimus. Cum beatae, debitis iste error exercitationem consectetur totam dignissimos necessitatibus? Reprehenderit magni tempora debitis dolore sit!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quas sit laborum cumque possimus! Omnis vel aperiam pariatur, veniam placeat, reprehenderit beatae iure, explicabo nihil quis facilis provident sapiente odit.
                    </Text>
                    <Text style={styles.mainHeader}>
                        Lorem ipsum dolor sit amet
                    </Text> 
                    <Text style={styles.mainText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis distinctio alias nam minus ducimus. Cum beatae, debitis iste error exercitationem consectetur totam dignissimos necessitatibus? Reprehenderit magni tempora debitis dolore sit!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quas sit laborum cumque possimus! Omnis vel aperiam pariatur, veniam placeat, reprehenderit beatae iure, explicabo nihil quis facilis provident sapiente odit.
                    </Text>
                    <Text style={styles.mainHeader}>
                        Lorem ipsum dolor sit amet
                    </Text> 
                    <Text style={styles.mainText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis distinctio alias nam minus ducimus. Cum beatae, debitis iste error exercitationem consectetur totam dignissimos necessitatibus? Reprehenderit magni tempora debitis dolore sit!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quas sit laborum cumque possimus! Omnis vel aperiam pariatur, veniam placeat, reprehenderit beatae iure, explicabo nihil quis facilis provident sapiente odit.
                    </Text>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => onClose()}>
                            <View style={styles.leftButtonContainer}>
                                <Text style={styles.leftButtonText}>
                                    Отклонить
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onClose()}>
                            <View style={styles.rightButtonContainer}>
                                <Text style={styles.rightButtonText}>
                                    Принять
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        // width: '100%',
        // height: '100%',
        backgroundColor: '#fff',
        
      },
      header: {
        height: 64,
        padding: 16,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
      },
      headerText: {
        color: '#333333',
        fontSize: 24,
        fontWeight: 500,
        fontFamily: 'Roboto',
      },
      mainContent: {
        padding: 16,
      },
      mainHeader: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
      },
      mainText: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 16,
        marginBottom: 16
      },
      footer: {
        height: 64,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      },
      buttonsContainer: {
        
        justifyContent: 'flex-end',
        flexDirection: 'row',
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
        fontWeight: 500,
        color: '#FFFFFF',
        lineHeight: 16,
      },
      leftButtonContainer: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: '#2F80ED99',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 8,
      },
      leftButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        color: '#2F80ED',
        lineHeight: 16
      }
})