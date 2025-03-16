import { useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, StatusBar } from "react-native";
import AppointmentCard from "@/components/bookingsTab/appointmentCards";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AppointmentModal from "@/components/bookingsTab/AppointmentDialogue";
import ConfirmDialog from "@/components/bookingsTab/confirmDialogue";
import { COLORS, SIZES, SPACING, FONTS } from "@/config/tabContainer";

export const MOCK_APPOINTMENTS = [
  {
    id: "1",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    clinic: "City Hospital",
    rating: 4.8,
    dateTime: "2025-03-05T14:00:00",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: "2",
    doctorName: "Dr. John Smith",
    specialty: "Neurologist",
    clinic: "Metro Medical Center",
    rating: 4.5,
    dateTime: "2025-03-06T10:00:00",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Davis",
    specialty: "Dermatologist",
    clinic: "Skin Care Clinic",
    rating: 4.2,
    dateTime: "2025-02-28T16:30:00",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "4",
    doctorName: "Dr. Michael Brown",
    specialty: "Orthopedic",
    clinic: "Ortho Center",
    rating: 4.7,
    dateTime: "2025-02-25T09:00:00",
    status: "Canceled",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
];

const renderAppointments = (appointments, extraProps = {}) => (
  <ScrollView contentContainerStyle={styles.appointmentsContainer} showsVerticalScrollIndicator={false}>
    {appointments.length > 0 ? (
      appointments.map((appt) => (
        <View key={appt.id} style={styles.cardWrapper}>
          <AppointmentCard data={appt} {...extraProps} />
        </View>
      ))
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Appointments</Text>
      </View>
    )}
  </ScrollView>
);

const BookingsScreen = () => {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [bookAgainData, setBookAgainData] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "upcoming", title: "Upcoming" },
    { key: "completed", title: "Completed" },
    { key: "canceled", title: "Canceled" },
  ];

  const renderScene = SceneMap({
    upcoming: () =>
      renderAppointments(
        appointments.filter((appt) => appt.status === "Upcoming"),
        {
          onCancel: (apptId) => {
            const fullAppt = appointments.find((a) => a.id === apptId);
            if (fullAppt) {
              setConfirmData(fullAppt);
            }
          },
          onReschedule: (apptId) => {
            const fullAppt = appointments.find((a) => a.id === apptId);
            if (fullAppt) {
              setRescheduleData(fullAppt);
            }
          },
        }
      ),
      completed: () => 
        renderAppointments(
          appointments.filter((appt) => appt.status === "Completed"),
          {
            onBookAgain: (apptData) => {
              setBookAgainData(apptData);
            },
          }
        ),
      canceled: () => 
        renderAppointments(
          appointments.filter((appt) => appt.status === "Canceled"),
          {
            onBookAgain: (apptData) => {

              setBookAgainData(apptData);
            },
          }
        ),
  });

  // Function to generate a new appointment ID
  const generateNewAppointmentId = () => {
    return `${Math.max(...appointments.map(a => parseInt(a.id))) + 1}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Bookings</Text>
      </View>
      <View style={styles.contentContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabIndicator}
              style={styles.tabBar}
              activeColor={COLORS.primary}
              inactiveColor={COLORS.grayDark}
              scrollEnabled={true}
              tabStyle={styles.tab}
              renderLabel={({ route, focused }) => (
                <Text style={[styles.tabText, { color: focused ? COLORS.primary : COLORS.grayDark }]}>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
      
      {rescheduleData && (
        <AppointmentModal
          appointmentId={rescheduleData.id}
          type="reschedule"
          onClose={() => setRescheduleData(null)}
          onCancel={() => setRescheduleData(null)}
          onConfirm={(id, date) => {
            setAppointments((prev) =>
              prev.map((appt) =>
                appt.id === id ? { ...appt, dateTime: date, status: "Upcoming" } : appt
              )
            );
            setRescheduleData(null);
          }}
          appointmentDetails={rescheduleData}
        />
      )}
      
      {bookAgainData && (
        <AppointmentModal
        appointmentId={bookAgainData.id}
          type="booking"
          onClose={() => setBookAgainData(null)}
          onCancel={() => setBookAgainData(null)}
          onConfirm={(_, date) => {
            const newId = generateNewAppointmentId();
            setAppointments((prev) => [
              ...prev,
              {
                ...bookAgainData,
                id: newId,
                dateTime: date,
                status: "Upcoming",
              }
            ]);
            setBookAgainData(null);
          }}
          appointmentDetails={bookAgainData}
        />
      )}
      
      {confirmData && (
        <ConfirmDialog
          visible={!!confirmData}
          onCancel={() => setConfirmData(null)}
          onConfirm={() => {
            setAppointments((prev) =>
              prev.map((appt) =>
                appt.id === confirmData.id ? { ...appt, status: "Canceled" } : appt
              )
            );
            setConfirmData(null);
          }}
          appointmentDetails={confirmData}
        />
      )}
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingVertical: SPACING.medium,
    paddingHorizontal: SIZES.paddingMedium,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: SIZES.xLarge,
    fontWeight: "600",
    textAlign: "left",
    color: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  tabBar: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  tabIndicator: {
    backgroundColor: COLORS.primary,
    height: 3,
    borderRadius: 3,
  },
  tab: {
    width: "auto",
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: SIZES.medium,
  },
  appointmentsContainer: {
    padding: SPACING.medium,
    paddingBottom: SPACING.xLarge,
  },
  emptyContainer: {
    padding: SPACING.large,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.grayDark,
  },
  cardWrapper: {
    marginBottom: SPACING.medium,
  },
});