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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailContainer);
