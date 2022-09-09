import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { core } from 'core';

export default function App() {
  return (
    <SafeAreaProvider>
      <Text>{core}</Text>
    </SafeAreaProvider>
  );
}
