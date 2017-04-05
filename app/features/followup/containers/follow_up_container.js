import React from 'react';
import {connect} from 'react-redux';

import FollowUp from '../components/follow_up';
import {header} from '../../../components/navigation_header';
import * as actions from '../../../actions/follow_up_actions';

class FollowUpContainer extends React.Component {

  static navigationOptions = {
    title: '随访记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    let {patient} = this.props.navigation.state.params;
    this.props.queryFollowUpUnReadList(this.props.token, patient.followUpId);
    this.props.queryFollowUpReadList(this.props.token, patient.followUpId);
  }

  render() {
    let {patient} = this.props.navigation.state.params;
    return (<FollowUp patient={patient}
                      unreadList={this.props.unreadList}
                      readList={this.props.readList}
                      navigation={this.props.navigation}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    readList: state.followUp.readList,
    unreadList: state.followUp.unreadList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryFollowUpUnReadList: (token, followUpId, index = 0, number = 3) => {
      return dispatch(actions.queryFollowUpUnReadList(token, followUpId, index, number));
    },
    queryFollowUpReadList: (token, followUpId, index = 0, number = 3) => {
      return dispatch(actions.queryFollowUpReadList(token, followUpId, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpContainer);