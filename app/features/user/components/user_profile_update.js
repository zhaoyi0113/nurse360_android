import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, Button, KeyboardAvoidingView, Dimensions} from 'react-native';
import Line from '../../../components/line';
import {colors} from '../../../constants';

export default class UserProfileUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {userInfo} = this.props;
    if (userInfo) {
      if (!this.state.name) {
        this.setState({name: userInfo.name});
      }
      if (!this.state.age) {
        this.setState({age: userInfo.age});
      }
      if (!this.state.gender) {
        this.setState({gender: userInfo.gender});
      }
      if (!this.state.hospitalName) {
        this.setState({hospitalName: userInfo.hospitalName});
      }
      if (!this.state.departmentName) {
        this.setState({departmentName: userInfo.departmentName});
      }
    }
  }

  render() {
    let {userInfo} = this.props;

    return (<View style={styles.container} behavior='height'>
      <View style={{height: Dimensions.get('window').height*0.7}}>
        <Text style={{alignSelf: 'flex-start', margin:5 }}>修改个人资料</Text>
        <View style={styles.row}>
          <Text style={styles.label}>头像</Text>
          <View style={{flex:1}}/>
          <Image style={{height:40, width: 40, borderRadius: 20, marginRight: 10}}
                 source={{uri: userInfo.profilePhotoUrl}}/>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>姓名</Text>
          <View style={{flex:1}}/>
          <TextInput style={{width:100, textAlign:'right'}} underlineColorAndroid='transparent'
                     onChangeText={(text)=>this.setState({name:text})}>{this.state.name}</TextInput>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>年龄</Text>
          <View style={{flex:1}}/>
          <TextInput style={{width:100, textAlign:'right'}} underlineColorAndroid='transparent'
                     keyboardType='numeric'>{this.state.age}</TextInput>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>性别</Text>
          <View style={{flex:1}}/>
          <Text style={this.state.gender === 'MALE'?styles.genderSelected:styles.genderUnselected}>男</Text>
          <Text style={this.state.gender === 'FEMALE'?styles.genderSelected:styles.genderUnselected}>女</Text>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text style={styles.label}>医院</Text>
          <View style={{flex:1}}/>
          <Text>{this.state.hospitalName}</Text>
          <Image style={styles.nextImage} source={require('../../../images/next_gray.png')}/>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text>科室</Text>
          <View style={{flex:1}}/>
          <Text>{this.state.departmentName}</Text>
          <Image style={styles.nextImage} source={require('../../../images/next_gray.png')}/>
        </View>
        <Line/>
        <View style={styles.row}>
          <Text>资质认证</Text>
        </View>
      </View>
      <View style={styles.row}/>

      <Button title='保存' style={{ position: 'absolute', bottom: 10}}/>
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
