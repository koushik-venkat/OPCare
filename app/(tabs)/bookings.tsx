import { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AppointmentCard from "@/components/bookingsTab/appointmentCards";
import RescheduleModal from "@/components/bookingsTab/rescheduleDialogue";
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
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    doctorName: "Dr. John Smith",
    specialty: "Neurologist",
    clinic: "Metro Medical Center",
    rating: 4.5,
    dateTime: "2025-03-06T10:00:00",
    status: "Upcoming",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Davis",
    specialty: "Dermatologist",
    clinic: "Skin Care Clinic",
    rating: 4.2,
    dateTime: "2025-02-28T16:30:00",
    status: "Completed",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    doctorName: "Dr. Michael Brown",
    specialty: "Orthopedic",
    clinic: "Ortho Center",
    rating: 4.7,
    dateTime: "2025-02-25T09:00:00",
    status: "Canceled",
    image: "https://via.placeholder.com/100",
  },
];

const renderAppointments = (appointments, extraProps = {}) => (
  <View style={styles.scene}>
    {appointments.length > 0 ? (
      appointments.map((appt) => (
        <AppointmentCard key={appt.id} data={appt} {...extraProps} />
      ))
    ) : (
      <Text style={styles.emptyText}>No Appointments</Text>
    )}
  </View>
);

const BookingsScreen = () => {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [rescheduleData, setRescheduleData] = useState(null);
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
        { onCancel: setConfirmData, onReschedule: setRescheduleData }
      ),
    completed: () =>
      renderAppointments(
        appointments.filter((appt) => appt.status === "Completed")
      ),
    canceled: () =>
      renderAppointments(
        appointments.filter((appt) => appt.status === "Canceled")
      ),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Bookings</Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.primary }}
            style={{ 
              backgroundColor: COLORS.backgroundLight, 
              elevation: 0 
            }}
            activeColor={COLORS.primaryDark} // Explicitly set active color
            inactiveColor={COLORS.grayDark} // Explicitly set inactive color
            renderLabel={({ route, focused }) => (
              <Text style={[
                styles.tabText, 
                { 
                  color: focused ? COLORS.primaryDark : COLORS.grayDark 
                }
              ]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />

      {rescheduleData && (
        <RescheduleModal
          appointmentId={rescheduleData}
          onClose={() => setRescheduleData(null)}
          onConfirm={(id, date) =>
            setAppointments((prev) =>
              prev.map((appt) =>
                appt.id === id
                  ? { ...appt, dateTime: date, status: "Upcoming" }
                  : appt
              )
            )
          }
        />
      )}

      {confirmData && (
        <ConfirmDialog
          visible={!!confirmData}
          onCancel={() => setConfirmData(null)}
          onConfirm={() =>
            setAppointments((prev) =>
              prev.map((appt) =>
                appt.id === confirmData ? { ...appt, status: "Canceled" } : appt
              )
            )
          }
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
    padding: SIZES.paddingMedium,
  },
  heading: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.medium,
    color: COLORS.primary,
  },
  scene: {
    flex: 1,
    padding: SPACING.medium,
  },
  tabText: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: SIZES.large,
    color: COLORS.grayDark,
    fontSize: SIZES.medium,
  },
});