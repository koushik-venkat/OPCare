import { View } from 'react-native';
import SplashScreenComponent from '@/components/SplashScreen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to tabs after the splash screen duration
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1 }}>
      <SplashScreenComponent />
    </View>
  );
}