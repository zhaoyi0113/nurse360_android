import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text, Navigator, Image, InteractionManager} from "react-native";
import Home from "../components/home";
import * as notificationActions from "../../../actions/notification_actions";
import * as studyActions from "../../../actions/study_actions";
import * as orderActions from "../../../actions/order_actions";

import Orientation from 'react-native-orientation';


class HomeContainer extends Component {
  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: (obj) => {
        const image = obj.focused ? require('../../../images/home_pre.png') : require('../../../images/home_nor.png');
        return <Image style={{resizeMode:'contain', height:40, width:40}}
                      source={image}
        />
      },
    },
  }

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    const promises = [this.props.queryNotification(this.props.token),
      this.props.queryStudyCourses(this.props.token),
      this.props.queryOrders(this.props.token)];
    const that = this;
    Promise.all(promises).then((v) => {
      if (that.home) {
        that.home._endRefresh();
      }
    }).catch(() => that.home._endRefresh());

  }

  render() {
    return (<Home rootNavigation={this.props.screenProps.rootNavigation}
                  _refresh={this._refresh.bind(this)}
                  readNotification={(id)=>this.props.readNotification(this.props.token, id)}
                  readStudyCourse={(id)=>this.props.readStudyCourse(this.props.token, id)}
                  queryNotification={()=>this.props.queryNotification(this.props.token)}
                  queryStudyCourses={()=>this.props.queryStudyCourses(this.props.token)}
                  queryOrders={()=>this.props.queryOrders(this.props.token)}
                  ref={(home)=>this.home=home} orders={this.props.orders}
                  fetchOrder={(order)=>this.props.fetchOrder(this.props.token, order)}
                  courses={this.props.courses} notifications={this.props.notifications}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    courses: state.study.courses,
    notifications: state.notification.notifications,
    orders: state.order.orders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryNotification: (token) => {
      return dispatch(notificationActions.queryNotification(token, 0, 2));
    },
    queryStudyCourses: (token) => {
      return dispatch(studyActions.queryStudyCourses(token, 0, 2));
    },
    queryOrders: (token) => {
      return dispatch(orderActions.queryOrders(token, 0, 2));
    },
    fetchOrder: (token, order) => {
      return dispatch(orderActions.fetchOrder(token, order.id));
    },
    readNotification: (token, id) => {
      return dispatch(notificationActions.readNotification(token, id));
    },
    readStudyCourse: (token, id) => {
      return dispatch(studyActions.readStudyCourse(token, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)