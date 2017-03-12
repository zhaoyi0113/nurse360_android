import React from "react";
import {connect} from "react-redux";
import CategoryView from "../../../components/category_view";
import * as actions from "../../../actions/notification_actions";
import {NOTIFICATION_DETAIL} from "../../../routers";
import {InteractionManager} from 'react-native';
import {header} from '../../../components/navigation_header';

class NotificationListContainer extends React.Component {

  static navigationOptions = {
    title: '通知',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData() {
    this.props.queryNotification(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  render() {
    return (
      <CategoryView title='通知' description='医院通知信息'
                    list={this.props.notifications}
                    loadMaxNumber={this.state.number}
                    loadMoreData={this.loadMoreData.bind(this)}
                    onClick={(data)=>this.props.navigation.navigate('Article',
                               {id: data.id, routeId: NOTIFICATION_DETAIL, title: data.title})}
                    image={require('../../../images/notification/inform_blue.png')}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    notifications: state.notification.notificationList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryNotification: (token, index, number) => {
      return dispatch(actions.queryNotificationList(token, index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer)