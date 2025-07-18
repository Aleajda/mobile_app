import React, { useState, useEffect } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    View,
    ActivityIndicator,
} from "react-native";
import { RadioButton } from 'react-native-paper';
import BasketApi from '../../../api/BasketApi';

const ChangeAddressModal = ({ visible, onClose, onSelectSklad, selectedSkladId }) => {
    const [value, setValue] = useState(selectedSkladId || '');
    const [sklads, setSklads] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            loadSklads();
        }
    }, [visible]);

    useEffect(() => {
        if (selectedSkladId) {
            setValue(selectedSkladId);
        }
    }, [selectedSkladId]);

    const loadSklads = async () => {
        try {
            setLoading(true);
            const response = await BasketApi.getDeliverySklads();
            
            if (response && response.status === "ok" && response.sklads) {
                setSklads(response.sklads);
                
                // Если нет выбранного склада, выбираем первый по умолчанию
                if (!selectedSkladId && response.sklads.length > 0) {
                    setValue(response.sklads[0].id);
                }
            }
        } catch (error) {
            console.error('Error loading sklads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        const selectedSklad = sklads.find(sklad => sklad.id === value);
        if (selectedSklad) {
            onSelectSklad(selectedSklad);
        }
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Выбор склада
                        </Text>
                        <TouchableOpacity onPress={() => onClose()}>
                            <Text style={styles.headerClose}>
                                Отменить
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.mainContent}>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#2F80ED" />
                            </View>
                        ) : (
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.selectRoleContainer}>
                                    {sklads.map((sklad) => (
                                        <View key={sklad.id} style={styles.selectContainer}>
                                            <View style={styles.radioButton}>
                                                <RadioButton 
                                                    value={sklad.id} 
                                                    color='#2F80ED' 
                                                    uncheckedColor='#BDBDBD'
                                                />
                                            </View>
                                            <View style={styles.selectText}>
                                                <Text style={styles.selectTitle}>
                                                    {sklad.name}
                                                </Text>
                                                <Text style={styles.selectDescription}>
                                                    {sklad.address}
                                                </Text>
                                                {sklad.work_time && (
                                                    <Text style={styles.selectWorkTime}>
                                                        Время работы: {sklad.work_time}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </RadioButton.Group>
                        )}
                        <View style={{height: 32}}></View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleSave}>
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
        marginLeft: 4,
        flex: 1
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
        fontWeight: '400',
        fontFamily: 'Roboto',
        opacity: 0.7
    },
    selectWorkTime: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Roboto',
        opacity: 0.7,
        marginTop: 4
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
    loadingContainer: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ChangeAddressModal;
