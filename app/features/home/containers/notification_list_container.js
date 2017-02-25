import React from 'react';
import {connect} from 'react-redux';
import CategoryView from '../../../components/category_view';

import * as actions from '../../../actions/notification_actions';
import ArticleContainer from '../../../containers/article_container';
import {NOTIFICATION_DETAIL} from '../../../routers';

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
                    loadMaxNumber={this.state.number}
                    loadMoreData={this.loadMoreData.bind(this)}
                    onClick={(data)=>this.props.navigator.push(
                               {id: NOTIFICATION_DETAIL, title: data.title,
                               component: <ArticleContainer routeId={NOTIFICATION_DETAIL} id={data.id}/>})}
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