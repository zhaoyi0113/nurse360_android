import React from 'react';
import {connect} from 'react-redux';

import PatientSignature from '../components/patient_signature';
import * as actions from '../../../actions/visit_actions';

var FileUpload = require('NativeModules').FileUpload;
import Config from "react-native-config";

class PatientSignatureContainer extends React.Component {

  static navigationOptions = {
    title: '患者签字',
    cardStack: {
      gesturesEnabled: true
    }
  }

  _addSignature(signature) {
    const visitId = this.props.navigation.state.params.visitRecordId;
    console.log('send signature:', signature);
    this.props.sendPatientSignature(this.props.token, visitId, signature);

    {/*let data = new FormData()*/}
    {/*let converted = actions.decodeBase64Image(signature)*/}
    {/*data.append('image', converted)*/}
    {/*data.append('visit_record_id', visitId);*/}
    {/*fetch(Config.API_URL + '/nurse/visit/patient/sign', {*/}
        {/*method: 'post',*/}
    //     headers: {
    //       'Accept': 'application/json',
    //       'ACCESS_TOKEN': this.props.token,
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     body: data
    //   }
    // ).then(v => {
    //   console.log('response ', v);
    // })
  }

  render() {
    return <PatientSignature addSignature={this._addSignature.bind(this)}/>
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPatientSignature: (token, id, image) => {
      return dispatch(actions.sendPatientSignature(token, id, image));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSignatureContainer);