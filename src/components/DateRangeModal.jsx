import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar, Platform, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const DateRangeModal = ({ visible, onClose, selectedRange, setSelectedRange }) => {
    const [markedDates, setMarkedDates] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoverDate, setHoverDate] = useState(null);
    const [visibleMonths, setVisibleMonths] = useState([]);
    
    // Инициализация видимых месяцев при открытии модального окна
    useEffect(() => {
      if (visible) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        
        // Создаем массив из 3 месяцев для отображения
        setVisibleMonths([
          { month: currentMonth, year: currentYear },
          { month: (currentMonth + 1) % 12, year: currentMonth + 1 >= 12 ? currentYear + 1 : currentYear },
          { month: (currentMonth + 2) % 12, year: currentMonth + 2 >= 12 ? currentYear + 1 : currentYear }
        ]);
      }
    }, [visible]);
    
    // Названия месяцев
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    // Названия дней недели
    const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

    // Обновляем markedDates при изменении selectedRange или открытии модального окна
    useEffect(() => {
      if (visible && selectedRange.startDate && selectedRange.endDate) {
        updateMarkedDates(selectedRange.startDate, selectedRange.endDate);
      } else if (visible && selectedRange.startDate && hoverDate) {
        updateMarkedDates(selectedRange.startDate, hoverDate);
      } else if (visible && selectedRange.startDate) {
        setMarkedDates({
          [selectedRange.startDate]: { 
            startingDay: true, 
            endingDay: true,
            selected: true,
            color: '#2F80ED' 
          }
        });
      } else if (visible) {
        setMarkedDates({});
      }
    }, [visible, selectedRange, hoverDate]);

    // Функция для обновления отмеченных дат
    const updateMarkedDates = (startDateStr, endDateStr) => {
      const start = new Date(startDateStr);
      const end = new Date(endDateStr);
      
      // Сортируем даты, чтобы startDate всегда была раньше endDate
      let finalStart = start, finalEnd = end;
      if (start > end) {
        finalStart = end;
        finalEnd = start;
      }
      
      const startStr = finalStart.toISOString().split('T')[0];
      const endStr = finalEnd.toISOString().split('T')[0];
      
      const updatedMarkedDates = {};
      let current = new Date(finalStart);
      while (current <= finalEnd) {
        const dateStr = current.toISOString().split('T')[0];
        updatedMarkedDates[dateStr] = {
          selected: true,
          color: '#2F80ED'
        };
        current.setDate(current.getDate() + 1);
      }
      
      updatedMarkedDates[startStr] = { 
        startingDay: true, 
        selected: true,
        color: '#2F80ED'
      };
      
      updatedMarkedDates[endStr] = { 
        endingDay: true, 
        selected: true,
        color: '#2F80ED'
      };
      
      setMarkedDates(updatedMarkedDates);
    };

    // Функция для получения количества дней в месяце
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    // Функция для получения первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
    const getFirstDayOfMonth = (year, month) => {
      const day = new Date(year, month, 1).getDay();
      // Преобразуем, чтобы понедельник был 0, а воскресенье - 6
      return day === 0 ? 6 : day - 1;
    };

    // Функция для проверки, является ли дата сегодняшней
    const isToday = (year, month, day) => {
      const today = new Date();
      return (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
    };

    // Функция для проверки, выбрана ли дата
    const isDateSelected = (dateString) => {
      return dateString in markedDates;
    };

    // Функция для проверки, является ли дата началом выбранного диапазона
    const isStartDate = (dateString) => {
      return markedDates[dateString]?.startingDay;
    };

    // Функция для проверки, является ли дата концом выбранного диапазона
    const isEndDate = (dateString) => {
      return markedDates[dateString]?.endingDay;
    };

    // Функция для переключения на предыдущий месяц
    const showPreviousMonth = () => {
      if (visibleMonths.length > 0) {
        const firstMonth = visibleMonths[0];
        const prevMonth = firstMonth.month === 0 ? 11 : firstMonth.month - 1;
        const prevYear = firstMonth.month === 0 ? firstMonth.year - 1 : firstMonth.year;
        
        setVisibleMonths([
          { month: prevMonth, year: prevYear },
          ...visibleMonths.slice(0, 2)
        ]);
      }
    };

    // Функция для переключения на следующий месяц
    const showNextMonth = () => {
      if (visibleMonths.length > 0) {
        const lastMonth = visibleMonths[visibleMonths.length - 1];
        const nextMonth = lastMonth.month === 11 ? 0 : lastMonth.month + 1;
        const nextYear = lastMonth.month === 11 ? lastMonth.year + 1 : lastMonth.year;
        
        setVisibleMonths([
          ...visibleMonths.slice(1),
          { month: nextMonth, year: nextYear }
        ]);
      }
    };

    // Обработка нажатия на день
    const handleDayPress = (dateString) => {
      if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
        // Начинаем новый выбор
        setSelectedRange({ startDate: dateString, endDate: null });
        setHoverDate(null);
        setMarkedDates({
          [dateString]: { 
            startingDay: true, 
            endingDay: true, 
            selected: true, 
            color: '#2F80ED' 
          }
        });
      } else {
        // Завершаем выбор диапазона
        setSelectedRange({ 
          startDate: selectedRange.startDate, 
          endDate: dateString 
        });
        setHoverDate(null);
        updateMarkedDates(selectedRange.startDate, dateString);
      }
    };

    // Обработка наведения на день (для предпросмотра выбора)
    const handleDayHover = (dateString) => {
      if (selectedRange.startDate && !selectedRange.endDate) {
        setHoverDate(dateString);
      }
    };

    // Сбросить выбор дат
    const handleReset = () => {
      setSelectedRange({ startDate: null, endDate: null });
      setHoverDate(null);
      setMarkedDates({});
    };

    // Форматирование даты для отображения
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return `${date.getDate()} ${monthNames[date.getMonth()].toLowerCase()} ${date.getFullYear()}`;
    };

    // Получение строки с выбранным периодом
    const getSelectedPeriodText = () => {
      if (selectedRange.startDate && selectedRange.endDate) {
        return `${formatDate(selectedRange.startDate)} - ${formatDate(selectedRange.endDate)}`;
      } else if (selectedRange.startDate) {
        return formatDate(selectedRange.startDate);
      }
      return '';
    };

    // Быстрый выбор периодов
    const selectPredefinedPeriod = (days) => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      setSelectedRange({ startDate: startDateStr, endDate: endDateStr });
      updateMarkedDates(startDateStr, endDateStr);
      
      // Прокручиваем к месяцу, содержащему начальную дату
      const startMonth = startDate.getMonth();
      const startYear = startDate.getFullYear();
      
      setVisibleMonths([
        { month: startMonth, year: startYear },
        { month: (startMonth + 1) % 12, year: startMonth + 1 >= 12 ? startYear + 1 : startYear },
        { month: (startMonth + 2) % 12, year: startMonth + 2 >= 12 ? startYear + 1 : startYear }
      ]);
    };

    // Рендер календаря для конкретного месяца
    const renderCalendar = ({ month, year }, index) => {
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);
      const days = [];
      
      // Добавляем пустые ячейки для выравнивания
      for (let i = 0; i < firstDay; i++) {
        days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
      }
      
      // Добавляем дни месяца
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        const isSelectedDate = isDateSelected(dateString);
        const isStartOfRange = isStartDate(dateString);
        const isEndOfRange = isEndDate(dateString);
        const isTodayDate = isToday(year, month, day);
        
        // Определяем, находится ли день в прошлом месяце
        const isPastDay = new Date() > date;
        
        // Проверяем, является ли дата промежуточной в диапазоне
        const isMiddleDay = isSelectedDate && !isStartOfRange && !isEndOfRange;
        
        days.push(
          <TouchableOpacity
            key={dateString}
            style={[
              styles.dayCell,
              isSelectedDate && styles.selectedDay,
              isStartOfRange && styles.startDay,
              isEndOfRange && styles.endDay,
              isMiddleDay && styles.middleDay,
              isTodayDate && styles.todayCell
            ]}
            onPress={() => handleDayPress(dateString)}
            onPressIn={() => handleDayHover(dateString)}
            activeOpacity={0.7}
          >
            {isTodayDate && (
              <View style={styles.todayIndicatorContainer}>
                <View style={styles.todayIndicatorTop} />
                <View style={styles.todayIndicatorBottom} />
              </View>
            )}
            <Text style={[
              styles.dayText,
              isSelectedDate && styles.selectedDayText,
              isTodayDate && styles.todayText,
              !isSelectedDate && !isTodayDate && { opacity: isPastDay ? 1 : 0.3 }
            ]}>
              {day}
            </Text>
            {isTodayDate && <View style={styles.activationIndicator} />}
          </TouchableOpacity>
        );
      }

      // Добавляем пустые ячейки в конце для выравнивания сетки
      const totalCells = days.length;
      const rowsNeeded = Math.ceil(totalCells / 7);
      const totalCellsNeeded = rowsNeeded * 7;
      const emptyCellsNeeded = totalCellsNeeded - totalCells;
      
      for (let i = 0; i < emptyCellsNeeded; i++) {
        days.push(<View key={`empty-end-${i}`} style={styles.dayCell} />);
      }

      return (
        <View key={`calendar-${index}`} style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <View style={styles.monthNavigationContainer}>
              {index === 0 && (
                <TouchableOpacity style={styles.monthNavButton} onPress={showPreviousMonth}>
                  <Text style={styles.monthNavButtonText}>{'‹'}</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.monthTitle}>{monthNames[month]} {year}</Text>
              {index === visibleMonths.length - 1 && (
                <TouchableOpacity style={styles.monthNavButton} onPress={showNextMonth}>
                  <Text style={styles.monthNavButtonText}>{'›'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.weekDaysRow}>
            {weekDays.map((day, index) => (
              <View key={`weekday-${index}`} style={styles.weekDayCell}>
                <Text style={styles.weekDayText}>{day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.daysContainer}>
            {days}
          </View>
        </View>
      );
    };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Выбрать даты</Text>
              <TouchableOpacity onPress={() => onClose()} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <Text style={styles.modalCancel}>Отменить</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            
            {selectedRange.startDate && (
              <View style={styles.selectedPeriodContainer}>
                <Text style={styles.selectedPeriodText}>{getSelectedPeriodText()}</Text>
              </View>
            )}
            
            <View style={styles.quickSelectContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity 
                  style={styles.quickSelectButton} 
                  onPress={() => selectPredefinedPeriod(7)}
                >
                  <Text style={styles.quickSelectText}>Неделя</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickSelectButton} 
                  onPress={() => selectPredefinedPeriod(30)}
                >
                  <Text style={styles.quickSelectText}>Месяц</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickSelectButton} 
                  onPress={() => selectPredefinedPeriod(90)}
                >
                  <Text style={styles.quickSelectText}>3 месяца</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickSelectButton} 
                  onPress={() => selectPredefinedPeriod(365)}
                >
                  <Text style={styles.quickSelectText}>Год</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            
            <View style={styles.scrollContainer}>
              <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.calendarList}
              >
                {visibleMonths.map(renderCalendar)}
              </ScrollView>
              <View style={styles.scrollbarContainer}>
                <View style={styles.scrollbar} />
              </View>
            </View>
            
            <View style={styles.footer}>
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(224, 224, 224, 1)',
    },
    modalContent: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: '#fff',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 16,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      zIndex: 10,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '500',
      fontFamily: 'Roboto',
      color: '#333333',
    },
    modalCancel: {
      fontSize: 16,
      fontWeight: '500',
      color: '#2F80ED',
      fontFamily: 'Roboto',
    },
    divider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      width: '100%',
    },
    selectedPeriodContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: 'rgba(47, 128, 237, 0.1)',
    },
    selectedPeriodText: {
      fontSize: 14,
      fontFamily: 'Roboto',
      color: '#2F80ED',
      fontWeight: '500',
    },
    quickSelectContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: 'row',
    },
    quickSelectButton: {
      backgroundColor: '#F2F2F2',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickSelectText: {
      fontSize: 14,
      fontFamily: 'Roboto',
      color: '#333333',
      fontWeight: '500',
    },
    scrollContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    scrollView: {
      flex: 1,
    },
    scrollbarContainer: {
      width: 8,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 2,
    },
    scrollbar: {
      width: 4,
      height: 67,
      backgroundColor: '#BDBDBD',
      borderRadius: 2,
    },
    calendarList: {
      padding: 16,
      paddingBottom: 64,
    },
    calendarContainer: {
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    monthHeader: {
      paddingVertical: 4,
      marginBottom: 16,
    },
    monthNavigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    monthNavButton: {
      padding: 0,
      borderRadius: 20,
      backgroundColor: 'rgba(47, 128, 237, 0.1)',
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },
    monthNavButtonText: {
      fontSize: 24,
      color: '#2F80ED',
      fontWeight: '500',
      textAlign: 'center',
      lineHeight: 28,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    monthTitle: {
      fontSize: 24,
      fontWeight: '500',
      color: '#333333',
      fontFamily: 'Roboto',
    },
    weekDaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    weekDayCell: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekDayText: {
      fontSize: 12,
      fontWeight: '500',
      color: 'rgba(51, 51, 51, 0.3)',
      fontFamily: 'Roboto',
    },
    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      marginVertical: 4,
    },
    dayText: {
      fontSize: 16,
      fontFamily: 'Roboto',
      color: '#333333',
      zIndex: 2,
    },
    selectedDay: {
      backgroundColor: '#2F80ED',
    },
    selectedDayText: {
      color: '#FFFFFF',
      fontWeight: '500',
    },
    startDay: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    endDay: {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    middleDay: {
      borderRadius: 0,
    },
    todayCell: {
      position: 'relative',
    },
    todayText: {
      fontWeight: '500',
      color: '#FFFFFF',
    },
    todayIndicatorContainer: {
      position: 'absolute',
      top: 5,
      justifyContent: 'space-between',
      height: 32,
      zIndex: 1,
      alignItems: 'center',
    },
    todayIndicatorTop: {
      width: 12,
      height: 3,
      backgroundColor: '#2F80ED',
      borderRadius: 0,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    todayIndicatorBottom: {
      width: 12,
      height: 3,
      backgroundColor: '#FFFFFF',
      borderRadius: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    activationIndicator: {
      position: 'absolute',
      top: 5,
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: '#2F80ED',
      zIndex: 0,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    resetButton: {
      backgroundColor: '#F2F2F2',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      minWidth: 100,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
    resetButtonText: {
      color: '#333333',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Roboto',
    },
    applyButton: {
      backgroundColor: '#2F80ED',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      minWidth: 100,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
    applyButtonDisabled: {
      opacity: 0.5,
    },
    applyButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Roboto',
    },
});

export default DateRangeModal;