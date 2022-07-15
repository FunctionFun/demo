import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
