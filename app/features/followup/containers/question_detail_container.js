import React from 'react';
import {connect} from 'react-redux';

import QuestionDetail from '../components/question_detail';
import {header} from '../../../components/navigation_header';

class QuestionDetailContainer extends React.Component {

  static navigationOptions = {
    title: '问题详情',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    return (<QuestionDetail/>);
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailContainer);
