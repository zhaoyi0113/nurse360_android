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
    header: header,
  }

  _updateUserInfo(userInfo) {
    this.props.updateUserInfo(this.props.token, userInfo)
      .then(v => this.props.navigation.goBack());
  }

  render() {
    return (<UserProfileUpdate userInfo={this.props.userInfo}
                               updateUserInfo={this._updateUserInfo.bind(this)}/>)
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
    updateUserInfo: (token, userInfo) => {
      return dispatch(actions.updateUserInfo(token, userInfo));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileUpdateContainer)