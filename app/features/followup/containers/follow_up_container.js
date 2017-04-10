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
    this._loadReadFollowUpList(0, 3);
    this._loadUnreadFollowUpList(0, 3);
  }

  componentWillUnmount() {
    this.props.clearFollowUpList();
  }

  _loadReadFollowUpList(index, number) {
    let {patient} = this.props.navigation.state.params;
    this.props.queryFollowUpReadList(this.props.token, patient.followUpId, index, number);
  }

  _loadUnreadFollowUpList(index, number) {
    let {patient} = this.props.navigation.state.params;
    this.props.queryFollowUpUnReadList(this.props.token, patient.followUpId, index, number);
  }

  render() {
    let {patient} = this.props.navigation.state.params;
    const unreadList = this.props.unreadList.splice(0, 3);
    const readList = this.props.readList.splice(0, 3);
    return (<FollowUp patient={patient}
                      unreadList={unreadList}
                      loadReadFollowUpList={this._loadReadFollowUpList.bind(this)}
                      loadUnreadFollowUpList={this._loadUnreadFollowUpList.bind(this)}
                      readList={readList}
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
    },
    clearFollowUpList: () => {
      return dispatch(actions.clearFollowUpList());
    }
  }
}

FollowUpContainer.propTypes = {
  readList: React.PropTypes.array,
  unreadList: React.PropTypes.array,
}

FollowUpContainer.defaultProps = {
  readList: [],
  unreadList: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpContainer);