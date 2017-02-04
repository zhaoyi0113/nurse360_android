import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions/user_actions";
import User from "../components/user";

class UserContainer extends Component {

  componentDidMount() {
    this.props.getUserInfo(this.props.token);
  }

  render() {
    return (<User userInfo={this.props.userInfo} userOrder={this.props.userOrder}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
    userOrder: state.user.userOrder,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (token) => {
      dispatch(actions.getUserInfo(token));
      dispatch(actions.getUserOrder(token, 0, 1));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)