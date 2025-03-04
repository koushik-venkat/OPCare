import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/config/tabContainer";

const STAR_RATINGS = ["3 Star +", "4 Star +", "5 Star"];
const SORT_OPTIONS = ["Ratings", "Experience", "Nearest"];
const GENDERS = [
  { label: "Male", icon: "male" },
  { label: "Female", icon: "female" },
];

const FilterModal = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          {/* Search Bar */}
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Star Rating Filters */}
          <Text style={styles.sectionTitle}>Star Rating</Text>
          <View style={styles.row}>
            {STAR_RATINGS.map((star) => (
              <TouchableOpacity
                key={star}
                style={[styles.option, selectedStar === star && styles.selectedOption]}
                onPress={() => setSelectedStar(star)}
              >
                <Text style={[styles.optionText, selectedStar === star && styles.selectedOptionText]}>{star}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Gender Filters */}
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.row}>
            {GENDERS.map(({ label, icon }) => (
              <TouchableOpacity
                key={label}
                style={[styles.option, selectedGender === label && styles.selectedOption]}
                onPress={() => setSelectedGender(label)}
              >
                <MaterialIcons name={icon} size={20} color={selectedGender === label ? COLORS.white : COLORS.gray} />
                <Text style={[styles.optionText, selectedGender === label && styles.selectedOptionText]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sorting Options */}
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.row}>
            {SORT_OPTIONS.map((sort) => (
              <TouchableOpacity
                key={sort}
                style={[styles.option, selectedSort === sort && styles.selectedOption]}
                onPress={() => setSelectedSort(sort)}
              >
                <Text style={[styles.optionText, selectedSort === sort && styles.selectedOptionText]}>{sort}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    marginLeft: 6,
    color: COLORS.darkGray,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
