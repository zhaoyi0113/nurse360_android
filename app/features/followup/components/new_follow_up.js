import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight} from 'react-native';

import {colors, FontSize} from '../../../constants';
import CommonRowCell from '../../../components/common_row_cell';

export default class NewFollowUp extends React.Component {

  render() {
    const {templateList, navigation, patient} = this.props;
    return (<View style={{backgroundColor: colors.bkColor, flex:1}}>

      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View style={{flex:1, borderBottomColor: 'lightgray', borderBottomWidth:1, marginHorizontal:20}}/>
        <Text style={{fontSize: FontSize.small}}>手动添加</Text>
        <View style={{flex:1, borderBottomColor: 'lightgray', borderBottomWidth:1, marginHorizontal:20}}/>
      </View>
      <TouchableHighlight underlayColor={colors.underlayColor}
                          onPress={()=> navigation.navigate('NewQuestionFollowUp', {patient})}>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <Image style={{height:30, width:30, marginVertical: 10}}
                 source={require('../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>编辑问题随访</Text>
        </View>
      </TouchableHighlight>
      <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
        <View style={{flex:1, borderBottomColor: 'lightgray', borderBottomWidth:1, marginHorizontal:20}}/>
        <Text style={{fontSize: FontSize.small}}>从模版中选择</Text>
        <View style={{flex:1, borderBottomColor: 'lightgray', borderBottomWidth:1, marginHorizontal:20}}/>
      </View>
      {
        templateList.map((template, i) => {
          return <View key={i} style={{height: 80}}>
            <CommonRowCell title={template.name}
                           hasRead='YES'
                           description={template.introduction}
                           onClick={()=>navigation.navigate('TemplateCategory', {categoryId: template.id, patient: patient})}
                           headTitle={template.name.split('')[0]}/>
          </View>
        })
      }
    </View>);
  }

}

NewFollowUp.propTypes = {
  templateList: React.PropTypes.array,
}

NewFollowUp.defaultProps = {
  templateList: [],
}