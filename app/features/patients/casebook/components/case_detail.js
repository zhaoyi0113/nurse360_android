import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight} from 'react-native';
import {colors, FontSize} from '../../../../constants';
import {getDate} from '../../../../reducers/common_reducer';
import CommonRowCell from '../../../../components/common_row_cell';

export default class CaseDetail extends React.Component {

  render() {
    let {caseBook, patient, navigation, loadData} = this.props;
    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
      <View style={{backgroundColor: 'white', margin: 10}}>
        <View style={{backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10}}>
          <Text style={{fontSize: FontSize.large, marginLeft: 10, color: colors.lightTextColor}}>{caseBook.name}</Text>
          <View style={{flex:1}}/>
          <Text style={{alignSelf: 'flex-end', marginRight: 10, color: colors.labelColor}}
                onPress={()=>navigation.navigate('NewCase', {caseBook, patient, editing: true, loadData: loadData})}>编辑</Text>
        </View>
        <Text
          style={{fontSize: FontSize.small, marginLeft:10, marginBottom:10, color: colors.lightTextColor}}>基本信息</Text>
        <Text style={{fontSize: FontSize.small, marginLeft:10, marginBottom:10}}>{caseBook.description}</Text>
      </View>
      <TouchableHighlight underlayColor={colors.underlayColor}
                          onPress={()=>navigation.navigate('NewCaseRecord', {loadData: loadData.bind(this), bookId: caseBook.id})}
                          style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
        <View>
          <Image style={{alignSelf: 'center', margin:10, height: 50, width: 50}}
                 source={require('../../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>在当前病例添加一条记录</Text>
        </View>
      </TouchableHighlight>
      <View style={{flex:1}}>
        {
          caseBook.cases && caseBook.cases.map((c, i) => {
            const image = c.imagesUrl && c.imagesUrl.length > 0 ? {uri: c.imagesUrl[0]} : null;
            return <View key={i} style={{flex:1, height: 100}}>
              <Text style={{marginLeft: 20}}>{getDate(caseBook.time)}</Text>
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

CaseDetail.propTypes = {
  caseBook: React.PropTypes.object,
}
CaseDetail.defaultProps = {
  caseBook: {}
}