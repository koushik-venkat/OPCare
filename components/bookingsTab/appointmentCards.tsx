import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES, SPACING, FONTS } from "@/config/tabContainer";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";

const AppointmentCard = ({ 
  data, 
  onCancel, 
  onReschedule, 
  onBookAgain, 
  isCompact = false, 
  highlightDate = false 
}) => {

  const router = useRouter();
  // Parse the date and format it nicely
  const formattedDate = format(parseISO(data.dateTime), "EEE, MMM d • h:mm a");
  // Split the formatted date to highlight the date part when required
  const [datePart, timePart] = formattedDate.split("•").map(part => part.trim());

  return (
    <TouchableOpacity 
    onPress={() => router.push(`/doctor/${data.id}`)}
    activeOpacity={0.8}
    style={[
      styles.card,
      isCompact && styles.compactCard
    ]}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: data.image }} 
          style={[
            styles.image,
            isCompact && styles.compactImage
          ]} 
        />
        <View style={styles.headerInfo}>
          <Text 
            style={styles.name} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {data.doctorName}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color={COLORS.accent} />
            <Text style={styles.rating}>{data.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            data.status === "Upcoming"
              ? styles.upcomingStatus
              : data.status === "Completed"
              ? styles.completedStatus
              : styles.canceledStatus,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              data.status === "Upcoming"
                ? styles.upcomingStatusText
                : data.status === "Completed"
                ? styles.completedStatusText
                : styles.canceledStatusText,
            ]}
          >
            {data.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <FontAwesome name="stethoscope" size={16} color={COLORS.primary} />
          <Text 
            style={styles.detailText} 
            numberOfLines={1}
          >
            {data.specialty}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="hospital-o" size={16} color={COLORS.primary} />
          <Text 
            style={styles.detailText} 
            numberOfLines={1}
          >
            {data.clinic}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="calendar" size={16} color={COLORS.primary} />
          {highlightDate ? (
            <View style={styles.dateContainer}>
              <Text style={styles.highlightedDate}>{datePart}</Text>
              <Text style={styles.detailText}>• {timePart}</Text>
            </View>
          ) : (
            <Text style={styles.detailText}>{formattedDate}</Text>
          )}
        </View>
      </View>

      {data.status === "Upcoming" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.cancelBtn, isCompact && styles.compactButton]}
            onPress={() => {
              onCancel(data.id)}
            }
          >
            <FontAwesome name="times" size={14} color={COLORS.error} />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rescheduleBtn, isCompact && styles.compactButton]}
            onPress={() => onReschedule(data.id)}
          >
            <FontAwesome
              name="calendar-plus-o"
              size={14}
              color={COLORS.primary}
            />
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}

      {(data.status === "Completed" || data.status === "Canceled") && (
        <TouchableOpacity
          style={styles.bookAgain}
          onPress={() => onBookAgain(data)}
        >
          <FontAwesome name="repeat" size={14} color={COLORS.primary} />
          <Text style={styles.bookAgainText}>Book Again</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
  compactCard: {
    width: 280,
    marginRight: SPACING.medium,
    padding: 12,
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
  compactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  },
  upcomingStatusText: {
    color: COLORS.primary, // Blue tone
  },
  completedStatusText: {
    color: COLORS.success, // Green tone
  },
  canceledStatusText: {
    color: COLORS.error, // Red tone
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  highlightedDate: {
    color: COLORS.primary,
    ...FONTS.bold,
    fontSize: SIZES.small,
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
    backgroundColor: COLORS.primary + "15",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: "center",
  },
  compactButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  rescheduleText: {
    color: COLORS.primary,
    marginLeft: 6,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
  bookAgain: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "15",
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  bookAgainText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
});