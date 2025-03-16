import { FontAwesome } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import { Animated, Pressable, Text, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "@/config/tabContainer";

interface AnimatedTabProps {
  icon: string;
  title: string;
  onPress: () => void;
  accessibilityState?: { selected?: boolean }; // Made optional
}

const AnimatedTabButton = ({ icon, title, onPress, accessibilityState }: AnimatedTabProps) => {
  const isSelected = accessibilityState?.selected || false; // Avoid undefined issues

  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.1 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(isSelected ? 1 : 0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isSelected ? 1.1 : 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isSelected ? 1 : 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View
        style={[
          styles.button,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <FontAwesome
          name={icon}
          size={SIZES.icon - 8}
          color={isSelected ? COLORS.primary : COLORS.grayDark}
        />
        <Text style={[styles.text, { color: isSelected ? COLORS.primary : COLORS.grayDark }]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedTabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: SIZES.small,
    marginTop: 2,
    fontWeight: "600",
  },
});
