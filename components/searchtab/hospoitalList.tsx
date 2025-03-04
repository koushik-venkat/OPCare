import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES } from "@/config/tabContainer";

const HospitalList = ({ hospitals }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Hospitals</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {hospitals.map((hospital) => (
          <View key={hospital.id} style={styles.card}>
            <Image source={{ uri: hospital.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{hospital.name}</Text>
              <View style={styles.row}>
                <FontAwesome name="star" size={SIZES.medium} color="gold" />
                <Text style={styles.rating}>{hospital.rating} ({hospital.reviews} reviews)</Text>
              </View>
              <Text style={styles.specialization}>{hospital.specialization}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HospitalList;

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.large,
  },
  header: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.secondaryDark,
    marginBottom: SPACING.medium,
    paddingLeft: SPACING.medium, // Align with horizontal scroll
  },
  scrollContainer: {
    paddingLeft: SPACING.medium, // Smooth scrolling alignment
    paddingRight: SPACING.large,
  },
  card: {
    width: 250,
    marginBottom:20,
    borderRadius: 15,
    paddingBottom: SPACING.large,
    marginRight: SPACING.medium,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3, 
  },
  image: {
    width: "100%",
    height: 150, // Covers 60-65% of the card
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  info: {
    padding: SPACING.medium,
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.secondaryDark,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.small,
  },
  rating: {
    marginLeft: 5,
    color: COLORS.grayDark,
    fontSize: SIZES.medium,
  },
  specialization: {
    marginTop: SPACING.small,
    color: COLORS.gray,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
