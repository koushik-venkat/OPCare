import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SPACING } from '@/config/tabContainer';

const DoctorCard = ({ doctor }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.doctorCard} 
      onPress={() => router.push(`/doctor/${doctor.id}`)}
      activeOpacity={0.85}
    >
      <View style={styles.doctorImageContainer}>
        <Image 
          source={{ uri: doctor.image }} 
          style={styles.doctorCardImage}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={14} color={COLORS.white} />
          <Text style={styles.ratingBadgeText}>{doctor.rating}</Text>
        </View>
      </View>
      <View style={styles.doctorCardContent}>
        <Text style={styles.doctorCardName}>{doctor.name}</Text>
        <Text style={styles.doctorCardSpecialty}>{doctor.specialty}</Text>
        <View style={styles.hospitalContainer}>
          <FontAwesome name="hospital-o" size={14} color={COLORS.gray} style={styles.hospitalIcon} />
          <Text style={styles.hospitalName}>{doctor.hospitalName}</Text>
        </View>
        <View style={styles.reviewsContainer}>
          <FontAwesome name="comments-o" size={14} color={COLORS.gray} style={styles.reviewsIcon} />
          <Text style={styles.reviewCount}>{doctor.reviewCount} verified reviews</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.bookButton} 
        onPress={() => router.push(`/booking/${doctor.id}`)}
        activeOpacity={0.8}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: 240,
    marginRight: SPACING.medium,
    marginBottom: SPACING.medium,
    marginTop: SPACING.small,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  doctorImageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  doctorCardImage: { 
    width: '100%', 
    height: 160, 
    backgroundColor: COLORS.gray + '20',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.warning,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.small + 1,
    marginLeft: 4,
  },
  doctorCardContent: { 
    padding: SPACING.medium + 2,
    paddingBottom: SPACING.medium,
  },
  doctorCardName: { 
    fontSize: SIZES.medium + 1, 
    fontWeight: 'bold', 
    color: COLORS.black,
    marginBottom: 4,
  },
  doctorCardSpecialty: { 
    fontSize: SIZES.small + 1, 
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 10,
  },
  hospitalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  hospitalIcon: {
    marginRight: 6,
  },
  hospitalName: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewsIcon: {
    marginRight: 6,
  },
  reviewCount: { 
    fontSize: SIZES.small, 
    color: COLORS.gray,
  },
  bookButton: { 
    backgroundColor: COLORS.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.medium,
    width: '100%',
  },
  bookButtonText: { 
    color: COLORS.white, 
    fontWeight: '700', 
    fontSize: SIZES.medium - 1,
    letterSpacing: 0.5,
  },
});

export default DoctorCard;