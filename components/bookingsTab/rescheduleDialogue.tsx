import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "@/config/tabContainer";
import { 
  Portal, 
  Provider as PaperProvider,
} from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

// Get screen width to calculate dialog width
const screenWidth = Dimensions.get('window').width;

const RescheduleModal = ({
  appointmentId,
  doctorName,
  onClose,
  onCancel,
  onConfirm,
}) => {
  const scaleValue = new Animated.Value(0.8);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleConfirm = () => {
    // Combine date and time
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(time.getHours());
    scheduledDateTime.setMinutes(time.getMinutes());
    
    // Call onConfirm with the appointment ID and new date/time
    onConfirm(appointmentId, scheduledDateTime.toISOString());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const onDismissSingle = () => {
    setShowDatePicker(false);
  };

  const onConfirmSingle = (params) => {
    setShowDatePicker(false);
    setDate(params.date);
  };

  const onDismissTime = () => {
    setShowTimePicker(false);
  };

  const onConfirmTime = ({ hours, minutes }) => {
    setShowTimePicker(false);
    const newTime = new Date();
    newTime.setHours(hours);
    // If minutes aren't specifically selected, default to 0
    newTime.setMinutes(minutes || 0);
    setTime(newTime);
  };

  // Custom time picker callback that auto-confirms after hour selection
  const onSelectHour = (hour) => {
    // Automatically confirm the time when an hour is selected
    // This will use 0 for minutes if minutes aren't selected
    onConfirmTime({ hours: hour, minutes: 0 });
  };

  // Create a properly configured theme for Paper components
  const paperTheme = {
    colors: {
      primary: COLORS.primary,
      onBackground: COLORS.black,
      surface: COLORS.white,
      onSurface: COLORS.black,
      text: COLORS.black,
      disabled: COLORS.grayLight,
      placeholder: COLORS.grayDark,
      backdrop: 'rgba(0,0,0,0.6)',
      background: COLORS.white,
      error: COLORS.error,
    },
    // In react-native-paper, fonts must include these specific variants
    fonts: configureFonts({
      config: {
        regular: {
          fontFamily: 'System',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'System',
          fontWeight: '500',
        },
        bold: {
          fontFamily: 'System', 
          fontWeight: 'bold',
        },
      }
    })
  };

  // Function to safely configure fonts that matches Paper's requirements
  function configureFonts({ config }) {
    return {
      regular: config.regular,
      medium: config.medium,
      bold: config.bold,
      // This prevents the error by providing all required variants
      titleLarge: config.bold,
      titleMedium: config.bold,
      titleSmall: config.medium,
      labelLarge: config.medium,
      labelMedium: config.medium,
      labelSmall: config.regular,
      bodyLarge: config.regular,
      bodyMedium: config.regular,
      bodySmall: config.regular,
      headlineLarge: config.bold,
      headlineMedium: config.bold,
      headlineSmall: config.bold,
    };
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={true}
      statusBarTranslucent
    >
      <PaperProvider theme={paperTheme}>
        <Portal>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={showDatePicker}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            validRange={{
              startDate: new Date(), // Today
            }}
            saveLabel="Confirm"
            label="Select date"
            theme={{
              colors: {
                primary: COLORS.primary,
                onPrimary: COLORS.white,
                onSurface: COLORS.black,
                onSurfaceVariant: COLORS.grayDark,
              }
            }}
          />
          <TimePickerModal
            visible={showTimePicker}
            onDismiss={onDismissTime}
            onConfirm={onConfirmTime}
            hours={time.getHours()}
            minutes={time.getMinutes()}
            use24HourClock={false}
            label="Select time"
            cancelLabel="Cancel"
            confirmLabel="Confirm"
            animationType="fade"
            locale="en-US"
            autoConfirmOnHourSelect={true} // Add this prop if available in your react-native-paper-dates version
            onChangeHours={onSelectHour} // Custom handler to auto-confirm after hour selection
            theme={{
              colors: {
                primary: COLORS.primary,
                onPrimary: COLORS.white,
                onSurface: COLORS.black,
                onSurfaceVariant: COLORS.grayDark,
                surfaceVariant: COLORS.neutralLight,
              }
            }}
          />
        </Portal>

        <View style={styles.overlay}>
          <Animated.View
            style={[styles.dialog, { transform: [{ scale: scaleValue }] }]}
          >
            <View style={styles.iconContainer}>
              <FontAwesome
                name="calendar"
                size={50}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.title}>Reschedule Appointment</Text>

            <Text style={styles.message}>
              Select a new date and time for your appointment with{' '}
              <Text style={styles.highlightText}>Dr. {doctorName}</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
                <FontAwesome name="calendar" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
                <FontAwesome name="clock-o" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Confirm Reschedule</Text>
              </TouchableOpacity>
              
              <View style={styles.buttonGap} />
              
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </Animated.View>
        </View>
      </PaperProvider>
    </Modal>
  );
};

export default RescheduleModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 20,
  },
  dialog: {
    width: screenWidth * 0.9, // Using 90% of screen width instead of fixed 85%
    maxWidth: 500, // Adding a max width for tablets/larger screens
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 24, // Increased padding for a more spacious feel
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 90, // Slightly larger icon container
    height: 90, 
    borderRadius: 45,
    backgroundColor: COLORS.primary + "15", // Lighter tint
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    ...FONTS.bold, // Using bold font as defined in your FONTS object
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    ...FONTS.regular, // Using regular font as defined in your FONTS object
    fontSize: SIZES.medium,
    color: COLORS.grayDark,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26, // Increased line height for better readability
  },
  highlightText: {
    ...FONTS.bold, // Using bold font as defined in your FONTS object
    color: COLORS.primary,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    ...FONTS.regular, // Using regular font as defined in your FONTS object
    color: COLORS.grayDark,
    marginBottom: 8,
    fontWeight: "500", // Adding medium weight as a property
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grayLight || COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14, // Taller input fields
    backgroundColor: COLORS.white,
  },
  dateTimeText: {
    ...FONTS.regular, // Using regular font as defined in your FONTS object
    color: COLORS.black,
  },
  actions: {
    flexDirection: "column",
    width: "100%",
    marginTop: 16,
  },
  buttonGap: {
    height: 16, // Adding explicit gap between buttons
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)', // Transparent red border
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Transparent tint of red
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: 'rgb(180, 0, 0)', // Darker red for text
  },
  confirmBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 128, 0, 0.3)', // Transparent green border
    backgroundColor: 'rgba(0, 128, 0, 0.1)', // Transparent tint of green
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: 'rgb(0, 100, 0)', // Darker green for text
  },
});