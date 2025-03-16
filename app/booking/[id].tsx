import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Platform, 
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  Animated as RNAnimated
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES, SPACING } from '@/config/tabContainer';
import { getDoctorById } from '@/config/SampleData/doctors';
import Animated, { FadeInDown, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from 'react-native-paper';
import moment from 'moment';
import LottieView from 'lottie-react-native'; // Add this import

// Time slots with simply formatted times
const timeSlots = [
  '9:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00'
];

// Function to safely configure fonts that matches Paper's requirements
function configureFonts({ config }) {
  return {
    regular: config.regular,
    medium: config.medium,
    bold: config.bold,
    titleLarge: config.bold,
    titleMedium: config.bold,
    titleSmall: config.medium,
    labelLarge: config.medium,
    labelMedium: config.medium,
    labelSmall: config.regular,
    bodyLarge: config.regular,
    bodyMedium: config.regular,
    bodySmall: config.regular,
    headlineLarge: config.bold,
    headlineMedium: config.bold,
    headlineSmall: config.bold,
  };
}

const BookingScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  
  // Animation values
  const scrollY = useSharedValue(0);
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;
  const scaleAnim = useRef(new RNAnimated.Value(0.5)).current;
  
  // Lottie animation reference
  const lottieRef = useRef(null);
  
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Create a properly configured theme for Paper components
  const paperTheme = {
    colors: {
      primary: COLORS.primary,
      onPrimary: COLORS.white,
      onBackground: COLORS.black,
      surface: COLORS.white,
      onSurface: COLORS.black,
      surfaceVariant: COLORS.backgroundLight,
      onSurfaceVariant: COLORS.grayDark,
      text: COLORS.black,
      disabled: COLORS.gray,
      placeholder: COLORS.grayDark,
      backdrop: 'rgba(0,0,0,0.6)',
      background: COLORS.white,
      error: COLORS.error
    },
    fonts: configureFonts({
      config: {
        regular: {
          fontFamily: 'System',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'System',
          fontWeight: '500',
        },
        bold: {
          fontFamily: 'System', 
          fontWeight: 'bold',
        },
      }
    })
  };

  useEffect(() => {
    // Get the doctor data using the ID from the URL
    const doctorData = getDoctorById(id.toString());
    
    if (doctorData) {
      // Include relevant fields or add missing ones
      console.log(doctorData.image);
      setDoctor({
        ...doctorData,
        rating: doctorData.rating || 4.8,
        reviewCount: doctorData.reviewCount || 124,
        image: doctorData.image,
        isFavorite: doctorData.isFavorite || false
      });
    }
    
    setLoading(false);
  }, [id]);

  const formatAppointmentDate = (date) => {
    return moment(date).format('dddd, MMMM D, YYYY');
  };

  const handleBookingConfirmation = () => {
    setBookingInProgress(true);
    
    // Simulate booking process
    setTimeout(() => {
      setBookingInProgress(false);
      setShowConfirmation(true);
      
      // Animate the confirmation dialog
      RNAnimated.parallel([
        RNAnimated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        RNAnimated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        })
      ]).start();
      
      // Play Lottie animation
      if (lottieRef.current) {
        lottieRef.current.play();
      }
      
      // Auto-redirect after showing confirmation
      setTimeout(() => {
        handleRedirectToBookings();
      }, 3000);
    }, 1500);
  };
  
  const handleRedirectToBookings = () => {
    setShowConfirmation(false);
    router.push('/bookings');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContent}>
          <Ionicons name="calendar-outline" size={40} color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading booking details...</Text>
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
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          
          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Doctor Info Card */}
              <Animated.View 
                entering={FadeInDown.delay(100).duration(500)} 
                style={styles.doctorCard}
              >
                <View style={styles.doctorHeader}>
                  <View style={styles.doctorImageContainer}>
                    <Image 
                      src={doctor.image} 
                      style={styles.doctorImage} 
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.doctorInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.doctorName}>{doctor.name}</Text>
                      <TouchableOpacity style={styles.favoriteButton}>
                        <FontAwesome 
                          name={doctor.isFavorite ? "heart" : "heart-o"} 
                          size={20} 
                          color={doctor.isFavorite ? COLORS.error : COLORS.gray} 
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <View style={styles.hospitalInfo}>
                      <Ionicons name="business-outline" size={16} color={COLORS.gray} />
                      <Text style={styles.hospitalName}>{doctor.hospitalName}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Ionicons 
                            key={star}
                            name={star <= Math.floor(doctor.rating) ? "star" : star <= doctor.rating ? "star-half" : "star-outline"} 
                            size={16} 
                            color={COLORS.warning} 
                            style={styles.starIcon}
                          />
                        ))}
                      </View>
                      <Text style={styles.ratingText}>{doctor.rating} ({doctor.reviewCount})</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
              
              {/* Date Selection Section */}
              <Animated.View 
                entering={FadeInDown.delay(200).duration(500)} 
                style={styles.sectionCard}
              >
                <Text style={styles.sectionTitle}>Select Date</Text>
                
                <View style={styles.datePickerContainer}>
                  <DatePickerInput
                    locale="en"
                    label="Appointment Date"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inputMode="start"
                    style={styles.datePicker}
                    theme={{
                      colors: {
                        primary: COLORS.primary,
                        onPrimary: COLORS.white,
                        onSurface: COLORS.black,
                        onSurfaceVariant: COLORS.grayDark,
                        surfaceVariant: COLORS.backgroundLight,
                        background: COLORS.white,
                        text: COLORS.black,
                        disabled: COLORS.gray,
                        placeholder: COLORS.grayDark,
                        error: COLORS.error
                      }
                    }}
                    mode="outlined"
                    outlineColor={COLORS.border}
                    activeOutlineColor={COLORS.primary}
                    validRange={{
                      startDate: new Date(), // Today
                      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                    }}
                  />
                </View>
              </Animated.View>
              
              {/* Time Slots */}
              <Animated.View 
                entering={FadeInDown.delay(300).duration(500)} 
                style={styles.sectionCard}
              >
                <Text style={styles.sectionTitle}>Available Time Slots</Text>
                
                <View style={styles.slotsContainer}>
                  {timeSlots.map((slot, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={[
                        styles.slotButton,
                        selectedTime === slot && styles.selectedSlotButton
                      ]}
                      onPress={() => setSelectedTime(slot)}
                    >
                      <Text style={[
                        styles.slotText,
                        selectedTime === slot && styles.selectedSlotText
                      ]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
              
              {/* Appointment Notes */}
              <Animated.View 
                entering={FadeInDown.delay(400).duration(500)} 
                style={styles.sectionCard}
              >
                <Text style={styles.sectionTitle}>Appointment Notes</Text>
                <Text style={styles.notesText}>
                  • All appointments are in-person at the doctor's clinic.
                </Text>
                <Text style={styles.notesText}>
                  • Please arrive 15 minutes before your appointment time.
                </Text>
                <Text style={styles.notesText}>
                  • Bring your medical history and any relevant documents.
                </Text>
                <Text style={styles.notesText}>
                  • Cancellations must be made at least 24 hours in advance.
                </Text>
              </Animated.View>
              
              {/* Bottom padding for fixed button */}
              <View style={styles.bottomPadding} />
            </Animated.ScrollView>
          </View>
          
          {/* Fixed Confirm Button */}
          <View style={styles.fixedButtonContainer}>
            <View style={styles.appointmentSummary}>
              <Text style={styles.summaryText}>
                {formatAppointmentDate(selectedDate)}
                {selectedTime ? ` at ${selectedTime}` : ''}
              </Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.confirmButton,
                (!selectedTime || bookingInProgress) && styles.disabledButton
              ]}
              disabled={!selectedTime || bookingInProgress}
              onPress={handleBookingConfirmation}
            >
              {bookingInProgress ? (
                <View style={styles.loadingButtonContent}>
                  <ActivityIndicator color={COLORS.white} size="small" />
                  <Text style={[styles.confirmButtonText, styles.loadingButtonText]}>Processing...</Text>
                </View>
              ) : (
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Success Confirmation Modal with Lottie Animation */}
          <Modal
            visible={showConfirmation}
            transparent={true}
            animationType="none"
          >
            <View style={styles.modalOverlay}>
              <RNAnimated.View 
                style={[
                  styles.confirmationModal,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                  }
                ]}
              >
                {/* Lottie Animation */}
                <View style={styles.lottieContainer}>
                  <LottieView
                    ref={lottieRef}
                    source={require('@/assets/animations/success.json')}
                    autoPlay={true}
                    loop={false}
                    style={styles.lottieAnimation}
                  />
                </View>
                
                <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
                <Text style={styles.confirmationText}>
                  Your appointment with Dr. {doctor.name} on {formatAppointmentDate(selectedDate)} at {selectedTime} has been confirmed.
                </Text>
                <TouchableOpacity 
                  style={styles.viewBookingsButton}
                  onPress={handleRedirectToBookings}
                >
                  <Text style={styles.viewBookingsText}>View My Bookings</Text>
                </TouchableOpacity>
              </RNAnimated.View>
            </View>
          </Modal>
          
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
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
  scrollContent: {
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    paddingBottom: 100,
  },
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.backgroundLight,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
    fontWeight: '500',
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  hospitalName: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
    color: COLORS.black,
  },
  datePickerContainer: {
    width: '100%',
  },
  datePicker: {
    backgroundColor: COLORS.white,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotButton: {
    width: '31%',
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedSlotButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotText: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '500',
  },
  selectedSlotText: {
    color: COLORS.white,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    lineHeight: 20,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    paddingBottom: Platform.OS === 'ios' ? 30 : SPACING.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  appointmentSummary: {
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.7,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingButtonText: {
    marginLeft: 8,
  },
  
  // Modal and confirmation styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  confirmationModal: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.large,
    width: '85%',
    maxWidth: 340,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  // Lottie Animation Styles
  lottieContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
    overflow: 'hidden',
    zIndex: 10,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.large,
    lineHeight: 22,
  },
  viewBookingsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.large,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  viewBookingsText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default BookingScreen;