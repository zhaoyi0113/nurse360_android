import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions/user_actions";
import User from "../components/user";


class UserContainer extends Component {

  componentDidMount() {
    this.props.getUserInfo(this.props.token);
  }

  render() {
    let userOrder = this.props.userOrder.length > 0 ? this.props.userOrder[0] : {};
    let userCourse = this.props.userCourses.length > 0 ? this.props.userCourses[0] : {};
    return (<User userInfo={this.props.userInfo} userOrder={userOrder} userCourse={userCourse} navigator={this.props.navigator}/>)
  }

}

UserContainer.propTypes = {
  userOrders: React.PropTypes.array,
  userCourses: React.PropTypes.array,
}

UserContainer.defaultProps = {
  userOrder: [],
  userCourses: [],
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
    userOrder: state.user.userOrder,
    userCourses: state.user.userCourses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (token) => {
      dispatch(actions.getUserInfo(token));
      dispatch(actions.getUserOrder(token, 0, 1));
      dispatch(actions.getUserHistoryCourse(token, 0, 1));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)