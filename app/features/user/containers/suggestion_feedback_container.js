import React from 'react';
import {connect} from 'react-redux';

import SuggestionFeedback from '../components/suggestion_feedback';

class SuggestionFeedbackContainer extends React.Component {

  static navigationOptions = {
    title: '意见反馈',
  }

  render() {
    return (<SuggestionFeedback submit={()=>this.props.navigation.goBack()}/>);
  }

}

const mapStateToProps = ()=>{
  return {

  }
}

export default connect(mapStateToProps)(SuggestionFeedbackContainer);