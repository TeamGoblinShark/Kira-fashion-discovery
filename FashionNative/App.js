import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router, Route, Switch } from 'react-router-native';
import axios from 'react-native-axios';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FASHION NATIVE! YAY!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
