import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import sha1 from 'sha1';
import Login from '../components/login';
import * as actions from '../../../actions/login_actions';
import axios from 'axios';

class LoginContainer extends Component {

  login(mobile, password){
    console.log('login ', mobile, sha1(password));

    axios.post('https://www.nurse-go.cn:9100/nurse/login')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (<Login login={(mobile, password)=> this.props.login(mobile,password)}/>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (mobile, password) => {

      dispatch(actions.login(mobile, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)