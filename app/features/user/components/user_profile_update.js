import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Line from '../../../components/line';
import {colors} from '../../../constants';
import ImagePicker from 'react-native-image-picker';

export default class UserProfileUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {userInfo} = this.props;
    if (userInfo) {
      this.setState({...userInfo});
    }
  }

  _updateUserInfo() {
    const gender = this.state.gender === 'MALE' ? '1' : (this.state.gender === 'FEMALE' ? '0' : '2');
    this.props.updateUserInfo({
      real_name: this.state.realName, birthday: this.state.age, gender: gender,
      hospital_id: this.state.hospitalId, department_id: this.state.departmentId
    });
  }

  _imageSelection() {
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
    let {userInfo} = this.props;
    return (<View style={styles.container} behavior='height'>
      <View style={{height: Dimensions.get('window').height*0.7}}>
        <Text style={{alignSelf: 'flex-start', margin:5 }}>修改个人资料</Text>
        <View style={styles.row}>
          <Text style={styles.label}>头像</Text>
          <View style={{flex:1}}/>
          <TouchableHighlight underlayColor='transparent' onPress={this._imageSelection.bind(this)}>
            <Image style={{height:40, width: 40, borderRadius: 20, marginRight: 10}}
                   source={{uri: userInfo.profilePhotoUrl}}/>
          </TouchableHighlight>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>姓名</Text>
          <View style={{flex:1}}/>
          <TextInput style={{width:100, textAlign:'right'}} underlineColorAndroid='transparent'
                     onChangeText={(text)=>this.setState({realName:text})}>{this.state.realName}</TextInput>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>年龄</Text>
          <View style={{flex:1}}/>
          <TextInput style={{width:100, textAlign:'right'}} underlineColorAndroid='transparent'
                     onChangeText={(text)=>this.setState({age: text})}
                     keyboardType='numeric'>{this.state.age}</TextInput>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>性别</Text>
          <View style={{flex:1}}/>
          <Text style={this.state.gender === 'MALE'?styles.genderSelected:styles.genderUnselected}
                onPress={()=>this.setState({gender: 'MALE'})}>男</Text>
          <Text style={this.state.gender === 'FEMALE'?styles.genderSelected:styles.genderUnselected}
                onPress={()=>this.setState({gender: 'FEMALE'})}>女</Text>
        </View>
        <Line/>
        <TouchableHighlight style={{flex:1}} onPress={()=>this.props.navigation.navigate('HospitalSelection')}>
          <View style={styles.row}>
            <Text style={styles.label}>医院</Text>
            <View style={{flex:1}}/>
            <Text>{this.state.hospitalName}</Text>
            <Image style={styles.nextImage} source={require('../../../images/next_gray.png')}/>
          </View>
        </TouchableHighlight>
        <Line/>
        <TouchableHighlight style={{flex:1}} onPress={()=>this.props.navigation.navigate('DepartmentSelection')}>
          <View style={styles.row}>
            <Text>科室</Text>
            <View style={{flex:1}}/>
            <Text>{this.state.departmentName}</Text>
            <Image style={styles.nextImage} source={require('../../../images/next_gray.png')}/>
          </View>
        </TouchableHighlight>
        <Line/>
        <View style={styles.row}>
          <Text>资质认证</Text>
        </View>
      </View>
      <View style={styles.row}/>
      <Button title='保存' style={{ position: 'absolute', bottom: 10}} onPress={this._updateUserInfo.bind(this)}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: colors.bkColor,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'center',
  },
  genderSelected: {
    width: 35,
    height: 30,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: colors.labelColor,
    textAlignVertical: 'center',
    marginHorizontal: 5,
  },
  genderUnselected: {
    width: 35,
    height: 30,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: 'lightgray',
    textAlignVertical: 'center',
  },
  nextImage: {
    height: 20,
    width: 20,
  }
});
