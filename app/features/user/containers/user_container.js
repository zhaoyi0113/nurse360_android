import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class UserContainer extends Component {

  render() {
    return (<View>
      <Text>User Home</Text>
    </View>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)