import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Navigator} from 'react-native';

import Home from '../components/home';
import * as notificationActions from '../../../actions/notification_actions';
import * as studyActions from '../../../actions/study_actions';
import * as orderActions from '../../../actions/order_actions';

class HomeContainer extends Component {

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    const promises = [this.props.queryNotification(this.props.token),
      this.props.queryStudyCourses(this.props.token),
      this.props.queryOrders(this.props.token)];
    const that = this;
    Promise.all(promises).then((v) => {
      that.home._endRefresh();
    }).catch(() => that.home._endRefresh());
  }

  render() {
    return (<Home navigator={this.props.navigator}
                  _refresh={this._refresh.bind(this)}
                  queryNotification={()=>this.props.queryNotification(this.props.token)}
                  queryStudyCourses={()=>this.props.queryStudyCourses(this.props.token)}
                  queryOrders={()=>this.props.queryOrders(this.props.token)}
                  ref={(home)=>this.home=home} orders={this.props.orders}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)