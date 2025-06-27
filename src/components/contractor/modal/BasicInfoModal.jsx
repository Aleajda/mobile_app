import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';

const BasicInfoModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Новый контрагент</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.headerClose}>Отменить</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.block}>
            <View style={styles.inlineTagBox}>
              <Text style={styles.tag}>Покупатель</Text>
              <Text style={styles.tag}>Физ. лицо</Text>
            </View>
          </View>

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Основные данные</Text>
            {["Фамилия", "Имя", "Отчество", "+7", "Email"].map(placeholder => (
              <TextInput
                key={placeholder}
                placeholder={placeholder}
                style={styles.input}
                keyboardType={placeholder === "+7" ? "phone-pad" : "default"}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button style={styles.footerBtn} mode="contained" onPress={onClose}>Применить</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerClose: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F80ED',
  },
  scrollArea: {
    backgroundColor: '#E0E0E0',
    padding: 16,
  },
  block: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  inlineTagBox: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E3F0FF',
    color: '#2F80ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerBtn: {
    backgroundColor: '#2F80ED'
  }
});

export default BasicInfoModal;
