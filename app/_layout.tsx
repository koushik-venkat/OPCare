import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // We can hide the splash screen once everything is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="liked" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="personalInformation" />
        <Stack.Screen name="passwordSecurity" />
        <Stack.Screen name="medicalHistory" />
        <Stack.Screen name="familyProfiles" />
        <Stack.Screen name="helpSupport" />
        <Stack.Screen name="termsPrivacy" />
        <Stack.Screen name="doctor/[id]" />
        <Stack.Screen name="index" />
        <Stack.Screen name="booking/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}