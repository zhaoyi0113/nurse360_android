import React from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, Dimensions} from 'react-native';

import {colors} from '../../../../constants';
import ImageSelector from '../../../../components/image_selector';

export default class NewCaseRecord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {record: ''};
  }

  _addRecord() {
    const images = this.imageSelector.state.images;
    if (this.props.record) {
      this._updaterRecord();
    } else {
      this.props.createNewCaseRecord(this.state.record, images);
    }
  }

  _updaterRecord() {
    const images = this.imageSelector.state.images;
    this.props.updateCaseRecord(this.props.record.id, this.state.record, images);
  }

  componentDidMount() {
    const {record} = this.props;
    if (record) {
      let images
      if (record.imagesUrl && record.imagesUrl.length > 0) {
        images = [];
        record.imagesUrl.map(url => {
          images.push({source: {uri: url}});
        })
      }
      this.setState({record: record.caseRecord, images: images});
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: colors.bkColor}}>
        <ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
          <Text style={{color: colors.lightTextColor, marginLeft:20, marginTop: 10}}>病例记录</Text>
          <TextInput style={{margin:10, height: 80, backgroundColor: 'white'}}
                     underlineColorAndroid='transparent'
                     onChangeText={(text)=>this.setState({record: text})}
                     value={this.state.record}
                     placeholder='描述护理情况，伤口状况。'/>
          <Text style={{color: colors.lightTextColor, marginLeft:20, marginTop: 10}}>上传问题相关或诊断结果（最多9张，没有可不传）</Text>
          <ImageSelector ref={(image)=> this.imageSelector = image} images={this.state.images}/>

        </ScrollView>
        <View style={{position: 'absolute', bottom: 10, width: Dimensions.get('window').width-20, marginHorizontal:10}}>
          <Button title='确认添加' onPress={this._addRecord.bind(this)}/>
        </View>
      </View>);
  }

}