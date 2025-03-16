import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    backgroundColor: 'transparent',
    marginTop: SPACING.small,
  },
  title: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.small,
    opacity: 0.5,
    width: '30%',
  },
});

export default SectionHeader;