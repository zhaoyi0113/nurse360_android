import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';

class PatientContainer extends Component {

  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: (obj) => {
        const image = obj.focused ? require('../../../images/patient_pre.png') : require('../../../images/patient_nor.png');
        return <Image style={{resizeMode:'contain', width:40, height: 40}}
                      source={image}
        />
      }
    },
  };

  render() {
    const {navigate} = this.props.screenProps.rootNavigation;
    return (<TouchableWithoutFeedback onPress={()=>navigate('Patient')}>
      <View style={{marginTop: 100}}><Text>敬请期待</Text></View>
    </TouchableWithoutFeedback>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer)