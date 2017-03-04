import React from 'react';
import {View, StyleSheet, CameraRoll, Text, Image, TouchableHighlight,Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';

export default class ImageSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {images: []};
  }

  _showImagePicker() {
    const options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let images = this.state.images;
        images.push({source: source});
        this.setState({images: images});
      }
    });
  }

  render() {
    const images = this.state.images.slice(0);
    if(images.length<9) {
      images.push({id: -1, source: require('../images/user/mustaddpic.png')});
    }
    let left = 0;
    if (images.length % 3 !== 0) {
      left = 3 - images.length % 3;
    }
    _.times(left, () => {
      images.push({id: -2});
    });
    const newImages = images.reduce((accu, value, index) => {
      return ((index % 3) === 0 ? accu.push([value]) : accu[accu.length - 1].push(value)) && accu;
    }, []);
    return (<View style={styles.container}>
      {
        newImages.map((images, i) => {
          return <View key={i} style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
            {
              images.map((image, i) => {
                if (image.id === -1) {
                  return <TouchableHighlight key={i} underlayColor='lightgray' style={{flex:0.3, margin:5}}
                                             onPress={()=> this._showImagePicker()}>
                    <Image style={styles.image} source={image.source}/>
                  </TouchableHighlight>
                } else if (image.id === -2) {
                  return <View key={i} style={{flex:0.3, margin:5}}/>
                }
                return <Image key={i} source={image.source} style={styles.image}/>
              })
            }
          </View>
        })

      }
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    margin: 5,
    resizeMode: 'contain',
    height: Dimensions.get('window').width/3.5,
    width: Dimensions.get('window').width/3.5,
  }
})