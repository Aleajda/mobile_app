import React, { useState, useEffect } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
    ActivityIndicator,
} from "react-native";
import { RadioButton } from 'react-native-paper';
import BasketApi from '../../../api/BasketApi';

const ContractModal = ({ visible, onClose, onSelectContract, selectedContractId, companyId }) => {
    const [value, setValue] = useState(selectedContractId || '');
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible && companyId) {
            loadContracts();
        }
    }, [visible, companyId]);

    useEffect(() => {
        if (selectedContractId) {
            setValue(selectedContractId);
        }
    }, [selectedContractId]);

    const loadContracts = async () => {
        if (!companyId) return;
        
        try {
            setLoading(true);
            const response = await BasketApi.getCompanyDogovors(companyId);
            
            if (response && response.status === "ok" && response.dogovors) {
                setContracts(response.dogovors);
                
                // Если нет выбранного договора, выбираем первый по умолчанию
                if (!selectedContractId && response.dogovors.length > 0) {
                    setValue(response.dogovors[0].id);
                }
            }
        } catch (error) {
            console.error('Error loading contracts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        const selectedContract = contracts.find(contract => contract.id === value);
        if (selectedContract) {
            onSelectContract(selectedContract);
        }
        onClose();
    };

    const formatDate = (dateString) => {
        return dateString || '';
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Выбор договора
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
                        ) : contracts.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    Нет доступных договоров
                                </Text>
                            </View>
                        ) : (
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={styles.selectRoleContainer}>
                                    {contracts.map((contract) => (
                                        <View key={contract.id} style={styles.selectContainer}>
                                            <View style={styles.radioButton}>
                                                <RadioButton 
                                                    value={contract.id} 
                                                    color='#2F80ED' 
                                                    uncheckedColor='#BDBDBD'
                                                />
                                            </View>
                                            <View style={styles.selectText}>
                                                <Text style={styles.selectTitle}>
                                                    Договор №{contract.num}
                                                </Text>
                                                <Text style={styles.selectDescription}>
                                                    Срок: {formatDate(contract.start_date)} - {formatDate(contract.stop_date)}
                                                </Text>
                                                {contract.price_type_descr && (
                                                    <Text style={styles.selectDescription}>
                                                        Тип цены: {contract.price_type_descr}
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
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Roboto',
        opacity: 0.7,
        marginTop: 2
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
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16
    },
    emptyText: {
        color: '#828282',
        fontSize: 16,
        fontFamily: 'Roboto',
    }
});

export default ContractModal; 