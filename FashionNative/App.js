import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';

import { Router, Route, Switch } from 'react-router-native';
import axios from 'react-native-axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topPictureList: {},
      displayPicArr: [],
    }
    this.getTopPictureUrls = this.getTopPictureUrls.bind(this);    
  }
  getTopPictureUrls(){
    axios.get("http://localhost:192.168.0.89/pictures")
        .then(response => {
            let arr = [];
            for (let key in response.data) {
            let img_url_crop = response.data[key].picture_url.replace('upload/', 'upload/w_500,h_500/');
            console.log(img_url_crop);
            arr.push(<View><Image id={key} onPress={this.handleShowModal} source={{uri: img_url_crop}} style={styles.imgDisplay}/></View>)
            }
            this.setState({
                topPictureList: response.data,
                displayPicArr: arr,
            })
            
        })
        .catch( err => {
            console.log(err)
        })
  }
  
  componentDidMount() {
    this.getTopPictureUrls();
  }

  render() {
    // const picArray = ['https://events.ucsb.edu/wp-content/uploads/2018/05/thumbnail-1-280x280.jpg', 'https://static.spin.com/files/2017/03/13339581_1067391013307733_3016733990114982507_n-1490022683-640x640.jpg', 'https://consequenceofsound.files.wordpress.com/2016/07/screen-shot-2016-07-14-at-10-01-41-am.png?w=807'];

    // const pics = picArray.map((pic, index) => {
    //   return <Image uniqueID={index} source={{uri: pic}} style={styles.imgDisplay}/>
      
    // })

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>FASHION NATIVE! YAY!!!</Text>
          {this.state.displayPicArr}
        </View>
      </ScrollView>
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
  imgDisplay: {
    borderWidth: 1.5,
    // borderRight: 1.5,
    borderColor: 'white',
    // animation: 2s ease-out 0s fadeInOpac;,
    width: 300,
    height: 300
  }
});
