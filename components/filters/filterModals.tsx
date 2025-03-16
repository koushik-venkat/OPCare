import React, { useEffect, useRef, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/config/tabContainer";

const STAR_RATINGS = ["3", "4", "5"];
const SORT_OPTIONS = ["Ratings", "Experience", "Nearest"];
const GENDERS = [
  { label: "Male", icon: "male" },
  { label: "Female", icon: "female" },
];

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  // onApply: (filters: { rating: string | null; gender: string | null; sortBy: string | null }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleApply = () => {
    // onApply({ rating: selectedStar, gender: selectedGender, sortBy: selectedSort });
    onClose();
  };

  const resetFilters = () => {
    setSelectedStar(null);
    setSelectedGender(null);
    setSelectedSort(null);
  };

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Filter Options</Text>
          <View style={styles.divider} />

          {/* Star Rating Filters */}
          <Text style={styles.sectionTitle}>Rating</Text>
          <View style={styles.row}>
            {STAR_RATINGS.map((star) => (
              <TouchableOpacity
                key={star}
                style={[styles.option, selectedStar === star && styles.selectedOption]}
                onPress={() => setSelectedStar(star === selectedStar ? null : star)}
              >
                <FontAwesome name="star" size={16} color={selectedStar === star ? COLORS.white : COLORS.primary} />
                <Text style={[styles.optionText, selectedStar === star && styles.selectedOptionText]}>{star}+</Text>
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
                onPress={() => setSelectedGender(label === selectedGender ? null : label)}
              >
                <MaterialIcons name={icon} size={18} color={selectedGender === label ? COLORS.white : COLORS.primary} />
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
                onPress={() => setSelectedSort(sort === selectedSort ? null : sort)}
              >
                <Text style={[styles.optionText, selectedSort === sort && styles.selectedOptionText]}>{sort}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.07)",
    width: "100%",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginTop: 12,
    alignSelf: "flex-start",
    color: COLORS.grayDark || "#333",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 6,
    width: "100%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 5,
    minWidth: 70,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    marginLeft: 4,
    color: COLORS.grayDark || "#333",
    fontWeight: "600",
    fontSize: SIZES.small,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    gap: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  resetText: {
    color: COLORS.grayDark || "#333",
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  applyButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});