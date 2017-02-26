import React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, Image, TouchableHighlight} from 'react-native';

import CommonHeader from './common_header';
import TechnicalTitlesPicker from './technical_titles_picker';

export default class RegisterOccupationInfo extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {hospital, department} = this.props.screenProps;
    let hospitalName = '';
    if (hospital) {
      hospitalName = hospital.name;
    }
    let departmentName = '';
    if (department) {
      departmentName = department.name;
    }
    return (<View style={styles.container}>
      <CommonHeader headerImage={require('../../../images/login/loginhead.png')}
                    textImage={require('../../../images/login/registerFont.png')}
                    text="护士工作信息"/>

      <View style={styles.input_view}>
        <View style={styles.input_row}>
          <Text style={styles.input_label}>医院</Text>
          <Text style={styles.input_text}
                onPress={()=>this.props.navigation.navigate('HospitalSelection')}>{hospitalName}</Text>
          <Image style={styles.image} source={require('../../../images/next_gray.png')}/>
        </View>
        <View style={styles.input_row}>
          <Text style={styles.input_label}>科室</Text>
          <Text style={styles.input_text} onPress={()=>{
            if(hospital){
              this.props.navigation.navigate('DepartmentSelection');
            }else{
              Alert.alert(
                '',
                '请选择医院',
                [
                  {text: '确定'},
                ]
              )
            }
          }}>{departmentName}</Text>
          <Image style={styles.image} source={require('../../../images/next_gray.png')}/>
        </View>
        <View style={styles.input_row}>
          <Text style={styles.input_label}>职称</Text>
          <TechnicalTitlesPicker style={styles.input_text} hidden={false}
                                 onValueChange={(t)=>{
                                   this.setState({title: t});
                                   this.props.screenProps.selectJobTitle(t);
                                 }}/>
        </View>
      </View>
      <View style={styles.register_button}>
        <Button title="完成" onPress={this.props.screenProps.register.bind(this)}
                disabled={!hospital || !department || !this.state.title}/>
      </View>
      <TouchableHighlight onPress={()=>this.props.navigation.goBack()} underlayColor="lightgray">
        <Text style={{textAlign:'center'}}>返回上一步</Text>
      </TouchableHighlight>
      <View style={{flex: 4}}/>
    </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input_view: {
    flex: 2.8,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f6f6f6',
  },
  input_row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  input_label: {
    flex: 1,
    height: 30,
    margin: 10,
    color: 'lightgray',
  },
  image: {
    height: 15,
    resizeMode: 'contain',
    flex: 1,
  },
  input_text: {
    height: 30,
    flex: 4,
    color: 'black',
  },
  register_button: {
    flex: 1,
    marginHorizontal: 10,
  },
});