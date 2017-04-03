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
    this.props.queryFollowUpUnReadList(this.props.token);
    this.props.queryFollowUpReadList(this.props.token);
  }

  render() {
    let {patient} = this.props.navigation.state.params;
    return (<FollowUp followUpList={this.props.followUpList} patient={patient}
                      navigation={this.props.navigation}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    followUpList: state.followUp.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryFollowUpUnReadList: (token, index = 0, number = 200) => {
      return dispatch(actions.queryFollowUpUnReadList(token, index, number));
    },
    queryFollowUpReadList: (token, index = 0, number = 200) => {
      return dispatch(actions.queryFollowUpReadList(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpContainer);