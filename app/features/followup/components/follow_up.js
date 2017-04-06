import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight} from 'react-native';
import {colors, FontSize, margin} from '../../../constants';
import CommonRowCell from '../../../components/common_row_cell';

const Separator = ({title}) => {
  return (<View style={{flexDirection: 'row', alignItems: 'center', marginVertical:margin}}>
    <View style={{flex:1, marginHorizontal: 20, height: 1, backgroundColor: 'lightgray'}}/>
    <Text style={{color: colors.lightTextColor}}>{title}</Text>
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',marginHorizontal: 20}}>
      <View style={{flex:1, height: 1, backgroundColor: 'lightgray'}}/>
      <Text style={{flex:0.3, color: colors.lightTextColor, fontSize: FontSize.small, marginLeft: margin}}>更多</Text>
    </View>
  </View>);
}

const FollowUpList = ({list, navigation}) => {
  return (<View>
    {
      list.length === 0 ?
        <Text style={{color: colors.lightTextColor, alignSelf: 'center', marginTop: 10}}>暂无随访记录</Text> : null
    }
    {
      list.map((followUp, i) => {
        let {followUpContent} = followUp;
        return (<View key={i} style={{flex:1, backgroundColor: 'white', marginBottom: margin}}>
          <CommonRowCell title={followUpContent.title}
                         hasRead={followUp.nurseRead}
                         description={followUpContent.description || followUpContent.diseaseDescription}
                         onClick={()=>{
                           if(followUp.followUpType === 'QUESTIONNAIRE'){
                            navigation.navigate('TemplateDetail', {template:followUp, submit:false})
                           }
                         }}
                         headTitle={followUpContent.title.split('')[0]}/>
        </View>);
      })
    }
  </View>);
}

export default class FollowUp extends React.Component {

  render() {
    let {patient, readList, unreadList, navigation} = this.props;
    return (<View style={{backgroundColor: colors.bkColor, flex:1}}>
      <TouchableHighlight underlayColor={colors.underlayColor}
                          onPress={()=> navigation.navigate('NewFollowUp', {patient})}>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <Image style={{height:30, width:30, marginVertical: 5}}
                 source={require('../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>推送新的随访</Text>
        </View>
      </TouchableHighlight>
      <ScrollView>
        <Separator title="未读回复"/>
        <FollowUpList list={unreadList} navigation={navigation}/>
        <Separator title="已推送"/>
        <FollowUpList list={readList} navigation={navigation}/>
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