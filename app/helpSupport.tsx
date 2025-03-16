import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';
import SettingsItem from '@/components/settings/SettingsItem';

const HelpSupport = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <SettingsItem
          icon={<Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.secondary} />}
          title="Contact Support"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="help-circle-outline" size={24} color={COLORS.secondary} />}
          title="FAQs"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="book-outline" size={24} color={COLORS.secondary} />}
          title="User Guide"
          onPress={() => {}}
        />
        
        <SettingsItem
          icon={<Ionicons name="bug-outline" size={24} color={COLORS.secondary} />}
          title="Report a Problem"
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

export default HelpSupport;