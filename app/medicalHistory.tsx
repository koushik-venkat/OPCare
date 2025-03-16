import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';
import SettingsItem from '@/components/settings/SettingsItem';

const MedicalHistory = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <SettingsItem
          icon={<Ionicons name="document-outline" size={24} color={COLORS.secondary} />}
          title="Medical Records"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="fitness-outline" size={24} color={COLORS.secondary} />}
          title="Health Metrics"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="medical-outline" size={24} color={COLORS.secondary} />}
          title="Allergies & Conditions"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="calendar-outline" size={24} color={COLORS.secondary} />}
          title="Appointment History"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="pulse-outline" size={24} color={COLORS.secondary} />}
          title="Vitals History"
          onPress={() => {}}
        />
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
});

export default MedicalHistory;