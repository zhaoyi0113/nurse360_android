import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text} from "react-native";
import Login from "../components/login";
import * as actions from "../../../actions/login_actions";

class LoginContainer extends Component {

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