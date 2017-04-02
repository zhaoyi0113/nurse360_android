import React from 'react';
import {connect} from 'react-redux';

import PatientVisit from '../components/patient_visit';
import {renderDelayTime} from '../../../../constants';
import * as actions from '../../../../actions/patient_actions';
import {header} from '../../../../components/navigation_header';

class PatientVisitContainer extends React.Component {
  static navigationOptions = {
    title: '出诊记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    const {patient} = this.props.navigation.state.params;
    this.props.queryPatientVisitList(this.props.token, patient.user.id, patient.patient.id).then(v => this.patient._endRefresh())
      .catch(e => this.patient._endRefresh());
  }

  render() {
    const {patient} = this.props.navigation.state.params;
    return (<PatientVisit refresh={this._refresh.bind(this)} patient={patient}
                          ref={(p)=>this.patient=p}
                          patientVisitList={this.props.patientVisitList}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    patientVisitList: state.patient.patientVisitList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryPatientVisitList: (token, userId, patientId, index=0, number=200) => {
      return dispatch(actions.queryPatientVisitList(token, userId, patientId, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientVisitContainer);

