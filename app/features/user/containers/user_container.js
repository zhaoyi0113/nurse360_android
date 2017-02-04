import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as actions from '../../../actions/user_actions';

class UserContainer extends Component {

  componentDidMount(){

  }

  render() {
    return (<View>
      <Text>User Home</Text>
    </View>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)