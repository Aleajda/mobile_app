import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import EditProfileModal from './../myProfile/modal/EditProfileModal';
import MyProfileSettingsModal from '../myProfile/modal/MyProfileSettingsModal';
import EditRoleModal from '../myProfile/modal/EditRoleModal';
import { useNavigation } from '@react-navigation/native';
import EditPasswordModal from '../myProfile/modal/EditPasswordModal';

const GoBackHeader = ({goTo}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [changeInfoModalOpen, setChangeInfoModalOpen] = useState(false);
    const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate(goTo)}><Image style={styles.menuIcon} source={require('@assets/images/blue_arrow_left_32px.png')}/></TouchableOpacity>
                <View>
                    <View style={styles.productCardContainer}>
                        <TouchableOpacity onPress={() => setModalOpen(true)}><Image style={styles.productCardIcon} source={require('@assets/images/drop_down.png')}/></TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 8
    },
    productCardContainer: {
        
        flexDirection: 'row',
        alignItems: 'center'
    },
    productCardCount: {
        fontFamily: 'Roboto',
        marginLeft: 4,
        color: '#2F80ED',
        fontWeight: 'bold',
        fontSize: 16,
    },
    menuIcon: {
        width: 32,
        height: 32
    },
    productCardIcon: {
        width: 32,
        height: 32
    }
})

export default GoBackHeader;
