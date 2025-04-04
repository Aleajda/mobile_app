import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DeleteCompanyModal from "./modal/DeleteCompanyModal";

const CompaniesBlock = () => {

    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.addNewBtn}>
                    <Text style={styles.addNewBtnText}>Привязать компанию</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.companiesBlock}>
                <View style={styles.companiesBlockText}>
                    <Text style={styles.companiesBlockTitle}>ООО "ДЖЕТПАРТС"</Text>
                    <Text style={styles.companiesBlockDescription}>123154, ГОРОД МОСКВА, НАБЕРЕЖНАЯ КАРАМЫШЕВСКАЯ, 56, 20</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editCompanyImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.companiesBlock}>
                <View style={styles.companiesBlockText}>
                    <Text style={styles.companiesBlockTitle}>ИП Кутлубаев Рустам Галиевич</Text>
                    <Text style={styles.companiesBlockDescription}>г. Москва</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editCompanyImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.companiesBlock}>
                <View style={styles.companiesBlockText}>
                    <Text style={styles.companiesBlockTitle}>ООО "ЗАФИР"</Text>
                    <Text style={styles.companiesBlockDescription}>г. Казань, ул Гладилова, д 53</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        style={styles.editCompanyImage}
                        source={require("../../../assets/images/drop_down.png")}
                    />
                </TouchableOpacity>
            </View>
            <DeleteCompanyModal visible={visible} setVisible={setVisible}/>
        </View>
    );
};

const styles = StyleSheet.create({
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
