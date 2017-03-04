import React from 'react';
import {connect} from 'react-redux';

import PatientSignature from '../components/patient_signature';
import * as actions from '../../../actions/visit_actions';

class PatientSignatureContainer extends React.Component {

  static navigationOptions = {
    title: '患者签字',
    cardStack: {
      gesturesEnabled: true
    }
  }

  _addSignature(signature) {
    console.log('send signature:', signature);
    const visitId = this.props.navigation.state.params.visitRecordId;

  }

  render() {
    return <PatientSignature addSignature={this._addSignature.bind(this)} />
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addVisit: (token, visit) => {
      return dispatch(actions.addVisit(token, visit));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSignatureContainer);