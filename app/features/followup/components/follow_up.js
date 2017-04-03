import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight} from 'react-native';
import {colors} from '../../../constants';

export default class FollowUp extends React.Component {

  render() {
    let {patient, followUpList, navigation} = this.props;
    return (<View style={{backgroundColor: colors.bkColor, flex:1}}>
      <TouchableHighlight underlayColor={colors.underlayColor} onPress={()=> navigation.navigate('NewFollowUp', {patient})}>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <Image style={{height:30, width:30, marginVertical: 5}}
                 source={require('../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>推送新的随访</Text>
        </View>
      </TouchableHighlight>
      <ScrollView>
        {
          followUpList.length === 0 ?
            <Text style={{color: colors.lightTextColor, alignSelf: 'center', marginTop: 10}}>暂无随访记录</Text> : null
        }
        {
          followUpList.map((followUp, i) => {
            return (<View>

            </View>);
          })
        }
      </ScrollView>
    </View>);
  }

}

FollowUp.propTypes = {
  followUpList: React.PropTypes.array,
}
FollowUp.defaultProps = {
  followUpList: []
}