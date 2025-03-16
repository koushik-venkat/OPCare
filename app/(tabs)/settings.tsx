import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import { COLORS, FONTS, SPACING, SIZES } from '@/config/tabContainer';
import SectionHeader from '@/components/settings/SectionHeader';
import SettingsItem from '@/components/settings/SettingsItem';

const Settings = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const navigateToPersonalInfo = () => {
    navigation.navigate('personalInformation');
  };

  const navigateToPasswordSecurity = () => {
    navigation.navigate('passwordSecurity');
  };

  const navigateToMedicalHistory = () => {
    navigation.navigate('medicalHistory');
  };

  const navigateToNotifications = () => {
    navigation.navigate('notifications');
  };

  const navigateToHelpSupport = () => {
    navigation.navigate('helpSupport');
  };

  const navigateToTermsPrivacy = () => {
    navigation.navigate('termsPrivacy');
  };

  const navigateToFamilyProfiles = () => {
    navigation.navigate('familyProfiles');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {/* Fixed Header */}
      <Animated.View style={[styles.header, { elevation: scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 4],
        extrapolate: 'clamp'
      })}]}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <View style={styles.profileMetaContainer}>
              <View style={styles.profileMeta}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.secondary} />
                <Text style={styles.profileMetaText}>32 years</Text>
              </View>
              <View style={styles.profileMeta}>
                <Ionicons name="male-outline" size={14} color={COLORS.secondary} />
                <Text style={styles.profileMetaText}>Male</Text>
              </View>
              <View style={styles.profileMeta}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                <Text style={styles.profileMetaText}>Verified</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
              <MaterialIcons name="edit" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <SectionHeader title="Account Settings" />
          
          <SettingsItem
            icon={<Ionicons name="person-outline" size={22} color={COLORS.secondary} />}
            title="Personal Information"
            subtitle="Manage your personal details"
            onPress={navigateToPersonalInfo}
          />
          
          <SettingsItem
            icon={<Ionicons name="key-outline" size={22} color={COLORS.secondary} />}
            title="Password & Security"
            subtitle="Protect your account"
            onPress={navigateToPasswordSecurity}
          />
          
          <SettingsItem
            icon={<Ionicons name="time-outline" size={22} color={COLORS.secondary} />}
            title="Medical History"
            subtitle="View your medical records"
            onPress={navigateToMedicalHistory}
          />

          <SettingsItem
            icon={<Ionicons name="people-outline" size={22} color={COLORS.secondary} />}
            title="Family Profiles"
            subtitle="Manage family members"
            onPress={navigateToFamilyProfiles}
          />

          <SectionHeader title="Notifications" />
          
          <SettingsItem
            icon={<Ionicons name="notifications-outline" size={22} color={COLORS.secondary} />}
            title="Notifications"
            subtitle="Check all your latest notifications"
            onPress={navigateToNotifications}
            // rightComponent={
            //   <Switch
            //     value={pushNotifications}
            //     onValueChange={setPushNotifications}
            //     color={COLORS.primary}
            //   />
            // }
          />

          <SectionHeader title="More" />
          
          <SettingsItem
            icon={<Ionicons name="help-circle-outline" size={22} color={COLORS.secondary} />}
            title="Help & Support"
            subtitle="Get assistance when needed"
            onPress={navigateToHelpSupport}
          />
          
          <SettingsItem
            icon={<Ionicons name="document-text-outline" size={22} color={COLORS.secondary} />}
            title="Terms & Privacy"
            subtitle="Review our policies"
            onPress={navigateToTermsPrivacy}
          />
          
          <SettingsItem
            icon={<Ionicons name="log-out-outline" size={22} color={COLORS.error} />}
            title="Sign Out"
            titleColor={COLORS.error}
            onPress={() => {}}
          />
          
          <View style={styles.footer}>
            <Text style={styles.versionText}>Version 2.1.0</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    paddingTop: SPACING.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    padding: SPACING.small,
  },
  headerTitle: {
    ...FONTS.semiBold,
    fontSize: 18,
    marginLeft: SPACING.medium,
    color: COLORS.black,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.large,
    backgroundColor: COLORS.white,
    marginTop: 70, // Space for the fixed header
    paddingTop: SPACING.large,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  profileInfo: {
    marginLeft: SPACING.medium,
    flex: 1,
  },
  profileName: {
    ...FONTS.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  profileMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.small,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.medium,
    marginBottom: 4,
  },
  profileMetaText: {
    ...FONTS.regular,
    fontSize: 13,
    color: COLORS.secondary,
    marginLeft: 4,
  },
  editButton: {
    marginTop: SPACING.medium,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // More curved button
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  editButtonText: {
    ...FONTS.medium,
    fontSize: 13,
    color: COLORS.white,
    marginRight: 6,
  },
  settingsContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: SPACING.small,
    marginTop: -20, // Overlap with profile section
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.large,
  },
  versionText: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.secondary,
  },
});

export default Settings;