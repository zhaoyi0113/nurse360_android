import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  Dimensions,
  Alert
} from "react-native";
import _ from "lodash";
import ImageSelector from "../../../components/image_selector";
import CheckBox from "react-native-checkbox";
import RNGRP from "react-native-get-real-path";
import {FontSize} from "../../../constants";
import Config from "react-native-config";
var FileUpload = require('NativeModules').FileUpload;

export default class AddVisit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {requireSignature: false, diagnosticItems: [], address: '', record: '', waitingIndicator: false};
  }

  _submit() {
    let images = this.images.state.images;
    this._addVisit()
      .then(v => {
        if (images.length > 0) {
          return this._uploadImages(v.payload.data.id, images);
        }
        return Promise.resolve(v.payload.data.id);
      })
      .then(v => {
        if (this.state.requireSignature) {
          this.props.changeScreen('PatientSignature');
          this.props.navigation.navigate('PatientSignature', {visitRecordId: v, order: this.props.order});
        } else {
          this.props.navigation.goBack();
        }
      });
  }

  _uploadImages(recordId, images) {
    const imageLength = images.length;
    let uploadedCount = 0;
    const that = this;
    this.props.requestUploadImageWaiting(true);
    return new Promise((resolve, reject) => {
      for (let image of images) {
        RNGRP.getRealPathFromURI(image.source.uri).then(filePath => {
            const fileName = filePath.split('/').pop(-1);
            const obj = {
              uploadUrl: Config.API_URL + '/nurse/visit/patient/image',
              method: 'POST', // default 'POST',support 'POST' and 'PUT'
              headers: {
                'Accept': 'application/json',
                'ACCESS_TOKEN': this.props.token,
              },
              fields: {
                'visit_record_id': recordId + '',
              },
              files: [
                {
                  filename: fileName, // require, file name
                  filepath: filePath, // require, file absoluete path
                  // filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
                },
              ],
            };
            console.log('upload ', filePath);
            FileUpload.upload(obj, function (err, result) {
              console.log('upload result ', result);
              if (err) {
                console.error('get error:', err);
                reject(err);
              }
              uploadedCount++;
              if (uploadedCount === imageLength) {
                that.props.requestUploadImageWaiting(false);
                resolve(recordId);
              }
            });
          }
        );


      }
    });

  }

  _addVisit() {
    const {order} = this.props;
    const serviceIds = _.map(this.state.diagnosticItems, 'id');
    const visit = {
      'user_id': order.userId, 'patient_id': order.patient.id, 'service_item_ids': serviceIds.join(),
      'visit_record': this.state.record, 'order_id': order.id, 'address': this.state.address
    };
    return this.props.addVisit(visit);
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
          <ImageSelector ref={image=>this.images = image}/>
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