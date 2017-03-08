import React from "react";
import {connect} from "react-redux";
import {Alert} from 'react-native';
import ForgetPassword from "../components/forget_password";
import {header} from "../../../components/navigation_header";
import * as actions from "../../../actions/login_actions";

class ForgetPasswordContainer extends React.Component {

  static navigationOptions = {
    title: '忘记密码',
    header: header,
  }

  _forgetPassword(mobile, verify, newPwd) {
    this.props.forgetPassword(mobile, verify, newPwd)
      .then(v => {
        if(!v.error){
          Alert.alert(
            '',
            '修改密码成功',
            [
              {text: '确定', onPress: () => this.props.navigation.goBack()},
            ],
          );
        }

      });
  }

  render() {
    return (<ForgetPassword requestSmsCode={this.props.requestSmsCode.bind(this)}
                            submit={this._forgetPassword.bind(this)}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSmsCode: (mobile) => {
      return dispatch(actions.requestSmsCode(mobile));
    },
    forgetPassword: (mobile, verify, newPwd) => {
      return dispatch(actions.forgetPassword(mobile, verify, newPwd));
    }
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer);