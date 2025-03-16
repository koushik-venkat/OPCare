import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';
import SettingsItem from '@/components/settings/SettingsItem';

const PasswordSecurity = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password & Security</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <SettingsItem
          icon={<Ionicons name="lock-closed-outline" size={24} color={COLORS.secondary} />}
          title="Change Password"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="shield-checkmark-outline" size={24} color={COLORS.secondary} />}
          title="Two-Factor Authentication"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="finger-print-outline" size={24} color={COLORS.secondary} />}
          title="Biometric Login"
          onPress={() => {}}
          rightComponent={
            <Switch
              value={true}
              trackColor={{ false: COLORS.gray, true: COLORS.primaryLight }}
              thumbColor={true ? COLORS.primary : COLORS.white}
            />
          }
        />
        
        <SettingsItem
          icon={<Ionicons name="alert-circle-outline" size={24} color={COLORS.secondary} />}
          title="Account Activity"
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

export default PasswordSecurity;