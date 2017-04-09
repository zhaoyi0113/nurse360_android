import React from 'react';
import {connect} from 'react-redux';

import QuestionDetail from '../components/question_detail';
import {header} from '../../../components/navigation_header';
import * as actions from '../../../actions/follow_up_actions';

class QuestionDetailContainer extends React.Component {

  static navigationOptions = {
    title: '问题详情',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    const {followUp} = this.props.navigation.state.params;
    this.props.queryQuestionDetail(this.props.token, followUp.followUpContent.id);
  }

  render() {
    const {followUp, patient} = this.props.navigation.state.params;
    return (<QuestionDetail patient={patient} followUp={followUp} nurseInfo={this.props.userInfo}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryQuestionDetail: (token, consultationId) => {
      return dispatch(actions.queryQuestionDetail(token, consultationId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailContainer);
