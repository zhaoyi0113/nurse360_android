import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text,Image} from 'react-native';

class PatientContainer extends Component {

  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Image style={{resizeMode:'contain', width:25, height: 25}}
          source={require('../../../images/patient_pre.png')}
        />
      ),
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