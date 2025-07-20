import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import DeleteCompanyModal from "./modal/DeleteCompanyModal";

const CompaniesBlock = ({ companies = [], loading = false }) => {

    const [visible, setVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleOpenDeleteModal = (company) => {
        setSelectedCompany(company);
        setVisible(true);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2F80ED" />
                <Text style={styles.loadingText}>Загрузка компаний...</Text>
            </View>
        );
    }

    return (
        <View>
            {/* <TouchableOpacity>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Привязать компанию</Text>
                </View>
            </TouchableOpacity> */}
            
            {companies.length === 0 ? (
                <View style={styles.noCompaniesContainer}>
                    <Text style={styles.noCompaniesText}>Компании не найдены</Text>
                </View>
            ) : (
                companies.map((company) => (
                    <View key={company.id} style={styles.companiesBlock}>
                        <View style={styles.companiesBlockText}>
                            <Text style={styles.companiesBlockTitle}>
                                {company.short_name || company.name}
                            </Text>
                            <Text style={styles.companiesBlockDescription}>
                                {company.address}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => handleOpenDeleteModal(company)}>
                            <Image
                                style={styles.editCompanyImage}
                                source={require("../../../assets/images/drop_down.png")}
                            />
                        </TouchableOpacity>
                    </View>
                ))
            )}
            
            <DeleteCompanyModal 
                visible={visible} 
                setVisible={setVisible} 
                company={selectedCompany}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333333',
        fontFamily: 'Roboto',
    },
    noCompaniesContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noCompaniesText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        opacity: 0.7,
    },
    addNewBtn: {
        height: 64,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 24
    },
    addNewBtnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED'
    },
    companiesBlock:{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 4
    },
    companiesBlockText: {
        flexDirection: 'column',
        marginRight: 16,
        width: 248
    },
    companiesBlockTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    companiesBlockDescription: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        color: '#333333',
        opacity: 0.7
    },
    editCompanyImage: {
        width: 32,
        height: 32
    }
});

export default CompaniesBlock;
