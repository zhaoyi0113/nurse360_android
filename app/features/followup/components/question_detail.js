import React from 'react';
import {View, Text, Image, ScrollView, Button, StyleSheet} from 'react-native';

import {colors, margin, FontSize} from '../../../constants';
import {getTime} from '../../../reducers/common_reducer';
import NurseHeader from '../components/nurse_header';
import ImageSelector from '../../../components/image_selector';

const QuestionDescription = ({description, images}) => {
  const showImages = images && images.map(image => {
      return {source: {uri: image}}
    });
  return (<View style={{backgroundColor: 'white', marginHorizontal: margin}}>
    <Text style={{marginHorizontal: margin}}>{description}</Text>
    <ImageSelector images={showImages} enableSelect={false}/>
  </View>);
}

const Talks = ({talks}) => {
  return (<View>
    {
      talks.map((talk, i) => {
        const image = talk.nurse.profilePhotoUrl ? {uri: talk.nurse.profilePhotoUrl} : require('../../../images/user/default_header.png');
        let imagesUrl = talk.imagesUrl && talk.imagesUrl.map(url => {
            return {source: {uri: url}}
          });
        const imageStyle = StyleSheet.create({image:{
          margin: 5,
          resizeMode: 'contain',
          height: 80,
          width:80,
        }});

        return <View key={i} style={{flexDirection: 'row', margin:margin}}>
          <View>
            <Image style={{width:30, height:30, borderRadius:15, margin: margin}} source={image}/>
            <Text
              style={{color: colors.labelColor, borderWidth:1,marginHorizontal:margin, borderColor: colors.labelColor,
               borderRadius: 5,
               fontSize: FontSize.small, textAlign:'center'}}>{talk.nurse.properties.info_extension.jobTitle}</Text>
          </View>
          <View style={{flex:1, backgroundColor: 'white'}}>
            <Text
              style={{flex:1, backgroundColor: 'white', textAlignVertical:'center', paddingLeft:margin}}>
              {talk.talkContent}</Text>
            {imagesUrl ? <ImageSelector enableSelect={false} images={imagesUrl} imageStyle={imageStyle.image}/> : null}
          </View>
        </View>
      })
    }
  </View>);
}

export default class QuestionDetail extends React.Component {

  _submit() {
    const {followUp, replyQuestion} = this.props;
    this.props.navigation.navigate('QuestionReply', {followUp, replyQuestion});
  }

  render() {
    const {followUp, nurseInfo} = this.props;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
        <Text
          style={{width:150, alignSelf: 'center', borderRadius: 10,  textAlign:'center', backgroundColor: 'lightgray'}}>{getTime(followUp.time)}</Text>
        <NurseHeader nurseInfo={nurseInfo}/>
        <Text style={{margin: margin, color: colors.lightTextColor, borderRadius: 5}}>问题描述</Text>
        <QuestionDescription description={followUp.diseaseDescription}
                             images={followUp.imagesUrl}/>
        <Text style={{margin: margin, color: colors.lightTextColor}}>问题答复</Text>
        {
          followUp.talks && followUp.talks.length > 0
            ? <Talks talks={followUp.talks}/>
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
  followUp: {talks: []}
}