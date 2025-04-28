import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const EditSitePropertiesModal = ({ visible, setVisible, setEditSiteModalOpen }) => {

    return (
        <Modal visible={visible} animationType='fade' transparent>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.backgroundOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => {
                        setEditSiteModalOpen(true)
                    }}>
                        <View
                            style={[
                                styles.blockContainer,
                                { flexDirection: "row", marginBottom: 16 },
                            ]}
                        >
                            <Image
                                style={styles.icon}
                                source={require("@assets/images/edit_24px.png")}
                            />
                            <Text style={[styles.blockText, {color: '#333333'}]}>
                                Изменить осн. данные
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.blockContainer, { flexDirection: 'row' }]}>
                            <Image style={styles.icon} source={require('@assets/images/delete_24px.png')} />
                            <Text style={styles.blockText}>Удалить</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

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
        color: '#EB5757',
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12
    },
})

export default EditSitePropertiesModal;
