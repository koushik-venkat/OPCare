import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SPACING } from '@/config/tabContainer';
import DashboardHeader from './dashboardHeader';
import AppointmentCard from '@/components/bookingsTab/appointmentCards';
import DoctorCard from './doctorCard';
import AppointmentModal from "@/components/bookingsTab/AppointmentDialogue";
import ConfirmDialog from "@/components/bookingsTab/confirmDialogue";

const Dashboard = () => {
  const router = useRouter();
  const [rescheduleData, setRescheduleData] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const [bookAgainData, setBookAgainData] = useState(null);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: '1',
      doctorName: 'Dr. Sarah',
      specialty: 'Cardiologist',
      clinic: 'Apollo Hospital',
      dateTime: '2025-03-15T10:30:00',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      status: 'Upcoming',
    },
    {
      id: '2',
      doctorName: 'Dr. Raj Kumar',
      specialty: 'Orthopedic',
      clinic: 'Fortis Hospital',
      dateTime: '2025-03-18T14:15:00',
      image: 'https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      status: 'Upcoming',
    },
  ]);

  const popularDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah',
      specialty: 'Cardiologist',
      hospitalName: 'Apollo Hospital',
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Dr. Raj Kumar',
      specialty: 'Orthopedic',
      hospitalName: 'Fortis Hospital',
      rating: 4.9,
      reviewCount: 95,
      image: 'https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Generate new appointment ID
  const generateNewAppointmentId = () => {
    return `${Math.max(...upcomingAppointments.map(a => parseInt(a.id))) + 1}`;
  };

  // Handler functions
  const handleCancel = (apptId) => {
    const fullAppt = upcomingAppointments.find((a) => a.id === apptId);
    if (fullAppt) {
      setConfirmData(fullAppt);
    }
  };

  const handleReschedule = (apptId) => {
    const fullAppt = upcomingAppointments.find((a) => a.id === apptId);
    if (fullAppt) {
      setRescheduleData(fullAppt);
    }
  };

  const renderAppointmentCard = ({ item }) => (
    <AppointmentCard
      data={item}
      isCompact
      highlightDate
      onCancel={handleCancel}
      onReschedule={handleReschedule}
    />
  );

  const renderDoctorCard = ({ item }) => <DoctorCard doctor={item} />;

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {upcomingAppointments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
              <TouchableOpacity onPress={() => router.push('/bookings')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={upcomingAppointments}
              renderItem={renderAppointmentCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        )}
        
        <View style={[styles.section, !upcomingAppointments.length && styles.firstSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Doctors</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={popularDoctors}
            renderItem={renderDoctorCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.listContainer, styles.doctorsListContainer]}
          />
        </View>
      </ScrollView>
      
      {/* Appointment Modal for Rescheduling */}
      {rescheduleData && (
        <AppointmentModal
          appointmentId={rescheduleData.id}
          type="reschedule"
          onClose={() => setRescheduleData(null)}
          onCancel={() => setRescheduleData(null)}
          onConfirm={(id, date) => {
            setUpcomingAppointments((prev) =>
              prev.map((appt) =>
                appt.id === id ? { ...appt, dateTime: date, status: "Upcoming" } : appt
              )
            );
            setRescheduleData(null);
          }}
          appointmentDetails={rescheduleData}
        />
      )}
      
      {/* Confirmation Dialog for Cancellation */}
      {confirmData && (
        <ConfirmDialog
          visible={!!confirmData}
          onCancel={() => setConfirmData(null)}
          onConfirm={() => {
            setUpcomingAppointments((prev) =>
              prev.filter((appt) => appt.id !== confirmData.id)
            );
            setConfirmData(null);
          }}
          appointmentDetails={confirmData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.backgroundLight 
  },
  scrollContainer: {
    paddingBottom: SPACING.large * 2,
  },
  section: {
    marginBottom: SPACING.large,
  },
  firstSection: {
    marginTop: SPACING.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    marginTop: SPACING.large,
    marginBottom: SPACING.medium,
  },
  sectionTitle: { 
    fontSize: SIZES.large, 
    fontWeight: 'bold', 
    color: COLORS.grayDark
  },
  viewAllText: { 
    fontSize: SIZES.small, 
    color: COLORS.primary, 
    fontWeight: '600' 
  },
  listContainer: {
    paddingHorizontal: SPACING.large,
  },
  doctorsListContainer: {
    paddingVertical: SPACING.small,
  }
});

export default Dashboard;