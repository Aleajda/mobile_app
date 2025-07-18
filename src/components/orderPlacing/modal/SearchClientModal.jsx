import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, ActivityIndicator } from 'react-native';
import BasketApi from '../../../api/BasketApi';

const SearchClientModal = ({ visible, onClose, onSelectClient }) => {
  const [searchValue, setSearchValue] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Фиксированные клиенты
  const fixedClients = [
    { id: -1, name: 'Себе на склад', company_id: -1 },
    { id: 471, name: 'Розничный клиент', company_id: 471 }
  ];

  useEffect(() => {
    if (visible) {
      loadClients();
    }
  }, [visible, page]);

  useEffect(() => {
    if (visible) {
      setPage(1);
      const delaySearch = setTimeout(() => {
        loadClients();
      }, 500);
      return () => clearTimeout(delaySearch);
    }
  }, [searchValue, visible]);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await BasketApi.searchClients(searchValue, page);
      
      if (response && response.status === "ok" && response.clients) {
        // Преобразуем данные клиентов для соответствия нашему формату
        const formattedClients = response.clients.map(client => ({
          id: client.id,
          name: client.name,
          company_id: client.id,
          phone: client.mphone,
          email: client.email
        }));
        
        if (page === 1) {
          setClients(formattedClients);
        } else {
          setClients(prevClients => [...prevClients, ...formattedClients]);
        }
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setSearchValue('');
  };

  const handleSelectClient = (client) => {
    onSelectClient(client);
    onClose();
  };

  const loadMoreClients = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Объединяем фиксированные клиенты с результатами поиска
  const allClients = page === 1 ? [...fixedClients, ...clients] : clients;

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
        <ScrollView 
          contentContainerStyle={styles.main}
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
            if (isCloseToBottom && !loading && clients.length > 0) {
              loadMoreClients();
            }
          }}
          scrollEventThrottle={400}
        >
          <TouchableOpacity style={styles.create}>
            <Text style={styles.createText}>Создать клиента</Text>
          </TouchableOpacity>

          {allClients.map((client) => (
            <TouchableOpacity 
              key={client.id} 
              style={styles.client}
              onPress={() => handleSelectClient(client)}
            >
              <Text style={styles.clientText}>{client.name}</Text>
              {client.phone && <Text style={styles.clientSubText}>{client.phone}</Text>}
            </TouchableOpacity>
          ))}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#2F80ED" />
            </View>
          )}
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
  clientSubText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#828282',
    marginTop: 4,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
});
