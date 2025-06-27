import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function ProductCardEditModal({ visible, onClose}) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const clearPrice = () => setPrice('');

  return (
    // <Modal visible={visible} animationType="slide" transparent>
    //   <KeyboardAvoidingView
    //     style={styles.container}
    //     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   >
    //     <View style={styles.modal}>
    //       {/* Header */}
    //       <View style={styles.header}>
    //         <Text style={styles.title}>Ред.-ть товар</Text>
    //         <TouchableOpacity onPress={onClose}>
    //           <Text style={styles.cancel}>Отменить</Text>
    //         </TouchableOpacity>
    //       </View>

    //       {/* Content */}
    //       <View style={styles.content}>
    //         <Text style={styles.label}>Продать за</Text>
    //         <View style={styles.inputRow}>
    //           <TextInput
    //             style={styles.input}
    //             value={price}
    //             onChangeText={setPrice}
    //             keyboardType="numeric"
    //             placeholder="0"
    //           />
    //           {price.length > 0 && (
    //             <TouchableOpacity onPress={clearPrice} style={styles.clearButton}>
    //               <Text style={styles.clearText}>×</Text>
    //             </TouchableOpacity>
    //           )}
    //         </View>

    //         <Text style={styles.label}>Количество</Text>
    //         <View style={styles.counter}>
    //           <TouchableOpacity
    //             onPress={() => setQuantity(q => Math.max(1, q - 1))}
    //             style={styles.counterButton}
    //           >
    //             <Text style={styles.counterText}>−</Text>
    //           </TouchableOpacity>
    //           <Text style={styles.quantity}>{quantity}</Text>
    //           <TouchableOpacity
    //             onPress={() => setQuantity(q => q + 1)}
    //             style={styles.counterButton}
    //           >
    //             <Text style={styles.counterText}>+</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>

    //       {/* Save Button */}
    //       <TouchableOpacity style={styles.saveButton} onPress={onClose}>
    //         <Text style={styles.saveText}>Сохранить</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </KeyboardAvoidingView>
    // </Modal>
    <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Ред.-ть товар
                        </Text>
                        <TouchableOpacity onPress={() => onClose()}>
                            <Text style={styles.headerClose}>
                                Отменить
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.mainContent}>
                              {/* Content */}
                        <View style={styles.content}>
                            <Text style={styles.label1}>Продать за</Text>
                            <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                value={price}
                                onChangeText={setPrice}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                            {price.length > 0 && (
                                <TouchableOpacity onPress={clearPrice} style={styles.clearButton}>
                                <Text style={styles.clearText}>×</Text>
                                </TouchableOpacity>
                            )}
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Text style={styles.label}>Количество</Text>
                              <View style={styles.counter}>
                              <TouchableOpacity
                                  onPress={() => setQuantity(q => Math.max(1, q - 1))}
                                  style={styles.counterButton}
                              >
                                  <Text style={styles.counterText}>−</Text>
                              </TouchableOpacity>
                              <View style={styles.quantityContainer}>
                                <Text style={styles.quantity}>{quantity}</Text>
                              </View>
                              <TouchableOpacity
                                  onPress={() => setQuantity(q => q + 1)}
                                  style={styles.counterButton}
                              >
                                  <Text style={styles.counterText}>+</Text>
                              </TouchableOpacity>
                              </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => onClose()}>
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
//    container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   modal: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//   },
//   header: {
//     paddingTop: 15,
//     paddingBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   cancel: {
//     fontSize: 16,
//     color: '#007AFF',
//   },
  content: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
  },

  label1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    opacity: 0.7
    
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  clearButton: {
    marginLeft: 8,
    padding: 5,
  },
  clearText: {
    fontSize: 20,
    color: '#888',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    fontFamily: 'Roboto'
  },
  counterButton: {
    
  },
  counterText: {
    fontSize: 32,
    color: '#2F80ED',
    fontFamily: 'Roboto'
  },

  quantityContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#2F80ED33',
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },

  quantity: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#2F80ED'
  },
//   saveButton: {
//     marginTop: 12,
//     alignSelf: 'flex-end',
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   saveText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   БАЗОВЫЕ СТИЛИ

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
    //   form: {
    //     gap: 16,
    //     padding: 16,
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 16
    //   },
    //   inputContainer: {

    //   },
    //   inputTitle: {
    //     fontFamily: 'Roboto',
    //     fontSize: 16,
    //     fontWeight: 400,
    //     opacity: 0.7,
    //     color: '#828282',
    //     marginBottom: 4
    //   },
    //   input: {
    //     fontFamily: 'Roboto',
    //     height: 40,
    //     borderWidth: 1,
    //     borderColor: "#BDBDBD",
    //     borderRadius: 8,
    //     padding: 10,
    //     color: '#333333',
    //   },
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
      }
});
