import React from 'react';
import {connect} from 'react-redux';
import RNGRP from "react-native-get-real-path";
const FileUpload = require('NativeModules').FileUpload;
import {Alert} from 'react-native';
import Config from "react-native-config";

import UserProfileUpdate from '../components/user_profile_update';
import * as actions from '../../../actions/user_actions';
import {header} from '../../../components/navigation_header';
import * as commonActions from '../../../actions/common_actions';

class UserProfileUpdateContainer extends React.Component {

  static navigationOptions = {
    title: '个人资料',
    cardStack: {
      gesturesEnabled: true,
    },
    header: header,
  }

  _updateUserInfo(userInfo) {

    if (userInfo.profilePhotoUrl !== this.props.userInfo.profilePhotoUrl) {
      this._uploadimage(userInfo)
        .then(v => this._updateUserBasicInfo(userInfo))
        .catch(err => {
          console.log('error:', err);
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
    } else {
      this._updateUserBasicInfo(userInfo);
    }

  }

  _updateUserBasicInfo(userInfo) {
    this.props.updateUserInfo(this.props.token, userInfo)
      .then(v => this.props.navigation.goBack());

  }

  _uploadimage(userInfo) {
    console.log('upload iamge ', userInfo.profilePhotoUrl);
    this.props.requestWaiting(true);
    const that = this;
    return new Promise((resolve, reject) => {
      RNGRP.getRealPathFromURI(userInfo.profilePhotoUrl.uri).then(filePath => {
          const fileName = filePath.split('/').pop(-1);
          const obj = {
            uploadUrl: Config.API_URL + '/nurse/head_image',
            method: 'PUT', // default 'POST',support 'POST' and 'PUT'
            headers: {
              'Accept': 'application/json',
              'ACCESS_TOKEN': this.props.token,
            },
            fields: {},
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
            that.props.requestWaiting(false);
            if (err) {
              console.error('get error:', err);
              reject(err);
            }
            resolve(result);
          });
        }
      );
    })

  }

  render() {
    return (<UserProfileUpdate userInfo={this.props.userInfo}
                               navigation={this.props.navigation}
                               updateUserInfo={this._updateUserInfo.bind(this)}/>)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (token, userInfo) => {
      return dispatch(actions.updateUserInfo(token, userInfo));
    },
    requestWaiting: (value) => {
      return dispatch(commonActions.requestWaitingIndicator(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileUpdateContainer)