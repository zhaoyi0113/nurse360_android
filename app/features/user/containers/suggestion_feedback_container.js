import React from 'react';
import {connect} from 'react-redux';

import SuggestionFeedback from '../components/suggestion_feedback';
import {header} from '../../../components/navigation_header';

class SuggestionFeedbackContainer extends React.Component {

  static navigationOptions = {
    title: '意见反馈',
    header:header,
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