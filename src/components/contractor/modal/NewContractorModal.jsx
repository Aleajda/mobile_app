import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import TypeAndOkopfModal from './TypeAndOkopfModal';

const NewContractorModal = ({ visible, onClose }) => {
  const [typeAndOkopfModalOpen, setTypeAndOkopfModalOpen] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Новый контрагент</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerClose}>Отменить</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollArea}>
            <View style={styles.infoBlock}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Тип и ОКОПФ</Text>
                <Text style={styles.infoSubtitle}>присвоенные теги</Text>
              </View>
              <TouchableOpacity onPress={() => setTypeAndOkopfModalOpen(true)}>
                <Image
                  style={styles.arrowIcon}
                  source={require('@assets/images/arrow_right.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </View>
      <TypeAndOkopfModal visible={typeAndOkopfModalOpen} onClose={() => setTypeAndOkopfModalOpen(false)}/>
    </Modal>
  );
};

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
    alignItems: 'center',
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
  scrollArea: {
    backgroundColor: '#E0E0E0',
    padding: 16,
  },
  infoBlock: {
    marginBottom: 24,
    height: 72,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTextContainer: {},
  infoTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: "#333333",
  },
  infoSubtitle: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    opacity: 0.7,
    color: "#333333",
  },
  arrowIcon: {
    width: 32,
    height: 32,
  },
});

export default NewContractorModal;
