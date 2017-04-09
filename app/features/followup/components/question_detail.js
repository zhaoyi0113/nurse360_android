import React from 'react';
import {View, Text, Image, ScrollView, Button} from 'react-native';

import {colors, margin} from '../../../constants';
import {getDate} from '../../../reducers/common_reducer';
import NurseHeader from '../components/nurse_header';
import ImageSelector from '../../../components/image_selector';

const QuestionDescription = ({description, images}) => {
  const showImages = images.map(image => {
    return {source: {uri: image}}
  });
  console.log('xxxx:', showImages);
  return (<View style={{backgroundColor: 'white', marginHorizontal: margin}}>
    <Text style={{marginHorizontal: margin}}>{description}</Text>
    <ImageSelector images={showImages} enableSelect={false}/>
  </View>);
}

export default class QuestionDetail extends React.Component {

  render() {
    const {patient, followUp, nurseInfo} = this.props;
    return (<View style={{flex:1}}>
      <ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
        <NurseHeader nurseInfo={nurseInfo}/>
        <Text style={{margin: margin, color: colors.lightTextColor}}>问题描述</Text>
        <QuestionDescription description={followUp.followUpContent.diseaseDescription}
                             images={followUp.followUpContent.imagesUrl}/>
        <Text style={{margin: margin, color: colors.lightTextColor}}>问题答复</Text>
        <Text style={{backgroundColor: 'white', margin: margin, textAlign: 'center'}}>暂无答复</Text>

      </ScrollView>
      <View style={{margin: margin, borderRadius: 5}}><Button title='回复'/></View>
    </View>);
  }

}

QuestionDetail.propTypes = {
  nurseInfo: React.PropTypes.object,
  followUp: React.PropTypes.object,
}

QuestionDetail.defaultProps = {
  nurseInfo: {},
  followUp: {followUpContent: {}}
}