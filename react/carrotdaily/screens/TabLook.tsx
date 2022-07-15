import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function TabCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Category</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
