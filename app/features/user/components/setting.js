import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight, Alert} from 'react-native';

export default class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: 0,
        name: '修改密码',
        image: require('../../../images/settings/changePwd.png'),
      }, {
        id: 1,
        name: '意见反馈',
        image: require('../../../images/settings/agreement.png'),
      }, {
        id: 2,
        name: '给我评分',
        image: require('../../../images/settings/mark.png'),
      }, {
        id: 3,
        name: '用户协议',
        image: require('../../../images/settings/memo.png'),
      }, {
        id: 4,
        name: '关于',
        image: require('../../../images/settings/about.png'),
      }, {
        id: 5,
        name: '退出登录',
        image: require('../../../images/settings/logout.png'),
      }]
    };
  }

  click(item) {
    const that = this;
    if (item.id === 5) {
      Alert.alert(
        '',
        '退出账户？',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => that.props.logout()},
        ],
        {cancelable: false}
      )
    }
  }

  render() {
    console.log('logout = ', this.props.logout);
    return (
      <View style={{flex:1, height:100, flexDirection: 'column', marginTop: 50}}>
        <Text style={{marginLeft: 30}}>设置您的账号</Text>
        {
          this.state.items.map((item, i) => {
            return <View key={i} style={styles.cell_view}>
              <Image style={styles.image} source={item.image}/>
              <TouchableHighlight onPress={()=> this.click(item)} style={styles.text} underlayColor="transparent">
                <Text>{item.name}</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> this.click(item)} style={styles.next} underlayColor="transparent">
                <Image style={{resizeMode: 'contain', height: 20}} source={require('../../../images/next.png')}/>
              </TouchableHighlight>
            </View>
          })
        }
        <View style={{flex:3}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cell_view: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    alignItems: 'center',
    flex: 1,
  },
  image: {
    flex: 0.5,
    margin: 10,
    resizeMode: 'contain',
  },
  text: {
    flex: 3,

  },
  next: {
    flex: 0.5,
    margin: 15,

  }
});