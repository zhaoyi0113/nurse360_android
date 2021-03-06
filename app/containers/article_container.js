import React from 'react';
import {connect} from 'react-redux';

import Article from '../components/article';
import * as notificationActions from '../actions/notification_actions';
import * as courseActions from '../actions/study_actions';

import {NOTIFICATION_DETAIL, COURSE_DETAIL} from '../routers';

import {renderDelayTime} from '../constants';
import {header} from '../components/navigation_header';

class ArticleContainer extends React.Component {

  static navigationOptions = {
    title: ({state}) => `${state.params.title}`,
    header:header,
  }

  constructor(props) {
    super(props);
    this.state = {content: {}};
  }

  componentDidMount() {
    setTimeout(()=>{
      const {routeId, id} = this.props.navigation.state.params;
      switch (routeId) {
        case NOTIFICATION_DETAIL:
          if(id !== this.props.notification.id) {
            this.props.requestNotificationDetail(this.props.token, id);
          }else{
            this.setState({content: this.props.notification});

          }
          break;
        case COURSE_DETAIL:
          if(id !== this.props.course.id) {
            this.props.requestCourseDetail(this.props.token, id);
          }else {
            this.setState({content: this.props.course});
          }
          break;
      }
    }, renderDelayTime);
  }

  componentWillReceiveProps(nextProps) {
    const {routeId, id} = this.props.navigation.state.params;
    switch (routeId) {
      case NOTIFICATION_DETAIL:
        if (nextProps.notification) {
          this.setState({content: nextProps.notification});
        }
        break;
      case COURSE_DETAIL:
        if (nextProps.course) {
          this.setState({content: nextProps.course});
        }
        break;
    }
  }

  render() {
    return (<Article content={this.state.content}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    notification: state.notification.notification,
    course: state.study.course,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestNotificationDetail: (token, id) => {
      dispatch(notificationActions.queryNotificationDetail(token, id));
    },
    requestCourseDetail: (token, id) => {
      dispatch(courseActions.queryStudyCourseDetail(token, id));
    }
  }
}

ArticleContainer.propTypes ={
  notification: React.PropTypes.object,
  course: React.PropTypes.object,
}

ArticleContainer.defaultProps = {
  notification: {},
  course: {},
}

ArticleContainer.propTypes = {
  routeId: React.PropTypes.number,
  id: React.PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
