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
      icon: (obj) => {
        const image = obj.focused ? require('../../../images/my_pre.png') : require('../../../images/my_nor.png')
        return <Image style={{ height:25, width: 25}}
                      source={image}
        />
      }
    },
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.token);
  }

  _cancelOrder(order){
    this.props.cancelOrder(this.props.token, order.id);
  }

  render() {
    let userOrder = this.props.userOrder.length > 0 ? this.props.userOrder[0] : {};
    let userCourse = this.props.userCourses && this.props.userCourses.length > 0 ? this.props.userCourses[0] : {};
    return (<User userInfo={this.props.userInfo} userOrder={userOrder}
                  fetchOrder={this.props.fetchOrder.bind(this)}
                  cancelOrder={this._cancelOrder.bind(this)}
                  userCourse={userCourse} rootNavigation={this.props.screenProps.rootNavigation}/>)
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
    },
    cancelOrder: (token, id) => {
      return dispatch(orderActions.cancelOrder(token, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)