import React from 'react';
import {connect} from 'react-redux';

import SuggestionFeedback from '../components/suggestion_feedback';

class SuggestionFeedbackContainer extends React.Component {


  render() {
    return (<SuggestionFeedback submit={()=>this.props.navigator.pop()}/>);
  }

}

const mapStateToProps = ()=>{
  return {

  }
}

export default connect(mapStateToProps)(SuggestionFeedbackContainer);