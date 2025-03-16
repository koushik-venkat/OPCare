import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/config/tabContainer';

const FamilyProfiles = () => {
  const navigation = useNavigation();
  
  const familyMembers = [
    { id: 1, name: "Sarah Doe", relation: "Spouse" },
    { id: 2, name: "Tommy Doe", relation: "Child" }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Profiles</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {familyMembers.map(member => (
          <View key={member.id} style={styles.familyMemberItem}>
            <View style={styles.familyMemberInfo}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                style={styles.familyMemberImage}
              />
              <View>
                <Text style={styles.familyMemberName}>{member.name}</Text>
                <Text style={styles.familyMemberRelation}>{member.relation}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addFamilyMemberButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
          <Text style={styles.addFamilyMemberButtonText}>Add Family Member</Text>
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
  familyMemberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  familyMemberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  familyMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    marginRight: SPACING.medium,
  },
  familyMemberName: {
    ...FONTS.bold,
    color: COLORS.black,
  },
  familyMemberRelation: {
    ...FONTS.regular,
    color: COLORS.secondary,
  },
  addFamilyMemberButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: 8,
    margin: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFamilyMemberButtonText: {
    ...FONTS.regular,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SPACING.small,
  },
});

export default FamilyProfiles;