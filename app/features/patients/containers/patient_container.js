import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';

import Patient from '../components/patient';

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

  _refresh(){

  }

  render() {
    const {rootNavigation} = this.props.screenProps;
    return (<Patient navigation={rootNavigation} refresh={this._refresh.bind(this)}/>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer)