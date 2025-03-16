import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SIZES } from '@/config/tabContainer';

const SettingsItem = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  rightComponent,
  titleColor
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleColor && { color: titleColor }]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={styles.rightSection}>
        {rightComponent ? (
          rightComponent
        ) : (
          <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    marginHorizontal: SPACING.small,
    borderRadius: 12, // Added border radius for items
    marginBottom: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: SPACING.medium,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.medium,
    color: COLORS.black,
    fontSize: 15,
  },
  subtitle: {
    ...FONTS.regular,
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 2,
    opacity: 0.8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsItem;