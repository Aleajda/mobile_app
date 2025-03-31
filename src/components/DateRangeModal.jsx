import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DateRangeModal = ({ visible, onClose, selectedRange, setSelectedRange }) => {
    const [markedDates, setMarkedDates] = useState({});

    const handleDayPress = (day) => {
      if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
        setSelectedRange({ startDate: day.dateString, endDate: null });
        setMarkedDates({
          [day.dateString]: { startingDay: true, endingDay: true, color: '#3D85F7', textColor: 'white' }
        });
      } else {
        const start = new Date(selectedRange.startDate);
        const end = new Date(day.dateString);
        let finalStart = start, finalEnd = end;
        if (start > end) {
          finalStart = end;
          finalEnd = start;
        }
        setSelectedRange({ startDate: finalStart.toISOString().split('T')[0], endDate: finalEnd.toISOString().split('T')[0] });
        const updatedMarkedDates = {};
        let currentDate = new Date(finalStart);
        while (currentDate <= finalEnd) {
          const dateString = currentDate.toISOString().split('T')[0];
          updatedMarkedDates[dateString] = {
            color: '#3D85F7', textColor: 'white'
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
        updatedMarkedDates[finalStart.toISOString().split('T')[0]] = { startingDay: true, color: '#3D85F7', textColor: 'white' };
        updatedMarkedDates[finalEnd.toISOString().split('T')[0]] = { endingDay: true, color: '#3D85F7', textColor: 'white' };
        setMarkedDates(updatedMarkedDates);
      }
    };

  return (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Выбрать даты</Text>
              <TouchableOpacity onPress={() => onClose()}>
                <Text style={styles.modalCancel}>Отменить</Text>
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              markingType={'period'}
            />
            <TouchableOpacity style={styles.applyButton} onPress={() => onClose()}>
              <Text style={styles.applyButtonText}>Применить</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      modalCancel: {
        fontSize: 16,
        color: '#3D85F7',
      },
      applyButton: {
        marginTop: 10,
        backgroundColor: '#3D85F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default DateRangeModal;