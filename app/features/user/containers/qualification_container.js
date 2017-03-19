import React from 'react';

import {connect} from 'react-redux';
import Qualification from '../components/qualification';
const FileUpload = require('NativeModules').FileUpload;
import RNGRP from "react-native-get-real-path";
import Config from "react-native-config";
import {Alert} from 'react-native';

import {header} from '../../../components/navigation_header';
import * as commonActions from '../../../actions/common_actions';
import * as actions from '../../../actions/user_actions';

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
    console.log('upload images ', images);
    this.props.requestWaiting(true);
    const promises = [];
    images.map((image) => {
      promises.push(this._uploadImage(image));
    });
    Promise.all(promises).then(v => {
      this.props.requestUserInfo(this.props.token)
        .then(v=>{
          this.props.requestWaiting(false);
          this.props.navigation.goBack();
        })
        .catch(err=>this.props.requestWaiting(false));
    })
      .catch(err => {
        console.log('error:', err);
        this.props.requestWaiting(false)
        Alert.alert(
          '',
          '上传图片失败',
          [
            {
              text: '确定', onPress: () => {
            }
            },
          ]
        );
      });
  }

  _uploadImage(image) {
    return new Promise((resolve, reject) => {
      RNGRP.getRealPathFromURI(image.image.uri).then(filePath => {
          const fileName = filePath.split('/').pop(-1);
          const obj = {
            uploadUrl: Config.API_URL + '/nurse/qualification',
            method: 'POST', // default 'POST',support 'POST' and 'PUT'
            headers: {
              'Accept': 'application/json',
              'ACCESS_TOKEN': this.props.token,
            },
            fields: {
              type: image.type,
              file_name: 'file',
              name: 'file',
            },
            files: [
              {
                name: 'file',
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
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      );
    });
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

const mapDispatchToProps = (dispatch) => {
  return {
    requestWaiting: (value) => {
      return dispatch(commonActions.requestWaitingIndicator(value));
    },
    requestUserInfo: (token) => {
      return dispatch(actions.getUserInfo(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QualificationContainer);