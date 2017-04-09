import React from 'react';
import {View, Text, Image, ScrollView, Button} from 'react-native';

import {colors, margin, FontSize} from '../../../constants';
import {getDate} from '../../../reducers/common_reducer';
import NurseHeader from '../components/nurse_header';
import ImageSelector from '../../../components/image_selector';

const QuestionDescription = ({description, images}) => {
  const showImages = images.map(image => {
    return {source: {uri: image}}
  });
  return (<View style={{backgroundColor: 'white', marginHorizontal: margin}}>
    <Text style={{marginHorizontal: margin}}>{description}</Text>
    <ImageSelector images={showImages} enableSelect={false}/>
  </View>);
}

const Talks = ({talks}) => {
  console.log('xxx:', talks);
  return (<View>
    {
      talks.map((talk, i) => {
        const image = talk.nurse.profilePhotoUrl ? {uri: talk.nurse.profilePhotoUrl} : require('../../../images/user/default_header.png');

        return <View key={i} style={{flexDirection: 'row'}}>
          <View>
            <Image style={{width:30, height:30, borderRadius:15, margin: margin}} source={image}/>
            <Text
              style={{color: colors.labelColor, borderWidth:1,marginHorizontal:margin, borderColor: colors.labelColor,
               fontSize: FontSize.small, textAlign:'center'}}>{talk.nurse.properties.info_extension.jobTitle}</Text>
          </View>
          <Text style={{flex:1, backgroundColor: 'white', textAlignVertical:'center', paddingLeft:margin}}>{talk.talkContent}</Text>
        </View>
      })
    }
  </View>);
}

export default class QuestionDetail extends React.Component {

  _submit(){}

  render() {
    const {patient, followUp, nurseInfo} = this.props;

    return (<View style={{flex:1}}>
      <ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
        <NurseHeader nurseInfo={nurseInfo}/>
        <Text style={{margin: margin, color: colors.lightTextColor}}>问题描述</Text>
        <QuestionDescription description={followUp.followUpContent.diseaseDescription}
                             images={followUp.followUpContent.imagesUrl}/>
        <Text style={{margin: margin, color: colors.lightTextColor}}>问题答复</Text>
        {
          followUp.followUpContent && followUp.followUpContent.talks && followUp.followUpContent.talks.length > 0
            ? <Talks talks={followUp.followUpContent.talks}/>
            : <Text style={{backgroundColor: 'white', margin: margin, textAlign: 'center'}}>暂无答复</Text>
        }


      </ScrollView>
      <View style={{margin: margin, borderRadius: 5}}><Button title='回复' onPress={this._submit.bind(this)}/></View>
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