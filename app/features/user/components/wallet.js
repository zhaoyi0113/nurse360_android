import React from 'react';
import {View, TouchableHighlight, StyleSheet, Text, ScrollView, Button} from 'react-native';
import {FontSize} from '../../../constants';
import {getDate} from '../../../reducers/common_reducer';

export default class Wallet extends React.Component {

  render() {
    let {userInfo, wallets} = this.props;
    return (<View style={styles.container}>
      <Text style={{flex:1, margin:10}}>当前余额</Text>
      <Text
        style={{flex:1.5, fontSize: FontSize.xxlarge, textAlign: 'center', color: 'lightblue'}}>{userInfo.wallet}</Text>
      <Text style={{flex:1, margin: 10}}>收支明细</Text>
      <View style={{flex: 15}}>
        <ScrollView>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={{flex:1, textAlign:'center'}}>服务名</Text>
            <Text style={{flex:1, textAlign:'center'}}>时间</Text>
            <Text style={{flex:1, textAlign:'center'}}>金额</Text>
          </View>
          {
            wallets.map((wallet, i)=>{
              return <View key={i} style={{flex:1, flexDirection:'row'}}>
                <Text style={{flex:1, textAlign:'center', color: 'gray', fontSize: FontSize.small}}>{wallet.summary}</Text>
                <Text style={{flex:1, textAlign:'center', color: 'gray', fontSize: FontSize.small}}>{getDate(wallet.time)}</Text>
                <Text style={{flex:1, textAlign:'center', color: 'blue', fontSize: FontSize.small}}>{wallet.amount}</Text>
              </View>
            })
          }
        </ScrollView>
      </View>
      <Button style={{flex:2, margin:25}} onPress={()=>console.log('')} title="申请提现"/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
  }
});