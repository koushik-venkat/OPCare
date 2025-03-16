import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/config/tabContainer";
import { useRouter } from "expo-router";

const HeaderTop = () => {
  const router = useRouter();
  
  return (
    <View style={styles.topRow}>
      {/* Left Section - Greeting & Location */}
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>
          Hi, <Text style={styles.name}>Koushik</Text>
        </Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={12} color={COLORS.gray} />
          <Text style={styles.locationText}>Bangalore, India</Text>
        </View>
      </View>
      
      {/* Right Section - Icons & Avatar */}
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push("/notifications")}
        >
          <FontAwesome name="bell-o" size={22} color={COLORS.grayDark} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push("/liked")}
        >
          <FontAwesome name="heart-o" size={22} color={COLORS.grayDark} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/personalInformation")}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderTop;


const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.grayDark,
  },
  name: {
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    color: COLORS.gray,
    marginLeft: 4,
    fontSize: SIZES.small,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});