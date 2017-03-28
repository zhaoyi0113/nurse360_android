import React from 'react';

import {View, Image, Text, TouchableHighlight} from 'react-native';
import {getDate} from '../../../reducers/common_reducer';
import {FontSize, colors} from '../../../constants';

export default class CaseCell extends React.Component {

  render() {
    const {patient, caseName, recordNum, time, onClick} = this.props;
    const info = patient.name + '  ( ' + patient.genderText + ', ' + patient.age + '岁 )'
    return (
      <TouchableHighlight style={{flex:1}} underlayColor={colors.underlayColor} onPress={onClick.bind(this)}>
        <View
          style={{flex:1, backgroundColor: 'white', margin:10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{margin:10, width: 40, height: 40, borderRadius: 20}} source={patient.image}/>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={{fontSize: FontSize.normal}}>{info}</Text>
            <Text style={{fontSize: FontSize.large}}>{caseName}</Text>
            <Text style={{fontSize: FontSize.normal}}>{'已记录' + recordNum + '次'}</Text>
            <Text style={{fontSize: FontSize.small}}>{getDate(time)}</Text>
          </View>
          <Image style={{margin: 10, height: 20, width: 20}} source={require('../../../images/next_gray.png')}/>
        </View></TouchableHighlight>);
  }
}

CaseCell.propTypes = {
  patient: React.PropTypes.object,
  caseName: React.PropTypes.string,
  recordNum: React.PropTypes.number,
  time: React.PropTypes.number,
  onClick: React.PropTypes.func,
}

CaseCell.defaultProps = {
  patient: {},
  caseName: '',
  recordNum: 0,
  time: 0,
  onClick: ()=>{}
}