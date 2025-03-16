// app/doctor/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SPACING, FONTS } from '@/config/tabContainer';
import { getDoctorById } from '@/config/SampleData/doctors';
import Animated, { FadeInDown, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const DoctorDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // For animation and scroll effects
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Animation styles for header
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 100 ? 1 : 0,
      transform: [{ translateY: scrollY.value > 100 ? 0 : -10 }],
    };
  });

  useEffect(() => {
    // Get the doctor data using the ID from the URL
    const doctorData = getDoctorById(id.toString());
    
    if (doctorData) {
      setDoctor(doctorData);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContent}>
          <Ionicons name="medical-outline" size={40} color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading doctor details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!doctor) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="alert-circle" size={60} color={COLORS.error} />
        <Text style={styles.errorText}>Doctor not found</Text>
        <TouchableOpacity 
          style={styles.errorButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.errorButtonText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Floating header that appears on scroll with the new heading */}
      <Animated.View style={[styles.floatingHeader, headerStyle]}>
        <Text style={styles.floatingHeaderTitle}>{doctor.name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Page Title */}
          <Animated.View 
            entering={FadeInDown.delay(50).duration(400)} 
            style={styles.pageHeaderContainer}
          >
            <Text style={styles.pageHeaderTitle}>Know Your Doctor</Text>
          </Animated.View>
          
          {/* Doctor Profile Card */}
          <Animated.View 
            entering={FadeInDown.delay(100).duration(500)} 
            style={styles.profileCard}
          >
            <Image 
              source={{ uri: doctor.image }} 
              style={styles.doctorImage}
              resizeMode="cover"
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.ratingContainer}>
                {Array(5).fill(0).map((_, index) => (
                  <Ionicons 
                    key={index} 
                    name={index < Math.floor(doctor.rating) ? "star" : "star-outline"} 
                    size={16} 
                    color={COLORS.warning} 
                    style={styles.starIcon}
                  />
                ))}
                <Text style={styles.rating}>{doctor.rating}</Text>
                <Text style={styles.reviewCount}>({doctor.reviewCount} reviews)</Text>
              </View>
              
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="medical" size={14} color={COLORS.primary} />
                  <Text style={styles.badgeText}>{doctor.experience}</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="people" size={14} color={COLORS.primary} />
                  <Text style={styles.badgeText}>{doctor.reviewCount}+ Patients</Text>
                </View>
              </View>
            </View>
          </Animated.View>
          
          {/* About Doctor Section */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(500)} 
            style={styles.sectionCard}
          >
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <Text style={styles.aboutText}>{doctor.about}</Text>
          </Animated.View>
          
          {/* Hospital Section */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(500)} 
            style={styles.sectionCard}
          >
            <Text style={styles.sectionTitle}>Hospital</Text>
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalIconContainer}>
                <Ionicons name="business" size={24} color={COLORS.white} />
              </View>
              <View style={styles.hospitalDetails}>
                <Text style={styles.hospitalName}>{doctor.hospitalName}</Text>
                <Text style={styles.hospitalAddress}>{doctor.hospitalAddress}</Text>
              </View>
            </View>
          </Animated.View>
          
          {/* Experience & Education Section */}
          <Animated.View 
            entering={FadeInDown.delay(400).duration(500)} 
            style={styles.sectionCard}
          >
            <Text style={styles.sectionTitle}>Experience & Education</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="briefcase" size={16} color={COLORS.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Experience</Text>
                <Text style={styles.infoValue}>{doctor.experience}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="school" size={16} color={COLORS.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Education</Text>
                <Text style={styles.infoValue}>{doctor.education}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="language" size={16} color={COLORS.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Languages</Text>
                <Text style={styles.infoValue}>{doctor.languages.join(', ')}</Text>
              </View>
            </View>
          </Animated.View>
          
          {/* Available Slots Section */}
          <Animated.View 
            entering={FadeInDown.delay(500).duration(500)} 
            style={styles.sectionCard}
          >
            <Text style={styles.sectionTitle}>Available Slots</Text>
            <View style={styles.slotsList}>
              {doctor.availableSlots.map((slot, index) => (
                <TouchableOpacity key={index} style={styles.slotItem}>
                  <Ionicons name="calendar" size={16} color={COLORS.primary} />
                  <Text style={styles.slotText}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
          
          {/* Extra space at bottom for fixed button */}
          <View style={styles.bottomPadding} />
        </Animated.ScrollView>
      </View>
      
      {/* Fixed Book Appointment Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push(`/booking/${doctor.id}`)}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  errorButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  errorButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  pageHeaderContainer: {
    marginBottom: SPACING.medium,
  },
  pageHeaderTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  floatingHeaderTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grayDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  doctorImage: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginRight: SPACING.medium,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  starIcon: {
    marginRight: 2,
  },
  rating: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginLeft: 6,
    marginRight: 4,
    color: COLORS.black,
  },
  reviewCount: {
    fontSize: 14,
    color: COLORS.gray,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grayDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
    color: COLORS.black,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 22,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  hospitalDetails: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: COLORS.black,
  },
  hospitalAddress: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.medium,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: COLORS.black,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  slotsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  slotText: {
    fontSize: 14,
    marginLeft: 8,
    color: COLORS.primary,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    paddingBottom: Platform.OS === 'ios' ? 30 : SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grayDark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  bookButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DoctorDetailsScreen;