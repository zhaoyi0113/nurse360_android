import React from 'react';
import {View, Text, Image, TextInput, StyleSheet, Button, Dimensions} from 'react-native';
import {colors, FontSize} from '../../../../constants';
import Line from '../../../../components/line';
import CommonRowCell from '../../../../components/common_row_cell';

export default class NewCase extends React.Component {

  render() {
    const {patient} = this.props;
    const name = patient.patient.name + '  (  ' + patient.patient.genderText + ', ' + patient.patient.age + '岁 )';
    const desc = patient.patient.mobile;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <CommonRowCell title={name} description={desc} style={styles.header}
                     hasRead='YES'
                     image={patient.patient.image}
                     showNextIcon={false}
      />
      <Line/>
      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>病例名称</Text>
      <TextInput style={{marginLeft:10, backgroundColor: 'white', height:40}}
                 underlineColorAndroid={colors.underlayColor}
                 placeholder='20字以内，如骶骨周边压力性损伤三期'
      />

      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>基本信息</Text>
      <TextInput style={{marginLeft:10, backgroundColor: 'white', height: 80}}
                 underlineColorAndroid={colors.underlayColor}

                 placeholder='描述患者本人基本信息'
      />
      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>权限</Text>
      <Text
        style={{backgroundColor: 'white', marginLeft:10, height:30, marginBottom:10, lineHeight:25}}>{'  仅自己可见'}</Text>
      <Text style={{backgroundColor: 'white', marginLeft:10, height:30, lineHeight:25}}>{'  仅自己和科室可见'}</Text>
      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>病例记录（首次）</Text>
      <TextInput style={{marginLeft:10, backgroundColor: 'white', height: 80}}
                 underlineColorAndroid={colors.underlayColor}
                 placeholder='描述病理情况 伤口状况'
      />
      <View style={{marginHorizontal:10, position: 'absolute', bottom:10, width: Dimensions.get('window').width-20 }}>
        <Button title='提交' style={{marginHorizontal: 10}}/>
      </View>
    </View>);
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});