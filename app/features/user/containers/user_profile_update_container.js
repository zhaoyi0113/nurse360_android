import React from 'react';
import {connect} from 'react-redux';

import UserProfileUpdate from '../components/user_profile_update';
import * as actions from '../../../actions/user_actions';
import {header} from '../../../components/navigation_header';

class UserProfileUpdateContainer extends React.Component {

  static navigationOptions = {
    title: '个人资料',
    cardStack: {
      gesturesEnabled: true,
    },
    header:header,
  }

  render(){
    return (<UserProfileUpdate userInfo={this.props.userInfo}/>)
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileUpdateContainer)