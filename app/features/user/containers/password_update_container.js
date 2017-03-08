import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import sha1 from 'sha1';
import PasswordUpdate from '../components/password_update';
import {header} from '../../../components/navigation_header';
import * as actions from '../../../actions/user_actions';

class PasswordUpdateContainer extends React.Component {

  static navigationOptions = {
    title: '修改密码',
    header: header,
  }

  _changePassword(oldPwd, newPwd) {
    if (sha1(oldPwd) !== this.props.userInfo.password) {
      Alert.alert(
        '',
        '原密码输入错误',
        [
          {text: '确定'},
        ],
      );
      return;
    }
    if (oldPwd === newPwd) {
      Alert.alert(
        '',
        '密码不能相同',
        [
          {text: '确定'},
        ],
      );
      return;
    }
    this.props.changePassword(this.props.token, oldPwd, newPwd)
      .then(v => {
        if(!v.error) {
          Alert.alert(
            '',
            '修改密码成功',
            [
              {text: '确定', onPress: () => this.props.navigation.goBack()},
            ],
          );
        }
      })
      .catch(err => {

        Alert.alert(
          '',
          '修改密码失败',
          [
            {text: '确定'},
          ],
        );
      });
  }

  _forgetPassword() {
    this.props.navigation.navigate('ForgetPassword');
  }

  render() {
    return (<PasswordUpdate userInfo={this.props.userInfo} changePassword={this._changePassword.bind(this)}
                            forgetPassword={this._forgetPassword.bind(this)}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo
  }
}

const mapDispatcToProps = (dispatch) => {
  return {
    changePassword: (token, oldPwd, newPwd) => {
      return dispatch(actions.changePassword(token, oldPwd, newPwd));
    }
  }
}

export default connect(mapStateToProps, mapDispatcToProps)(PasswordUpdateContainer);