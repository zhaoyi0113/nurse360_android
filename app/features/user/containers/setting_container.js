import React from 'react';
import {connect} from 'react-redux';

import Setting from '../components/setting';
import * as actions from '../../../actions/login_actions';
import {header} from '../../../components/navigation_header';

class SettingContainer extends React.Component {

  static navigationOptions = {
    title: '设置',
    header:header,
  }

  render() {
    return (<Setting navigation={this.props.navigation} logout={()=> this.props.logout(this.props.token)}/>)
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
    logout: (token) => {
      dispatch(actions.logout(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);