import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal } from 'react-native';

const SearchClientModal = ( {visible, onClose} ) => {
  const [searchValue, setSearchValue] = useState('');

  const clearInput = () => {
    setSearchValue('');
  };

  const clients = [
    { id: 1, name: 'Себе на склад' },
    { id: 2, name: 'Розничный клиент' }
  ];

  return (
    <Modal visible={visible} style={styles.modalContainer} animationType="slide" transparent>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Поиск клиента</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerCancel}>Отменить</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#828282"
              cursorColor="#2F80ED"
              placeholder="Поиск клиента"
              value={searchValue}
              onChangeText={setSearchValue}
            />
            {searchValue.length > 0 && (
              <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
                <Image
                  style={styles.clearIcon}
                  source={require('@assets/images/close_24px.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Main content */}
        <ScrollView contentContainerStyle={styles.main}>
          <TouchableOpacity style={styles.create}>
            <Text style={styles.createText}>Создать клиента</Text>
          </TouchableOpacity>

          {clients.map((client) => (
            <TouchableOpacity key={client.id} style={styles.client}>
              <Text style={styles.clientText}>{client.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchClientModal;

const styles = StyleSheet.create({
  modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0E0E0',
        
      },

  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 24,
    color: '#333333',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },

  headerCancel: {
    fontSize: 16,
    color: '#2F80ED',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D9CDB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 40,
    fontFamily: 'Roboto',
    fontSize: 16,
  },

  clearButton: {
    paddingLeft: 8,
  },

  clearIcon: {
    width: 24,
    height: 24,
  },

  main: {
    padding: 16,
    gap: 8,
    backgroundColor: '#E0E0E0',
  },

  create: {

    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
  },

  createText: {
    color: '#2F80ED',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
  },

  client: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
  },

  clientText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});
