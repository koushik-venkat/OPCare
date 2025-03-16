import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));
  
  const COLORS = {
    primary: "#2A9D8F",
    primaryDark: "#21867A",
    primaryLight: "#A7E0D6",
    secondary: "#6C757D",
    white: "#FFFFFF",
    background: "#E9F5F2",
    accent: "#E76F51",
  };
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      useNativeDriver: true,
    }).start();
    
    // Loading dots animation
    Animated.loop(
      Animated.sequence([
        // Dot 1 animation
        Animated.timing(dot1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 2 animation
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 3 animation
        Animated.timing(dot3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Reset all dots
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        <Text style={[styles.title, { color: COLORS.primary }]}>OP Care</Text>
        
        <Text style={[styles.tagline, { color: COLORS.secondary }]}>
          Trusted Doctors, Hassle-Free Appointments
        </Text>
        
        <View style={styles.loadingContainer}>
          <Animated.View style={[
            styles.loadingDot, 
            { 
              backgroundColor: COLORS.primary,
              opacity: fadeAnim,
              transform: [{
                scale: dot1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.2]
                })
              }]
            }
          ]} />
          <Animated.View style={[
            styles.loadingDot, 
            { 
              backgroundColor: COLORS.primary,
              opacity: fadeAnim,
              transform: [{
                scale: dot2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.2]
                })
              }]
            }
          ]} />
          <Animated.View style={[
            styles.loadingDot, 
            { 
              backgroundColor: COLORS.primary,
              opacity: fadeAnim,
              transform: [{
                scale: dot3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.2]
                })
              }]
            }
          ]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SplashScreen;