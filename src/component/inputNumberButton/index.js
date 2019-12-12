import React from 'react';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomText: {
    color: '#fff',
    fontSize: 25,
  },
});

export default function inputNumberButton({value, handleOnPress}) {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(value)}
      style={styles.container}>
      <Text style={styles.buttomText}>{value}</Text>
    </TouchableOpacity>
  );
}
