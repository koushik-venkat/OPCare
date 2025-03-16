import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Dashboard from '@/components/dashboard';

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      <Dashboard />
    </View>
  );
};

export default index;