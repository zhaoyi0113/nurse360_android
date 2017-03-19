import React from 'react';

import {connect} from 'react-redux';
import Qualification from '../components/qualification';
const FileUpload = require('NativeModules').FileUpload;
import RNGRP from "react-native-get-real-path";

import {header} from '../../../components/navigation_header';

class QualificationContainer extends React.Component {

  static navigationOptions = {
    title: '资质认证',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  /**
   * upload image type: QUALIFICATION|EMPLOYEES_CARD|OTHER
   * @param images
   * @private
   */
  _upload(images) {

  }

  render() {
    return (<Qualification upload={this._upload.bind(this)}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

export default connect(mapStateToProps)(QualificationContainer);