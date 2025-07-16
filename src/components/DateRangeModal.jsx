import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DateRangeModal = ({ visible, onClose, selectedRange, setSelectedRange }) => {
    const [markedDates, setMarkedDates] = useState({});

    // Обновляем markedDates при изменении selectedRange или открытии модального окна
    useEffect(() => {
      if (visible && selectedRange.startDate && selectedRange.endDate) {
        const updatedMarkedDates = {};
        let currentDate = new Date(selectedRange.startDate);
        const endDate = new Date(selectedRange.endDate);
        
        while (currentDate <= endDate) {
          const dateString = currentDate.toISOString().split('T')[0];
          updatedMarkedDates[dateString] = {
            color: '#3D85F7', textColor: 'white'
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        updatedMarkedDates[selectedRange.startDate] = { 
          startingDay: true, color: '#3D85F7', textColor: 'white' 
        };
        updatedMarkedDates[selectedRange.endDate] = { 
          endingDay: true, color: '#3D85F7', textColor: 'white' 
        };
        
        setMarkedDates(updatedMarkedDates);
      } else if (visible) {
        setMarkedDates({});
      }
    }, [visible, selectedRange]);

    const handleDayPress = (day) => {
      if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
        // Начинаем новый выбор
        setSelectedRange({ startDate: day.dateString, endDate: null });
        setMarkedDates({
          [day.dateString]: { startingDay: true, endingDay: true, color: '#3D85F7', textColor: 'white' }
        });
      } else {
        // Завершаем выбор диапазона
        const start = new Date(selectedRange.startDate);
        const end = new Date(day.dateString);
        
        // Сортируем даты, чтобы startDate всегда была раньше endDate
        let finalStart = start, finalEnd = end;
        if (start > end) {
          finalStart = end;
          finalEnd = start;
        }
        
        const startDateStr = finalStart.toISOString().split('T')[0];
        const endDateStr = finalEnd.toISOString().split('T')[0];
        
        setSelectedRange({ startDate: startDateStr, endDate: endDateStr });
        
        // Обновляем отмеченные даты
        const updatedMarkedDates = {};
        let currentDate = new Date(finalStart);
        while (currentDate <= finalEnd) {
          const dateString = currentDate.toISOString().split('T')[0];
          updatedMarkedDates[dateString] = {
            color: '#3D85F7', textColor: 'white'
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        updatedMarkedDates[startDateStr] = { 
          startingDay: true, color: '#3D85F7', textColor: 'white' 
        };
        updatedMarkedDates[endDateStr] = { 
          endingDay: true, color: '#3D85F7', textColor: 'white' 
        };
        
        setMarkedDates(updatedMarkedDates);
      }
    };

    // Сбросить выбор дат
    const handleReset = () => {
      setSelectedRange({ startDate: null, endDate: null });
      setMarkedDates({});
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
              theme={{
                todayTextColor: '#3D85F7',
                arrowColor: '#3D85F7',
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Сбросить</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.applyButton, 
                  (!selectedRange.startDate || !selectedRange.endDate) && styles.applyButtonDisabled
                ]} 
                onPress={() => onClose()}
                disabled={!selectedRange.startDate || !selectedRange.endDate}
              >
                <Text style={styles.applyButtonText}>Применить</Text>
              </TouchableOpacity>
            </View>
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
        fontFamily: 'Roboto',
      },
      modalCancel: {
        fontSize: 16,
        color: '#3D85F7',
        fontFamily: 'Roboto',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
      },
      resetButton: {
        backgroundColor: '#F2F2F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      resetButtonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
      applyButton: {
        backgroundColor: '#3D85F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      applyButtonDisabled: {
        backgroundColor: '#3D85F7',
        opacity: 0.5,
      },
      applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
});

export default DateRangeModal;