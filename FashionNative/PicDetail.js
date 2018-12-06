import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, TouchableHighlight,  NavigatorIOS } from 'react-native';

export default function (props) {
  return (
    <View>
      <Image source={{uri: props.uri}} style={styles.imgDisplay} /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

    paddingTop: 50
  },
  imgDisplay: {

    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.25,
    // borderRight: 1.5,
    borderColor: 'white',
    // animation: 2s ease-out 0s fadeInOpac;,
    width: 300,
    height: 800
  }
})