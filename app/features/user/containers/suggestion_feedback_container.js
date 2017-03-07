import React from 'react';
import {connect} from 'react-redux';

import SuggestionFeedback from '../components/suggestion_feedback';
import {header} from '../../../components/navigation_header';
import * as actions from '../../../actions/user_actions';

class SuggestionFeedbackContainer extends React.Component {

  static navigationOptions = {
    title: '意见反馈',
    header: header,
  }

  _sendFeedback(feedback) {
    this.props.sendFeedback(this.props.token, feedback)
      .then(v => this.props.navigation.goBack());
  }

  render() {
    return (<SuggestionFeedback submit={this._sendFeedback.bind(this)}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedback: (token, feedback) => {
      return dispatch(actions.sendSuggestionFeedback(token, feedback));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionFeedbackContainer);