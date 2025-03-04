import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES, SPACING, FONTS } from "@/config/tabContainer";
import { format, parseISO } from "date-fns";

const AppointmentCard = ({ data, onCancel, onReschedule, onBookAgain }) => {
  // Parse the date and format it nicely
  const formattedDate = format(parseISO(data.dateTime), "EEE, MMM d • h:mm a");
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: data.image }} 
          style={styles.image} 
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {data.doctorName}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color={COLORS.accent} />
            <Text style={styles.rating}>{data.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge, 
          data.status === "Upcoming" 
            ? styles.upcomingStatus 
            : data.status === "Completed" 
            ? styles.completedStatus 
            : styles.canceledStatus
        ]}>
          <Text style={styles.statusText}>{data.status}</Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <FontAwesome name="stethoscope" size={16} color={COLORS.primary} />
          <Text style={styles.detailText} numberOfLines={1}>
            {data.specialty}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="hospital-o" size={16} color={COLORS.primary} />
          <Text style={styles.detailText} numberOfLines={1}>
            {data.clinic}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="calendar" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>
            {formattedDate}
          </Text>
        </View>
      </View>
      
      {data.status === "Upcoming" && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.cancelBtn} 
            onPress={() => onCancel(data.id)}
          >
            <FontAwesome name="times" size={14} color={COLORS.error} />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.rescheduleBtn} 
            onPress={() => onReschedule(data.id)}
          >
            <FontAwesome name="calendar-plus-o" size={14} color={COLORS.success} />
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {(data.status === "Completed" || data.status === "Canceled") && (
        <TouchableOpacity 
          style={styles.bookAgain} 
          onPress={() => onBookAgain(data)}
        >
          <FontAwesome name="repeat" size={14} color={COLORS.white} />
          <Text style={styles.bookAgainText}>Book Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
    overflow: "hidden",
  },
  name: {
    ...FONTS.bold,
    color: COLORS.primaryDark,
    fontSize: SIZES.medium,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    marginLeft: 5,
    color: COLORS.gray,
    fontSize: SIZES.small,
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingStatus: {
    backgroundColor: COLORS.primaryLight + "30",
  },
  completedStatus: {
    backgroundColor: COLORS.success + "30",
  },
  canceledStatus: {
    backgroundColor: COLORS.error + "30",
  },
  statusText: {
    fontSize: SIZES.small - 2,
    fontWeight: "600",
    color: COLORS.primaryDark,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 10,
    color: COLORS.grayDark,
    ...FONTS.regular,
    fontSize: SIZES.small,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.error + "15",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: "center",
  },
  cancelText: {
    color: COLORS.error,
    marginLeft: 6,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
  rescheduleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "15",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: "center",
  },
  rescheduleText: {
    color: COLORS.success,
    marginLeft: 6,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
  bookAgain: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  bookAgainText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
});