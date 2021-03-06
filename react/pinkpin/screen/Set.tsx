import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function Set() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});