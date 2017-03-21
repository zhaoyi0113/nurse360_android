import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  CameraRoll,
  TouchableHighlight,
  ScrollView,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import ImageWithIcon, {Position} from '../../../components/image_with_icon';

import {colors, FontSize} from '../../../constants';

export default class Qualification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      work: {id: 1, image: require('../../../images/user/mustaddpic.png'), label: '工作证'},
      qual: {id: 2, image: require('../../../images/user/mustaddpic.png'), label: '护士资格证'},
      must: {id: 3, image: require('../../../images/user/addpic1.png')},
      otherImages: []
    }
  }

  _clickImage(image) {
    const options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
    };
    const that = this;
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
        let images = this.state.otherImages;
        CameraRoll.saveToCameraRoll('file://' + response.path).then((res) => {
          console.log('save to ', res);
          switch (image.id) {
            case 1:
              const work = {...this.state.work, image: {uri: res}, updated: true, showDelete: true};
              this.setState({work: work});
              break;
            case 2:
              const qual = {...this.state.qual, image: {uri: res}, updated: true, showDelete: true};
              this.setState({qual});
              break;
            case 3:
              images.push({image: {uri: res}, id: 4 + this.state.otherImages.length, showDelete: true});
              that.setState({otherImages: images});
              break;
            default:
              const img = _.find(that.state.otherImages, (i) => {
                return i.id === image.id
              });
              img.image.uri = res;
              img.showIcon = true;
              that.setState({otherImages: that.state.otherImages});
              break;
          }
        });
      }
    });
  }

  _removeImage(image) {
    console.log('remove image ', image)
    switch (image.id) {
      case 1:
        this.setState({
          work: {
            ...this.state.work,
            showDelete: false,
            image: require('../../../images/user/mustaddpic.png')
          }
        });
        break;
      case 2:
        this.setState({
          qual: {
            ...this.state.qual,
            image: require('../../../images/user/mustaddpic.png'),
            showDelete: false
          }
        });
        break;
      default:
        const images = _.remove(this.state.otherImages, (i) => {
          return i.id === image.id
        });
        console.log('remove image ', this.state.otherImages.length);
        this.setState({otherImages: this.state.otherImages});
        break;

    }
  }

  _submit() {
    const images = [];
    if (this.state.work.updated) {
      images.push({image: this.state.work.image, type: 'QUALIFICATION'});
    }
    if (this.state.qual.updated) {
      images.push({image: this.state.qual.image, type: 'EMPLOYEES_CARD'});
    }
    this.state.otherImages.map((image) => {
      images.push({image: image.image, type: 'OTHER'});
    });
    this.props.upload(images);
  }

  render() {
    const images = [];
    let index = 2;
    const otherImages = this.state.otherImages.concat([]);
    otherImages.push(this.state.must);
    images.push([this.state.work, this.state.qual]);
    for (let i = 0; i < otherImages.length; i++, index++) {
      if (index % 3 === 0) {
        images.push([]);
      }
      images[images.length - 1].push(otherImages[i]);
    }

    return (<View style={styles.container}>
      <Text style={styles.info}> *请分别上传工作证、护士资格证照片等作为证明的材料。如有其它资质证件,请在后面的\"+\"号内上传。
      </Text>
      <ScrollView style={styles.image_container}>
        {
          images.map((imageArray, i) => {
            return <View key={i} style={{flexDirection: 'row'}}>
              {
                imageArray.map((image, j) => {
                  return <TouchableHighlight key={j} style={styles.image_view} underlayColor='transparent'
                                             onPress={()=>this._clickImage(image)}>
                    <View>
                      <ImageWithIcon imageStyle={styles.image_item}
                                     iconPosition={Position.TOP_RIGHT}
                                     clickIcon={this._removeImage.bind(this, image)}
                                     showIcon={image.showDelete}
                                     source={image.image}
                                     icon={require('../../../images/deletePics.png')}/>
                      {/*<Image style={styles.image_item} source={image.image}/>*/}
                      {image.label ?
                        <Text style={{textAlign: 'center', color: 'lightgray'}}>{image.label}</Text> : null}
                    </View>
                  </TouchableHighlight>
                })
              }
            </View>
          })
        }
      </ScrollView>
      <Button title='完成' onPress={this._submit.bind(this)}/>
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bkColor,
    flex: 1,
  },
  info: {
    margin: 10,
    fontSize: FontSize.small,
  },
  image_container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  image_item: {
    width: (Dimensions.get('window').width - 80) / 3,
    height: (Dimensions.get('window').width - 80) / 3,
    margin: 10,
  },
  image_view: {
    flexDirection: 'column',
  }
});