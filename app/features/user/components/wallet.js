import React from 'react';
import {View, TouchableHighlight, StyleSheet, Text, ScrollView, Button, RefreshControl} from 'react-native';
import {colors, FontSize} from '../../../constants';
import {getDate} from '../../../reducers/common_reducer';
import Withdraw from './withdraw';

export default class Wallet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.props._refresh();
  }

  _endRefresh() {
    this.setState({isRefreshing: false});
  }

  render() {
    let {userInfo, wallets, navigation, withdraw} = this.props;
    return (
      <View style={{flex:1, backgroundColor: colors.bkColor}}>
        <ScrollView style={styles.container} refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="lightgray"
            title="Loading..."
            colors={['lightgray']}
          />
        }>

          <Text style={{flex:1, margin:10}}>当前余额</Text>
          <Text
            style={{flex:1.5, fontSize: FontSize.xxlarge, textAlign: 'center', color: '#559bec'}}>{userInfo.wallet}元</Text>
          <Text style={{flex:1, margin: 10}}>收支明细</Text>
          <View style={{flex: 15}}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{flex:1, textAlign:'center'}}>服务名</Text>
              <Text style={{flex:1, textAlign:'center'}}>时间</Text>
              <Text style={{flex:1, textAlign:'center'}}>金额</Text>
            </View>
            {
              wallets.map((wallet, i) => {
                return <View key={i}
                             style={{flex:1, height:30, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'lightgray', marginHorizontal: 0}}>
                  <Text
                    style={{flex:1, textAlign:'center', alignSelf:'center', color: 'gray', fontSize: FontSize.small}}>{wallet.summary}</Text>
                  <Text
                    style={{flex:1, textAlign:'center', alignSelf:'center',color: 'gray', fontSize: FontSize.small}}>{getDate(wallet.time)}</Text>
                  <Text
                    style={{flex:1, textAlign:'center', alignSelf:'center',color: '#559bec', fontSize: FontSize.small}}>{wallet.amount}</Text>
                </View>
              })
            }
          </View>
        </ScrollView>
        <Button style={{ position: 'absolute', bottom: 10}} title="申请提现"
                onPress={()=>navigation.navigate('Withdraw', {withdraw: withdraw.bind(this), amount: userInfo.wallet,
              component: <Withdraw navigator={navigator} withdraw={withdraw.bind(this)} amount={userInfo.wallet}/>})}/>
      </View>
    );
  }
}

Wallet.propTypes = {
  wallets: React.PropTypes.array,
  userInfo: React.PropTypes.object,
}

Wallet.defaultProps = {
  wallets: [],
  userInfo: {}
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
  }
});