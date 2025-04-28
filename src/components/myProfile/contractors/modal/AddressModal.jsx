import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Image } from "react-native";
import Modal from "react-native-modal";

export default function AddressModal({ visible, onClose }) {
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [address, setAddress] = useState("");


  const daysOfWeek = ["П", "В", "С", "Ч", "П", "С", "В"];
  const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]);

  const toggleDay = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((day) => day !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const formatTimeInput = (text) => {
    const numbers = text.replace(/\D/g, "").slice(0, 4);
    if (numbers.length <= 2) {
      return numbers;
    } else {
      return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
    }
  };

  const handleTimeFromChange = (text) => {
    const formatted = formatTimeInput(text);
    setTimeFrom(formatted);
  };

  const handleTimeToChange = (text) => {
    const formatted = formatTimeInput(text);
    setTimeTo(formatted);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
    >
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Адрес</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Отменить</Text>
            </TouchableOpacity>
          </View>
        
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Контрагент */}
            <View style={styles.anotherBlock}>
                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainInfoBlockLeft}>
                        <Text style={styles.mainInfoBlockTitle}>
                            Контрагент
                        </Text>
                        <Text style={styles.mainInfoBlockText}>
                            Зарипов Айнур Фаизович
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.mainInfoBlockImage}
                            source={require("@assets/images/arrow_right.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            

            {/* Адрес */}
            <View style={styles.block}>
              <Text style={styles.label}>Адрес</Text>
              
                <TextInput
                    style={styles.inputArea}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Введите адрес"
                    multiline
                />
            </View>

            {/* Дни недели */}
            <View style={styles.dataBlock}>
              <Text style={styles.dataLabel}>Дни недели</Text>
              <Text style={styles.dataSubLabel}>Когда можно доставить</Text>
              <View style={styles.daysRow}>
                {daysOfWeek.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.day,
                      selectedDays.includes(index) && styles.daySelected,
                    ]}
                    onPress={() => toggleDay(index)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDays.includes(index) && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Время */}
              <View>
                <Text style={styles.timeTitle}>Время</Text>
                <View style={styles.timeRow}>
                    <TextInput
                    style={styles.timeInput}
                    value={timeFrom}
                    onChangeText={handleTimeFromChange}
                    keyboardType="number-pad"
                    placeholder="00:00"
                    maxLength={5}
                    />
                    <Text style={styles.timeSeparator}>–</Text>
                    <TextInput
                    style={styles.timeInput}
                    value={timeTo}
                    onChangeText={handleTimeToChange}
                    keyboardType="number-pad"
                    placeholder="00:00"
                    maxLength={5}
                    />
                </View>
              </View>
            </View>

            {/* Удалить адрес */}
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteText}>Удалить адрес</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Сохранить */}
          <View style={styles.saveContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={onClose}>
                <Text style={styles.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: '100%',
    // backgroundColor: "#FFFFFF",
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3333330D",
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: "#333333",
    
  },
  cancel: {
    fontSize: 16,
    color: "#2F80ED",
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#E0E0E0'
  },


//   КОНТРАГЕНТ
mainInfoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
mainInfoBlockLeft: {},
mainInfoBlockTitle: {
    fontStyle: 'Roboto',
    fontSize: 16,
    color: "#333333",
    marginBottom: 4,
    fontWeight: "600"
},
mainInfoBlockText: {
    fontStyle: "Roboto",
    fontSize: 16,
    color: "#333333",
    opacity: 0.7,
},
mainInfoBlockImage: {
    width: 32,
    height: 32,
},
mainInfoBlockBorder: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16,
},
anotherBlock: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 4,
},
// ADDRESS
  block: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 4
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#828282",
    fontFamily: 'Roboto',
    marginBottom: 4,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#333333',
    fontSize: 16,
    maxHeight: 72
  },


// ДАТА

    dataBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 4
    },

    dataLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#333333",
        fontFamily: 'Roboto',
      },
    
      dataSubLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#828282",
        fontFamily: 'Roboto',
        marginBottom: 16,
      },
  inputButton: {
    backgroundColor: "#2F80ED1A",
    borderRadius: 12,
    padding: 16,
  },
  inputButtonText: {
    fontSize: 14,
    color: "#2F80ED",
  },
  
  inputText: {
    fontSize: 14,
    color: "#333333",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#3333330D",
    justifyContent: "center",
    alignItems: "center",
  },
  daySelected: {
    backgroundColor: "#2F80ED1A",
  },
  dayText: {
    color: "#333333B2",
    fontWeight: "600",
    fontStyle: 'Roboto',
    fontSize: 16,
  },
  dayTextSelected: {
    color: "#2F80ED",
  },

//   Время

  timeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#828282",
    fontFamily: 'Roboto',
    marginBottom: 4,
  },


  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeInput: {
    width: '45%',
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    textAlign: 'center',
    fontSize: 16,
    color: "#333333",
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  timeSeparator: {
    marginHorizontal: 8,
    fontSize: 18,
    color: "#333333",
  },

//   Удалить
  deleteButton: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16
  },
  deleteText: {
    fontSize: 16,
    color: "#2F80ED",
    fontWeight: 'Roboto',
    fontWeight: "600",
    marginVertical: 8
  },

//   SAVE

  saveContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'flex-end'
  },

  saveButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontFamily: 'Roboto'
  },
});
