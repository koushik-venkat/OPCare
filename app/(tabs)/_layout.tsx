import { Tabs } from "expo-router";
import AnimatedTabButton from "@/components/AnimatedTabButton";
import { COLORS, SIZES } from "@/config/tabContainer";
import { View } from "react-native";

export default function TabLayout() {
  const tabElements = [
    { name: "index", title: "Home", icon: "home" },
    { name: "search", title: "Search", icon: "search" },
    { name: "bookings", title: "Bookings", icon: "calendar" },
    { name: "settings", title: "Settings", icon: "user" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.backgroundLight,
            height: 65, 
            borderWidth: 1,
            bprderColor: COLORS.border,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            elevation: 3,
            // Add overflow hidden to prevent content from showing outside the rounded corners
            overflow: 'hidden',
          },
          // Apply a background color to the tab bar background
          tabBarBackground: () => (
            <View 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0,
                height: 80, 
                backgroundColor: COLORS.white,
              }} 
            />
          ),
        }}
      >
        {tabElements.map(({ name, title, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarButton: (props) => (
                <AnimatedTabButton {...props} icon={icon} title={title} />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}