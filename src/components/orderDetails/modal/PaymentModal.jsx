import React, { useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";



const PaymentModal = ({ visible, setVisible, setEditModalOpen }) => {



    return (
        <Modal visible={visible} animationType="fade" transparent>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.backgroundOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={null}>
                        <View
                            style={[
                                styles.blockContainer,
                                { flexDirection: "row", paddingLeft: 32, marginBottom: 16 },
                            ]}
                        >
                            <Text style={styles.blockText}>
                                Наличными
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={null}>
                        <View
                            style={[
                                styles.blockContainer,
                                { flexDirection: "row", paddingLeft: 32 },
                            ]}
                        >
                            <Text style={styles.blockText}>
                                Перевод на карту
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
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

export default PaymentModal;
