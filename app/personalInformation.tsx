import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';

const PersonalInformation = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>John Doe</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>johndoe@example.com</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>January 1, 1980</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>123 Main Street, Anytown, USA</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: SPACING.small,
  },
  headerTitle: {
    ...FONTS.bold,
    marginLeft: SPACING.medium,
    color: COLORS.black,
  },
  scrollContainer: {
    flex: 1,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    margin: SPACING.medium,
    borderRadius: 8,
  },
  infoItem: {
    marginBottom: SPACING.medium,
  },
  infoLabel: {
    ...FONTS.regular,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  infoValue: {
    ...FONTS.regular,
    color: COLORS.black,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: 8,
    margin: SPACING.medium,
    alignItems: 'center',
  },
  editButtonText: {
    ...FONTS.regular,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default PersonalInformation;