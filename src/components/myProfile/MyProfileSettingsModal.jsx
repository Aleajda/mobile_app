import React from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const MyProfileSettingsModal = ({visible, setVisible}) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>Привязать компанию</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '100%',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 16,
        
      },
      blockContainer: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 4
      },
      blockText: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
      }
})

export default MyProfileSettingsModal;
