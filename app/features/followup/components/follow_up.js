import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight} from 'react-native';
import {colors, FontSize, margin} from '../../../constants';
import CommonRowCell from '../../../components/common_row_cell';
import FollowUpList from './follow_up_list';

const Separator = ({title, patient, navigation, read}) => {
  return (<View style={{flexDirection: 'row', alignItems: 'center', marginVertical:margin}}>
    <View style={{flex:1, marginHorizontal: 20, height: 1, backgroundColor: 'lightgray'}}/>
    <Text style={{color: colors.lightTextColor}}>{title}</Text>
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',marginHorizontal: 20}}>
      <View style={{flex:1, height: 1, backgroundColor: 'lightgray'}}/>
      <Text style={{flex:0.3, color: colors.lightTextColor, fontSize: FontSize.small, marginLeft: margin}}
            onPress={()=>navigation.navigate('FollowUpList', {patient,read})}
            >更多</Text>
    </View>
  </View>);
}


export default class FollowUp extends React.Component {

  render() {
    let {patient, readList, unreadList, navigation, loadReadFollowUpList, loadUnreadFollowUpList} = this.props;

    return (<View style={{backgroundColor: colors.bkColor, flex:1}}>
      <TouchableHighlight underlayColor={colors.underlayColor}
                          onPress={()=> navigation.navigate('NewFollowUp', {patient, loadReadFollowUpList, loadUnreadFollowUpList})}>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <Image style={{height:30, width:30, marginVertical: 5}}
                 source={require('../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>推送新的随访</Text>
        </View>
      </TouchableHighlight>
      <ScrollView>
        <Separator title="未读回复" patient={patient} navigation={navigation} read={false}/>
        <FollowUpList list={unreadList} navigation={navigation} patient={patient}/>
        <Separator title="已推送" patient={patient} navigation={navigation} read={true}/>
        <FollowUpList list={readList} navigation={navigation} patient={patient}/>
      </ScrollView>
    </View>);
  }

}

FollowUp.propTypes = {
  unreadList: React.PropTypes.array,
  readList: React.PropTypes.array,
}
FollowUp.defaultProps = {
  unreadList: [],
  readList: []
}