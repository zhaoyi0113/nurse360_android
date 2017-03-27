import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

import CommonRowCell from '../../../components/common_row_cell';
import {header} from '../../../components/navigation_header';
import {colors} from '../../../constants';

export default class PatientDetail extends React.Component {

  static navigationOptions = {
    title: '患者详情',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    const {patient} = this.props.navigation.state.params;
    const name = patient.patient.name + '  (  ' + patient.patient.genderText + ', ' + patient.patient.age + '岁 )';
    const desc = patient.patient.mobile;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <CommonRowCell title={name} description={desc}
                     hasRead='YES'
                     image={patient.patient.image}
      />
      <View style={{flex:5}}>
        <CommonRowCell title='病例记录'
                       hasRead='YES'
                       image={require('../../../images/patient/binglijilu.png')} />
        <CommonRowCell title='出诊记录'
                       hasRead='YES'
                       image={require('../../../images/patient/chuzhenjilu.png')} />
        <CommonRowCell title='随访记录'
                       hasRead='YES'
                       image={require('../../../images/patient/pinggu.png')} />
        <CommonRowCell title='问题咨询'
                       hasRead='YES'
                       image={require('../../../images/patient/binglijilu.png')} />
        <CommonRowCell title='定制推送'
                       hasRead='YES'
                       image={require('../../../images/patient/wentizixun.png')} />
      </View>
      <View style={{flex: 2}}/>
    </View>);
  }
}