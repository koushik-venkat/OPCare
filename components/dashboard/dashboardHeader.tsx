import { View, StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/config/tabContainer";
import HeaderTop from "./headerTop";
import SearchBar from "../searchBar";

const DashboardHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <HeaderTop />
      <SearchBar />
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
});
