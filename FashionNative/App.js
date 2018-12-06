import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, CameraRoll } from 'react-native';

import { NativeRouter, Router, Route, Switch, Link } from 'react-router-native';
import axios from 'react-native-axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      topPictureList: {},
      displayPicArr: [],
      photos: []
    }
    this.getTopPictureUrls = this.getTopPictureUrls.bind(this);    
    this._handleButtonPress = this._handleButtonPress.bind(this);
  }
  getTopPictureUrls() {
    axios.get("http://192.168.0.89:3000/pictures")
      .then(response => {
        let arr = [];
        for (let key in response.data) {
        let img_url_crop = response.data[key].picture_url.replace('upload/', 'upload/w_500,h_500/');

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
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
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
            {/* {this.state.displayPicArr} */}
            <Button title="Load Images" onPress={this._handleButtonPress} />
            {this.state.photos.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{ uri: p.node.image.uri }}
                />
                );
              })}
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
    paddingTop: 50
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
