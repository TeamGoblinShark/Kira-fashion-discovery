import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, TouchableHighlight,  NavigatorIOS } from 'react-native';

import { NativeRouter, Router, Route, Switch, Link } from 'react-router-native';
import PicDetail from './PicDetail'
import axios from 'react-native-axios';

export default class NavigatorIOSApp extends Component {
    render() {
        return (
          <NavigatorIOS
            initialRoute={{
              component: App,
              title: 'Main',
            }}
            style={{flex: 1}}
          />
        );
      }
}

const Pic = () => (
  <View style={styles.container}>
    <View style={{backgroundColor: 'white'}} />
      <Text style={{ fontSize: 36 }}>1 bag of popcorn; stale</Text>
    </View>
)

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  // getAllPictures = () => {
  //   axios.get("http://192.168.0.89:3000/pictures")
  //     .then(res => console.log(res))
  //     // .then(data => console.log(data))
  //     .catch(err => console.log(err))
  // }

  // componentDidMount() {
  //   this.getAllPictures()
  // }

  render() {

    const picArray = [
      'https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg',
      'https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807', 
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
      'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807',
      'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 
    ];

    const navigateToDetail = ({ uri, id }) => this.props.navigator.push({
      component: PicDetail,
      title: 'Congratulations you won the prize!',
      passProps: { uri, id },
    })
    
    const picToComponent = (pic, id) => (
      <TouchableHighlight onPress={() => navigateToDetail({ uri: pic, id })}>
        <Image uniqueID={id} source={{uri: pic}} style={styles.imgDisplay} />
      </TouchableHighlight>
    )

    const pics = picArray.map(picToComponent)
      const picRoute = {
        component: Pic,
        title: 'Pictures',
      }
    return (
      <View style={styles.container}>
        <View>
          <View style={{backgroundColor: 'white'}} />
          <Text style={{ fontSize: 36 }}>FASHION NATIVE</Text>
        </View>
        <Button title="Press for a pic" onPress={() => this.props.navigator.push(picRoute)} />
        <ScrollView style={{width: 400}}>
          {pics}
        </ScrollView>
      </View>
    )
  }
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
    width: 150,
    height: 150
  }
})
