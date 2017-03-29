import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import {header} from '../../../../components/navigation_header';
import {colors, FontSize} from '../../../../constants';
import {getDate} from '../../../../reducers/common_reducer';
import CommonRowCell from '../../../../components/common_row_cell';

export default class CaseDetail extends React.Component {

  static navigationOptions = {
    title: '记录详情',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    let {caseBook, patient} = this.props.navigation.state.params;
    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
      <View style={{backgroundColor: 'white', margin: 10}}>
        <View style={{backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10}}>
          <Text style={{fontSize: FontSize.large, marginLeft: 10, color: colors.lightTextColor}}>{caseBook.name}</Text>
          <View style={{flex:1}}/>
          <Text style={{alignSelf: 'flex-end', marginRight: 10, color: colors.labelColor}}
                onPress={()=>this.props.navigation.navigate('NewCase', {caseBook, patient, editing: true})}>编辑</Text>
        </View>
        <Text
          style={{fontSize: FontSize.small, marginLeft:10, marginBottom:10, color: colors.lightTextColor}}>基本信息</Text>
        <Text style={{fontSize: FontSize.small, marginLeft:10, marginBottom:10}}>{caseBook.description}</Text>
      </View>
      <View style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
        <Image style={{alignSelf: 'center', margin:10, height: 50, width: 50}}
               source={require('../../../../images/patient/addPat.png')}/>
        <Text style={{color: colors.lightTextColor}}>在当前病例添加一条记录</Text>
      </View>
      <Text style={{marginLeft: 20}}>{getDate(caseBook.time)}</Text>
      <View style={{flex:1}}>
        {
          caseBook.cases.map((c, i) => {
            const image = c.imagesUrl && c.imagesUrl.length > 0 ? {uri: c.imagesUrl[0]} : null;
            return <View key={i} style={{flex:1, height: 100}}>
              <CommonRowCell hasRead='YES' description={c.caseRecord} title='病例记录'
                             image={image}
                             titleStyle={{color: colors.lightTextColor}}
                             imageStyle={{height:50, width:50, marginLeft:10}}/>
            </View>
          })
        }

      </View>
    </ScrollView>);
  }

}