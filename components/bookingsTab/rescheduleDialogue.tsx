import React, { useState } from "react";
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES, FONTS } from "@/config/tabContainer";

const RescheduleDialog = ({ 
  visible, 
  onClose, 
  onConfirm, 
  appointmentDetails 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(false);
    if (mode === 'date') {
      const currentDate = selectedValue || selectedDate;
      setSelectedDate(currentDate);
      setMode('time');
      setShow(true);
    } else {
      const currentTime = selectedValue || selectedTime;
      setSelectedTime(currentTime);
    }
  };

  const showDatepicker = () => {
    setMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    setMode('time');
    setShow(true);
  };

  const handleConfirm = () => {
    // Combine date and time
    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );
    onConfirm(combinedDateTime);
  };

  return (
    <Modal 
      transparent 
      animationType="slide" 
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.iconContainer}>
            <FontAwesome 
              name="calendar-plus" 
              size={50} 
              color={COLORS.success} 
            />
          </View>
          
          <Text style={styles.title}>Reschedule Appointment</Text>
          
          <Text style={styles.subtitle}>
            Rescheduling appointment with{' '}
            <Text style={styles.highlightText}>
              {appointmentDetails?.doctorName}
            </Text>
          </Text>
          
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity 
              style={styles.dateButton} 
              onPress={showDatepicker}
            >
              <FontAwesome name="calendar" size={20} color={COLORS.primary} />
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={showTimepicker}
            >
              <FontAwesome name="clock-o" size={20} color={COLORS.primary} />
              <Text style={styles.timeText}>
                {selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </TouchableOpacity>
          </View>
          
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={mode === 'date' ? selectedDate : selectedTime}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.confirmBtn} 
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RescheduleDialog;

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.6)" 
  },
  dialog: { 
    width: "85%",
    backgroundColor: COLORS.white, 
    borderRadius: 15, 
    padding: 20, 
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.grayDark,
    textAlign: "center",
    marginBottom: 20,
  },
  highlightText: {
    ...FONTS.bold,
    color: COLORS.primary,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight + "20",
    padding: 10,
    borderRadius: 10,
    flex: 0.48,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight + "20",
    padding: 10,
    borderRadius: 10,
    flex: 0.48,
  },
  dateText: {
    marginLeft: 10,
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.primaryDark,
  },
  timeText: {
    marginLeft: 10,
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.primaryDark,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelBtn: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 0.48,
  },
  cancelText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: COLORS.grayDark,
  },
  confirmBtn: {
    backgroundColor: COLORS.success,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 0.48,
  },
  confirmText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});