import { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SPACING } from "@/config/tabContainer";
import FilterModal from "@/components/filters/filterModals";

const FILTERS = ["All", "Cardiology", "Radiology", "Dermatology", "Neurology", "Orthopedics"];

const FilterTabs = ({ onSelectFilter }) => {
  const [selected, setSelected] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Horizontal Scroll Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.tab, selected === filter && styles.selectedTab]}
            onPress={() => {
              setSelected(filter);
              onSelectFilter(filter);
            }}
          >
            <Text style={[styles.text, selected === filter && styles.selectedText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Icon (Outside Scroll View) */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <FontAwesome name="sliders" size={22} color={COLORS.white} />
      </TouchableOpacity>

      {/* Filter Modal */}
      <FilterModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
  },
  scrollView: {
    flex: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  selectedText: {
    color: COLORS.white,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
