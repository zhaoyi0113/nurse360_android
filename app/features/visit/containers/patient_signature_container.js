import React from "react";
import {connect} from "react-redux";
import PatientSignature from "../components/patient_signature";
import Orientation from 'react-native-orientation';

class PatientSignatureContainer extends React.Component {

  static navigationOptions = {
    title: '患者签字',
    cardStack: {
      gesturesEnabled: true
    },
    header: {visible: false},
  }

  constructor(props) {
    super(props);
    this.state = {patient: true};
  }

  _addPatientSignature(signature) {
    const {visitRecordId, order} = this.props.navigation.state.params;
    this.props.screenProps.changeScreen('NurseSignature');
    this.props.navigation.navigate('NurseSignature', {
      patientSignature: signature,
      visitRecordId: visitRecordId,
      order: order
    });
  }

  render() {
    return <PatientSignature title='患者签字' buttonText='确认，并跳转护士签字' addSignature={this._addPatientSignature.bind(this)}/>;
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSignatureContainer);