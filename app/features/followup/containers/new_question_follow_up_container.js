import React from 'react';
import {connect} from 'react-redux';

import NewQuestionFollowUp from '../components/new_question_follow_up';
import * as actions from '../../../actions/follow_up_actions';
import {header} from '../../../components/navigation_header';
import {uploadImage} from '../../../utils/image_utils';
import * as commonActions from '../../../actions/common_actions';

class NewQuestionFollowUpContainer extends React.Component {

  static navigationOptions = {
    title: '编辑随访',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this.props.queryQuestionList(this.props.token);
  }

  _submit(category, desc, images) {
    const {patient} = this.props.navigation.state.params;
    this.props.sendFollowUp(this.props.token, patient.userId, desc, patient.patientId, category.id)
      .then(v => {
        console.log('send follow up response ', v);
        console.log('send images:', images);
        const ps = [];
        this.props.requestWaitingIndicator(true);
        images.map(image => {
          ps.push(uploadImage(image.source.uri, '/nurse/consultation/follow-up/image', this.props.token, {
            consultation_id: v.payload.data.id + '',
            image_name: ''
          }));
        });
        return Promise.all(ps);
      })
      .then(v => {
        this.props.requestWaitingIndicator(false);
        this.props.navigation.goBack();
      })
      .catch(err => {
        this.props.requestWaitingIndicator(false);
        this.props.navigation.goBack();
      });
  }


  render() {
    const {questionList} = this.props;
    return (<NewQuestionFollowUp questionList={questionList} submit={this._submit.bind(this)}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    questionList: state.followUp.questionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryQuestionList: (token) => {
      return dispatch(actions.queryQuestionList(token));
    },
    sendFollowUp: (token, userId, desc, patientId, categoryId) => {
      return dispatch(actions.sendFollowUp(token, userId, desc, patientId, categoryId));
    },
    requestWaitingIndicator: (waiting) => {
      return dispatch(commonActions.requestWaitingIndicator(waiting));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionFollowUpContainer);
