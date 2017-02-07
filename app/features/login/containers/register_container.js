import React from 'react';
import {connect} from 'react-redux';

import Register from '../components/register';
import * as actions from '../../../actions/login_actions';

class RegisterContainer extends React.Component {

  render() {
    return (<Register goLogin={this.props.goLogin.bind(this)} requestSmsCode={this.props.requestSmsCode}/>)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSmsCode: (mobile) => {
      if(!mobile){
        return;
      }
      dispatch(actions.requestSmsCode(mobile));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)