import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, CameraRoll, TouchableHighlight, NativeModules } from 'react-native';

import { NativeRouter, Router, Route, Switch, Link } from 'react-router-native';
import ImagePicker from 'react-native-image-picker';

import axios from 'react-native-axios';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      topPictureList: {},
      displayPicArr: [],
      photos: [],

      uploadedFileCloudinaryUrl : null,
      uploadedSuccess: null,
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

  // share = () => {
  //   const image = this.state.photos[this.state.index].node.image.uri
  //   RNFetchBlob.fs.readFile(image, 'base64')
  //   .then((data) => {
  //     let shareOptions = {
  //       title: "React Native Share Example",
  //       message: "Check out this photo!",
  //       url: `data:image/jpg;base64,${data}`,
  //       subject: "Check out this photo!"
  //     }

  //     Share.open(shareOptions)
  //       .then((res) => console.log('res:', res))
  //       .catch(err => console.log('err', err))
  //   })
  // }

  onImageDrop = (filePath) => {

    console.log('filePath: ', filePath)



   
    // const uploads = filePath.map(image => {

    //   const formData = new FormData();
    //   formData.append("file", '/private/var/mobile/Media/DCIM/IMG_3492');
    //   formData.append("upload_preset", "gntgkm6s"); // Replace the preset name with your own
    //   formData.append("api_key", 693143847159238); // Replace API key with your own Cloudinary API key
    //   formData.append("timestamp", (Date.now() / 1000) | 0);
    //   console.log('formData: ', formData)
    //   // Replace cloudinary upload URL with yours
    //   return axios.post(
    //     "https://api.cloudinary.com/v1_1/dlfe1l6id/image/upload",
    //     formData, 
    //     { headers: { "X-Requested-With": "XMLHttpRequest" }})
    //     .then(response => {
    //       console.log(response)
    //       this.setState({
    //         uploadedFileCloudinaryUrl : response.data.url,
    //         uploadedSuccess: true,
    //       })
    //       console.log(response.data.url)
    //     })
    //     .catch(err => console.log(err))
  }
  // handleUrlAndTextSubmit(){
  //   event.preventDefault();
  //   //needs to change eventually probably
  //   axios.post("http://localhost:3000/uploadPicture", {
  //     userUuid: this.state.userUuid,
  //     uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl,
  //     uploadText: this.state.uploadText,
  //     uploadStyleClickNightOut: this.state.uploadStyleClickNightOut,
  //     uploadStyleClickOutDoor: this.state.uploadStyleClickOutDoor,
  //   })
  //   .then(response => {
  //     console.log('response is working')
  //     console.log(response);
  //   })
  //   .catch( err => {
  //     console.log(err)
  //   })

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
    })
  }
  
  componentDidMount() {
    this.getTopPictureUrls()
  }

  handleToggleLike = (e, props) => {
    console.log('pressed', e.target, props.source)
    alert('pressed!')
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      
      console.log("response: ", response);
    });
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
            <Button
              title="Choose Photo"
              onPress={this.handleChoosePhoto}
            />
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

{/*
<Button title="Load Images" onPress={this._handleButtonPress} />
{this.state.photos.map((p, i) => {
  return (
    <TouchableHighlight 
      onPress={() => this.onImageDrop(p)}>
      <Image
        key={i}
        style={{
          width: 100,
          height: 100,
        }}
        source={{ uri: p.node.image.uri }}
      />
    </TouchableHighlight>
    );
  })}

*/}