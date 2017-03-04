import React from "react";
import {View, Text, ScrollView, StyleSheet, TextInput, TouchableHighlight, Button, Dimensions} from "react-native";
import _ from "lodash";
import ImageSelector from '../../../components/image_selector';
import CheckBox from 'react-native-checkbox';
import {FontSize} from '../../../constants';

export default class AddVisit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {requireSignature: false, diagnosticItems: [], address: '', record: ''};
  }

  _submit() {
    if (this.state.requireSignature) {
      this.props.navigation.navigate('PatientSignatureContainer');
    } else {
      this._addVisit();
    }
  }

  _addVisit() {
    const {order, userInfo} = this.props;
    const visit = {
      'user_id': userInfo.id, 'patient_id': order.patient.id, 'service_item_ids': order.serviceItemId,
      'visit_record': this.state.record, 'order_id': order.id, 'address': this.state.address
    };
    this.props.addVisit(visit);
  }

  _getSelectedDiagnosticItems() {
    return _.filter(this.state.diagnosticItems, {selected: true}) || [];
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.diagnosticItems.length === 0 && nextProps.visitItems) {
      this.setState({diagnosticItems: nextProps.visitItems});
    }
  }

  render() {
    const {diagnosticItems} = this.state;
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <ScrollView style={{flexDirection: 'column', backgroundColor: '#f6f6f6'}}>
          <Text style={{marginHorizontal:10, marginVertical:5}}>治疗项目</Text>
          <DiagnosticItems items={diagnosticItems} ref={(i)=>this.diagnostic = i}
                           updateSelected={(items)=>this.setState({diagnosticItems: items})}/>
          <Text style={{marginHorizontal:10, marginVertical:5}}>出诊地址</Text>
          <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                     multiline={true} placeholder='填写您要出诊的地址。'
                     onChangeText={(text)=>this.setState({address: text})}
          />
          <Text style={{marginHorizontal:10, marginVertical:5}}>操作及观察记录</Text>
          <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                     numberOfLines={5}
                     onChangeText={(text)=> this.setState({record: text})}
                     multiline={true} placeholder='本次家庭治疗、护理操作的具体情况记录。'/>
          <Text style={{marginHorizontal:10, marginVertical:5}}>上传问题相关或诊断结果（最多9张，没有可不传)</Text>
          <ImageSelector/>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 10, width: Dimensions.get('window').width-40, marginHorizontal:20}}>
          <CheckBox
            labelStyle={{fontSize: FontSize.small}}
            label='患者签字（勾选此项提交后将跳转到签字页面)'
            onChange={(checked) => {
              this.setState({requireSignature: !checked})
            }}
          />
          <Button title={this.state.requireSignature?'提交并且患者确认签字':'提交'}
                  style={{flex:1}}
                  disabled={this._getSelectedDiagnosticItems().length<=0 || !this.state.address || !this.state.record}
                  onPress={this._submit.bind(this)}/>
        </View>
      </View>
    );
}

}

class DiagnosticItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  componentWillReceiveProps(nextProps) {
    let items = _.cloneDeep(nextProps.items);
    this.setState({items: items});
  }

  render() {
    let {items} = this.state;
    let arrays = [];
    items.map((item, i) => {
      let index = Math.floor(i / 3);
      if (i % 3 === 0) {
        arrays.push([]);
      }
      arrays[index].push(item);
    });
    if (items.length % 3 !== 0) {
      let left = 3 - items.length % 3;
      _.times(left, () => {
        arrays[arrays.length - 1].push(null);
      });
    }
    return (<View style={{flex:1}}>
      {
        arrays.map((array, i) => {
          return <View key={i} style={{flex:1, flexDirection:'row'}}>
            {
              array.map((item, j) => {
                const itemName = item ? item.itemName : '';
                const style = item ? (item.selected ? styles.diagnostic_selected_item : styles.diagnostic_item) : styles.diagnostic_empty_style;
                return <Text key={j} style={style} onPress={()=>{
                  item.selected = item.selected?false:true;
                  this.setState({items: items});
                  this.props.updateSelected(items);
                }}>{itemName}</Text>
              })
            }
          </View>
        })
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  diagnostic_item: {
    flex: 0.3,
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: 'lightgray'
  },
  diagnostic_selected_item: {
    flex: 0.3,
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#559bec',
  },
  diagnostic_empty_style: {flex: 0.3, marginHorizontal: 10, marginVertical: 5}
});