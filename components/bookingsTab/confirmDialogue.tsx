import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "@/config/tabContainer";

const ConfirmDialog = ({ visible, onCancel, onConfirm, appointmentDetails }) => {
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
              name="exclamation-triangle" 
              size={50} 
              color={COLORS.error} 
            />
          </View>
          
          <Text style={styles.title}>Cancel Appointment</Text>
          
          <Text style={styles.message}>
            Are you sure you want to cancel your appointment with{' '}
            <Text style={styles.highlightText}>
              {appointmentDetails?.doctorName}
            </Text>
            {'\n\n'}
            This action cannot be undone.
          </Text>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Keep Appointment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.confirmBtn} 
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: COLORS.error + "20",
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
  message: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.grayDark,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  highlightText: {
    ...FONTS.bold,
    color: COLORS.primary,
  },
  actions: {
    flexDirection: "column",
    width: "100%",
  },
  cancelBtn: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: COLORS.grayDark,
  },
  confirmBtn: {
    backgroundColor: COLORS.error,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});