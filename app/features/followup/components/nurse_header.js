import React from 'react';
import {View, Text, Image} from 'react-native';
import {colors, margin} from '../../../constants';
import Line from '../../../components/line';

export default class NurseHeader extends React.Component {

  render() {
    const {nurseInfo} = this.props;
    const image = nurseInfo.profilePhotoUrl ? {uri: nurseInfo.profilePhotoUrl} : require('../../../images/user/default_header.png');
    return (<View style={{backgroundColor: 'white', borderRadius:5, margin: margin}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:0.3}}>
          <Image style={{height:50, width:50,margin:margin, borderRadius:25}} source={image}/>
        </View>
        <View style={{flex:1, marginTop: margin}}>
          <View>
            <Text>{nurseInfo.name}</Text>
          </View>
          <Text
            style={{color: colors.lightTextColor}}>{nurseInfo.properties ? nurseInfo.properties.hospital_department.hospital.name
          + '   ' + nurseInfo.properties.hospital_department.department.name : ''}</Text>
          <Text style={{color: colors.lightTextColor}}>{nurseInfo.properties.info_extension.jobTitle}</Text>
        </View>
      </View>
      <Line style={{height: 1, marginHorizontal: margin, backgroundColor: 'lightgray'}}/>
      <Text style={{margin:margin}}>擅长: {nurseInfo.properties && nurseInfo.properties.info_extension.goodAt}</Text>
    </View>);
  }

}

NurseHeader.propTypes = {
  nurseInfo: React.PropTypes.object,
}

NurseHeader.defaultProps = {
  nurseInfo: {},
}