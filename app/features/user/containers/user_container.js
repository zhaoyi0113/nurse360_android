import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions/user_actions";
import User from "../components/user";
import {Image} from 'react-native';
import * as orderActions from '../../../actions/order_actions';

class UserContainer extends Component {
  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Image style={{ height:25, width: 25}}
          source={require('../../../images/my_pre.png')}
        />
      ),
    },
  }
  componentDidMount() {
    this.props.getUserInfo(this.props.token);
  }

  render() {
    let userOrder = this.props.userOrder.length > 0 ? this.props.userOrder[0] : {};
    let userCourse = this.props.userCourses.length > 0 ? this.props.userCourses[0] : {};
    return (<User userInfo={this.props.userInfo} userOrder={userOrder}
                  fetchOrder={this.props.fetchOrder.bind(this)}
                  userCourse={userCourse} navigator={this.props.navigator}/>)
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
    fetchOrder: (token, id) => {
      dispatch(orderActions.fetchOrder(token, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)