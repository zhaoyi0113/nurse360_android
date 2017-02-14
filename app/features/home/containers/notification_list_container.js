import React from 'react';
import {connect} from 'react-redux';
import CategoryView from '../../../components/category_view';

import * as actions from '../../../actions/notification_actions';

class NotificationListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    this.loadMoreData();
  }

  componentWillUnmount(){
    this.props.queryNotification(this.props.token, 0, 2);
  }

  loadMoreData() {
    this.props.queryNotification(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  render() {
    return (
      <CategoryView title='通知' description='医院通知信息'
                    list={this.props.notifications}
                    loadMoreData={this.loadMoreData.bind(this)}
                    image={require('../../../images/notification/inform_blue.png')}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryNotification: (token, index, number) => {
      return dispatch(actions.queryNotification(token, index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer)