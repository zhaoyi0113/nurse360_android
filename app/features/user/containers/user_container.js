import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as actions from '../../../actions/user_actions';
import User from '../components/user';

class UserContainer extends Component {

  componentDidMount() {
    this.props.getUserInfo(this.props.token);
  }

  render() {
    return (<User userInfo={this.props.userInfo}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (token) => {
      dispatch(actions.getUserInfo(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)