import React from 'react';
import {connect} from 'react-redux';

import NewQuestionFollowUp from '../components/new_question_follow_up';
import * as actions from '../../../actions/follow_up_actions';
import {header} from '../../../components/navigation_header';

class NewQuestionFollowUpContainer extends React.Component {

  static navigationOptions = {
    title: '编辑随访',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    return (<NewQuestionFollowUp/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionFollowUpContainer);
