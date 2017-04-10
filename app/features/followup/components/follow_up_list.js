
import React from 'react';
import {View, Text} from 'react-native';

import CommonRowCell from '../../../components/common_row_cell';
import {colors, margin} from '../../../constants';

export default FollowUpList = ({list, navigation, patient}) => {
  return (<View style={{flex:1}}>
    {
      list.length === 0 ?
        <Text style={{color: colors.lightTextColor, alignSelf: 'center', marginTop: 10}}>暂无随访记录</Text> : null
    }
    {
      list.map((followUp, i) => {
        let {followUpContent} = followUp;
        const bk = followUp.hasRead === 'YES' ? 'white' : colors.bkColor;
        return (<View key={i} style={{flex:1, backgroundColor: bk, marginBottom: margin}}>
          <CommonRowCell title={followUpContent.title}
                         hasRead={followUp.nurseRead}
                         description={followUpContent.description || followUpContent.diseaseDescription}
                         onClick={()=>{
                           if(followUp.followUpType === 'QUESTIONNAIRE'){
                            navigation.navigate('TemplateDetail', {template:followUp, submit:false, title: '问卷详情'});
                           } else if(followUp.followUpType === 'CONSULTATION'){
                             navigation.navigate('QuestionDetail', {followUp, patient});
                           }
                         }}
                         showNextIcon={false}
                         nextText={followUp.nurseRead === 'YES'?'已回复':'未回复'}
                         headTitle={followUpContent.title.split('')[0]}/>
        </View>);
      })
    }
  </View>);
}

FollowUpList.propTypes = {
  list: React.PropTypes.array,
}

FollowUpList.defaultProps = {
  list:[],
}