import React from 'react';
import {connect} from 'react-redux';


import {renderDelayTime} from '../../../constants';
import * as actions from '../../../actions/patient_actions';

import PatientDetail from '../components/patient_detail';

class PatientDetailContainer extends React.Component {

  componentDidMount() {

  }

  render() {
    return (<PatientDetail/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    externalPatients: state.patient.externalPatients,
    internalPatients: state.patient.internalPatients,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryInternalPatients: (token, index, number) => {
      return dispatch(actions.queryInternalPatient(token, index, number));
    },
    queryExternalPatient: (token, index, number) => {
      return dispatch(actions.queryExternalPatient(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailContainer);