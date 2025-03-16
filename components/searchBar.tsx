import { View, TextInput, Animated, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { COLORS, SIZES, SPACING } from "@/config/tabContainer";

const SEARCH_PROMPTS = ["Search for doctors...", "Search for clinics...", "Search for hospitals..."];

const SearchBar = ({
  autoFocus = false,
  onSearch,
  width = "100%", // ✅ Custom width prop with default
}: {
  autoFocus?: boolean;
  onSearch?: (text: string) => void;
  width?: string | number; // Accepts percentage or fixed values
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current; // Initialize at 0 instead of 10
  const opacityAnim = useRef(new Animated.Value(1)).current; // Initialize at 1 for immediate visibility
  const [searchText, setSearchText] = useState(SEARCH_PROMPTS[0]);
  const searchIndex = useRef(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<TextInput | null>(null);

  // Handle focus when navigating back to the search tab
  // useFocusEffect(() => {
  //   if (autoFocus) {
  //     setIsFocused(true);
  //     setTimeout(() => inputRef.current?.focus(), 100);
  //   }
  // });

  useEffect(() => {
    if (isFocused) return;

    // Initial animation setup completed - now we can start cycling
    const interval = setInterval(() => {
      Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        searchIndex.current = (searchIndex.current + 1) % SEARCH_PROMPTS.length;
        setSearchText(SEARCH_PROMPTS[searchIndex.current]);

        slideAnim.setValue(10);
        opacityAnim.setValue(0);

        Animated.parallel([
          Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        ]).start();
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <View style={[styles.searchContainer, { width }]}>
      <FontAwesome name="search" size={SIZES.medium} color={COLORS.gray} style={styles.searchIcon} />

      {isFocused ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search for doctors, hospitals..."
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            onSearch?.(text);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setInputValue("");
          }}
          placeholderTextColor={COLORS.gray}
        />
      ) : (
        <Animated.Text
          style={[styles.animatedText, { transform: [{ translateY: slideAnim }], opacity: opacityAnim }]}
          onPress={() => {
            setIsFocused(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        >
          {searchText}
        </Animated.Text>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    marginTop: SPACING.medium,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 2,
    height: 50, // Keeps the search bar height consistent
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    fontSize: SIZES.medium,
    color: COLORS.grayDark,
    flex: 1,
    height: "100%",
    paddingVertical: 12,
  },
  animatedText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    flex: 1,
  },
});