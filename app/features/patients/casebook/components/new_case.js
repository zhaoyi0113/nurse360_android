import React from 'react';
import {View, Text, Image, TextInput, StyleSheet, Button, Dimensions} from 'react-native';
import {colors, FontSize} from '../../../../constants';
import Line from '../../../../components/line';
import CommonRowCell from '../../../../components/common_row_cell';
import TextViewSelection from '../../../../components/text_view_selection';

export default class NewCase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {roleSelection: 1};
  }

  componentWillMount() {
    console.log('xxxxx,', this.props.caseBook)
    const {caseBook} = this.props;
    this.setState({
      name: caseBook.name,
      description: caseBook.description,
      roleSelection: caseBook.hidden === 'YES' ? 0 : 1
    });
  }

  _createNewCaseBook() {
    const {patient} = this.props;
    const data = {
      patient_id: patient.patient.id, user_id: patient.userId, name: this.state.name,
      description: this.state.description, hidden: this.state.roleSelection === 1 ? 'NO' : 'YES',
      case_record: this.state.caseRecord
    }
    this.props.createNewCaseBook(data);
  }

  render() {
    const {patient, editing} = this.props;
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
      <TextInput style={{marginHorizontal:10, backgroundColor: 'white', height:40}}
                 onChangeText={(text)=>this.setState({name: text})}
                 underlineColorAndroid={colors.underlayColor}
                 value={this.state.name}
                 placeholder='20字以内，如骶骨周边压力性损伤三期'
      />

      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>基本信息</Text>
      <TextInput style={{marginHorizontal:10, backgroundColor: 'white', height: 80}}
                 underlineColorAndroid={colors.underlayColor}
                 value={this.state.description}
                 onChangeText={(text)=>this.setState({description: text})}
                 placeholder='描述患者本人基本信息'
      />
      <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>权限</Text>
      <TextViewSelection text={'  仅自己可见'}
                         selected={this.state.roleSelection === 0}
                         onPress={()=>this.setState({roleSelection: 1 - this.state.roleSelection})}/>
      <TextViewSelection text={'  仅自己和科室可见'}
                         selected={this.state.roleSelection === 1}
                         onPress={()=>this.setState({roleSelection: 1 - this.state.roleSelection})}/>
      {
        !editing ? <Text style={{color: colors.lightTextColor, marginLeft:20, marginVertical:10}}>病例记录（首次）</Text> : null
      }
      {
        !editing ? <TextInput style={{marginHorizontal:10, backgroundColor: 'white', height: 80}}
                             underlineColorAndroid={colors.underlayColor}
                             onChangeText={(text)=>this.setState({caseRecord: text})}
                             placeholder='描述病理情况 伤口状况'
        /> : null
      }

      <View style={{marginHorizontal:10, position: 'absolute', bottom:10, width: Dimensions.get('window').width-20 }}>
        <Button title='提交' style={{marginHorizontal: 10}} onPress={this._createNewCaseBook.bind(this)}
                disabled={!this.state.name || (!this.state.caseRecord && !editing) || !this.state.description}/>
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
  unselectedRole: {
    backgroundColor: 'white', marginHorizontal: 10, height: 40, lineHeight: 30, marginBottom: 5,
  },
  selectedRole: {
    backgroundColor: '#E8EFF7', marginHorizontal: 10, height: 40, lineHeight: 30, marginBottom: 5,
  }
});