import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { Checkbox, RadioButton, Button } from 'react-native-paper';
import BasicInfoModal from './BasicInfoModal';

const TypeAndOkopfModal = ({ visible, onClose }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [okopf, setOkopf] = useState("");
  const [basicInfoModalOpen, setBasicInfoModalOpen] = useState(false);

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Тип и ОКОПФ</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.headerClose}>Отменить</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollArea}>
          <Text style={styles.sectionTitle}>Тип</Text>
          {["Покупатель", "Поставщик", "Моя компания", "Перевозчик"].map(type => (
            <TouchableOpacity
              key={type}
              style={styles.optionBox}
              onPress={() => toggleType(type)}
            >
              <Checkbox color="#2F80ED" status={selectedTypes.includes(type) ? "checked" : "unchecked"} />
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>ОКОПФ</Text>
          <TouchableOpacity style={styles.optionBox} onPress={() => setOkopf("ИП")}>
            <RadioButton color="#2F80ED" status={okopf === "ИП" ? "checked" : "unchecked"} />
            <View>
              <Text>ИП</Text>
              <Text style={styles.subText}>Описание уровня</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={() => setOkopf("ЮЛ")}>
            <RadioButton color="#2F80ED" status={okopf === "ЮЛ" ? "checked" : "unchecked"} />
            <View>
              <Text>Юридическое лицо</Text>
              <Text style={styles.subText}>(ООО, АО, ЗАО, ПАО)</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <Button style={styles.footerBtn} mode="contained" onPress={() => setBasicInfoModalOpen(true)}>Применить</Button>
        </View>
      </View>
      <BasicInfoModal visible={basicInfoModalOpen} onClose={() => setBasicInfoModalOpen(false)}/>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  subText: {
    fontSize: 12,
    color: '#666',
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

export default TypeAndOkopfModal;
