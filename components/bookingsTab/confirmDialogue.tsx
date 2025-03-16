import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "@/config/tabContainer";

const ConfirmDialog = ({
  visible,
  onCancel,
  onConfirm,
  appointmentDetails,
}) => {
  const scaleValue = new Animated.Value(0.8);
  console.log('appointmentDetails', appointmentDetails)

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.dialog, { transform: [{ scale: scaleValue }] }]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome
              name="exclamation-triangle"
              size={50}
              color={COLORS.error}
            />
          </View>

          <Text style={styles.title}>Cancel Appointment</Text>

          <Text style={styles.message}>
            Are you sure you want to cancel your appointment with{" "}
            <Text style={styles.highlightText}>
              {appointmentDetails?.doctorName}
            </Text>
            {"\n\n"}
            This action cannot be undone.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Keep Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 20,
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
      backgroundColor: COLORS.error + "15", // Lighter tint
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    title: {
      ...FONTS.bold,
      fontSize: SIZES.large, // Slightly bigger but not overwhelming
      color: COLORS.error,
      marginBottom: 8,
      textAlign: "center",
    },
    message: {
      ...FONTS.regular,
      fontSize: SIZES.medium, // Slight increase for better readability
      color: COLORS.grayDark,
      textAlign: "center",
      marginBottom: 18,
      lineHeight: 24, // Improved readability
      fontWeight: "500",
    },
    highlightText: {
      ...FONTS.bold,
      color: COLORS.primary,
      fontSize: SIZES.medium,
    },
    actions: {
      flexDirection: "column",
      width: "100%",
    },
    cancelBtn: {
      borderWidth: 1,
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary + "10", // Transparent with light tint
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    cancelText: {
      ...FONTS.bold,
      fontSize: SIZES.small,
      color: COLORS.primary,
    },
    confirmBtn: {
      borderWidth: 1,
      borderColor: COLORS.error,
      backgroundColor: COLORS.error + "10", // Transparent with light tint
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    confirmText: {
      ...FONTS.bold,
      fontSize: SIZES.small,
      color: COLORS.error,
    },
  });
  
  
