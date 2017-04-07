import React from 'react';
import {connect} from 'react-redux';

import FollowUpPatientList from '../components/follow_up_patient_list';
import * as actions from '../../../actions/follow_up_actions';
import {header} from '../../../components/navigation_header';

class FollowUpPatientListContainer extends React.Component {

  static navigationOptions = {
    title: '随访记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this.props.queryPatientList(this.props.token);
  }

  _refresh() {
    this.props.queryPatientList(this.props.token)
      .then(v => this.followUp && this.followUp.endRefresh())
      .catch(err => this.followUp && this.followUp.endRefresh());
  }

  render() {
    return <FollowUpPatientList
      ref={r=>this.followUp=r}
      refresh={this._refresh.bind(this)} navigation={this.props.navigation}
      patientList={this.props.patientList}/>
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    patientList: state.followUp.patientList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryPatientList: (token, index = 0, number = 200) => {
      return dispatch(actions.queryFollowUpPatientList(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpPatientListContainer);