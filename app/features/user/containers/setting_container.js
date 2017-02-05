import React from 'react';
import {connect} from 'react-redux';

import Setting from '../components/setting';

class SettingContainer extends React.Component {

  render() {
    return <Setting />
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
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);