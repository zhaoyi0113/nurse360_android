import React from 'react';
import {connect} from 'react-redux';

import QuestionDetail from '../components/question_detail';
import {header} from '../../../components/navigation_header';
import * as actions from '../../../actions/follow_up_actions';
import * as commonActions from '../../../actions/common_actions';
import {uploadImage} from '../../../utils/image_utils';

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

  componentWillUnmount() {
    this.props.clearQuestionDetail();
  }

  _replyQuestion(content, images, navigation) {
    const {followUp} = this.props.navigation.state.params;
    console.log('reply question ', content, images, this.props.questionDetail);

    this.props.replyQuestion(this.props.token, followUp.followUpContent.id, content)
      .then(v => {
        console.log('reply question response ', v);
        if (images.length > 0) {
          const promises = [];
          this.props.requestWaitingIndicator(true);
          const data = {consultation_id: followUp.followUpContent.id + '', talk_id: v.payload.data.talk_id + ''};
          images.map(image => promises.push(uploadImage(image.source.uri,
            '/nurse/consultation/talk/add_image', this.props.token, data)));
          return Promise.all(promises);
        } else {
          return this.props.queryQuestionDetail(this.props.token, followUp.followUpContent.id);
        }
      })
      .then(v => {
        console.log('send image response ', v);
        if (images.length > 0) {
          this.props.requestWaitingIndicator(false);
          return this.props.queryQuestionDetail(this.props.token, followUp.followUpContent.id);
        } else {
          this.props.requestWaitingIndicator(false);
          navigation.goBack();
        }
      })
      .then(v => {
        if (images.length > 0) {
          navigation.goBack();
        }
      })
      .catch(err => {
        this.props.requestWaitingIndicator(false);
      });
  }

  render() {
    const {questionDetail, navigation} = this.props;
    return (<QuestionDetail navigation={navigation}
                            followUp={questionDetail}
                            replyQuestion={this._replyQuestion.bind(this)}
                            nurseInfo={this.props.userInfo}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
    questionDetail: state.followUp.questionDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryQuestionDetail: (token, consultationId) => {
      return dispatch(actions.queryQuestionDetail(token, consultationId));
    },
    clearQuestionDetail: () => {
      return dispatch(actions.clearQuestionDetail());
    },
    replyQuestion: (token, consultationId, content) => {
      return dispatch(actions.replyQuestion(token, consultationId, content));
    },
    requestWaitingIndicator: (waiting) => {
      return dispatch(commonActions.requestWaitingIndicator(waiting));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailContainer);
