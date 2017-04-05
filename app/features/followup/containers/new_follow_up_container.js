import React from 'react';
import {connect} from 'react-redux';
import NewFollowUp from '../components/new_follow_up';
import {header} from '../../../components/navigation_header';

import * as actions from '../../../actions/follow_up_actions';

class NewFollowUpContainer extends React.Component {
  static navigationOptions = {
    title: '新的随访',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this.props.queryQuestionnaireList(this.props.token);
  }

  render() {
    let {patient} = this.props.navigation.state.params;
    return (<NewFollowUp templateList={this.props.templateList} navigation={this.props.navigation} patient={patient}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    templateList: state.followUp.templateList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryQuestionnaireList: (token, index = 0, number = 200) => {
      return dispatch(actions.queryTemplateList(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFollowUpContainer);