import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES } from "@/config/tabContainer";

const DoctorList = ({ doctors }) => {
  return (
    <View>
      {doctors.map((doctor) => (
        <View key={doctor.id} style={styles.card}>
          {/* Profile Image */}
          <Image 
            source={{ uri: doctor.image }} 
            style={styles.profileImage} 
          />
          
          {/* Doctor Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <View style={styles.row}>
              <FontAwesome name="star" size={SIZES.small} color="gold" />
              <Text style={styles.rating}>{doctor.rating} ({doctor.reviews} reviews)</Text>
            </View>
            <Text style={styles.hospital}>{doctor.hospital}</Text>
          </View>

          {/* Book Button */}
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.medium,
    backgroundColor: COLORS.white,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 3,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40, // Circular shape
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1, // Take remaining space
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  specialization: {
    color: COLORS.gray,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    marginLeft: 5,
    color: COLORS.darkGray,
  },
  hospital: {
    marginTop: 4,
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  bookText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
