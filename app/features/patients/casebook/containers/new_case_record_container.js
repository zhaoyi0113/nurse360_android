import React from 'react';
import {connect} from 'react-redux';

import RNGRP from "react-native-get-real-path";
const FileUpload = require('NativeModules').FileUpload;
import Config from "react-native-config";

import * as actions from '../../../../actions/patient_actions';
import NewCaseRecord from '../components/new_case_record';
import {renderDelayTime} from '../../../../constants';
import {header} from '../../../../components/navigation_header';
import * as commonActions from '../../../../actions/common_actions';

class NewCaseRecordContainer extends React.Component {


  static navigationOptions = {
    title: '添加记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }


  componentDidMount() {
  }

  _createCaseRecord(data, images) {
    const {loadData, bookId} = this.props.navigation.state.params;
    const that = this;
    this.props.createCaseRecord(this.props.token, {casebook_id: bookId, case_record: data})
      .then(v => {
        console.log('get new case record response ', v);
        const caseId = v.payload.data.case_id;
        if(!images || images.length <=0){
          loadData();
          this.props.navigation.goBack();
          return;
        }
        let uploadedCount = 0;
        that.props.requestWaitingIndicator(true);
        images && images.map(image => {
          RNGRP.getRealPathFromURI(image.source.uri).then(filePath => {
              const fileName = filePath.split('/').pop(-1);
              const obj = {
                uploadUrl: Config.API_URL + '/nurse/casebook/case/add_image',
                method: 'POST', // default 'POST',support 'POST' and 'PUT'
                headers: {
                  'Accept': 'application/json',
                  'ACCESS_TOKEN': this.props.token,
                },
                fields: {
                  'casebook_id': bookId+'',
                  'case_id': caseId+'',
                },
                files: [
                  {
                    filename: fileName, // require, file name
                    filepath: filePath, // require, file absoluete path
                    // filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
                  },
                ],
              };
              console.log('upload ', filePath);
              FileUpload.upload(obj, function (err, result) {
                console.log('upload result ', result);
                if (err) {
                  console.error('get error:', err);
                }
                uploadedCount++;
                if (uploadedCount === images.length) {
                  loadData();
                  that.props.navigation.goBack();
                  that.props.requestWaitingIndicator(false);
                }
              });
            }
          );

        });

      });
  }

  render() {
    const {record} = this.props.navigation.state.params;
    return (
      <NewCaseRecord createNewCaseRecord={this._createCaseRecord.bind(this)}/>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCaseRecord: (token, data) => {
      return dispatch(actions.createCaseRecord(token, data));
    },
    requestWaitingIndicator: (v) => {
      return dispatch(commonActions.requestWaitingIndicator(v));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCaseRecordContainer)

