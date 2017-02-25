import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text,Image} from 'react-native';

class PatientContainer extends Component {

  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: (obj) => {
        const image = obj.focused ? require('../../../images/patient_pre.png') : require('../../../images/patient_nor.png');
        return <Image style={{resizeMode:'contain', width:25, height: 25}}
                      source={image}
        />
      }
    },
  };

  render() {
    return (<View>
      <Text>敬请期待</Text>
    </View>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer)