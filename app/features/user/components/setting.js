import React from 'react';
import {View, Text, Image} from 'react-native';

export default class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: '修改密码',
        image: require('../../../images/settings/changePwd.png'),
      }, {
        name: '意见反馈',
        image: require('../../../images/settings/agreement.png'),
      }, {
        name: '给我评分',
        image: require('../../../images/settings/mark.png'),
      }, {
        name: '用户协议',
        image: require('../../../images/settings/memo.png'),
      }, {
        name: '关于',
        image: require('../../../images/settings/about.png'),
      }, {
        name: '退出登录',
        image: require('../../../images/settings/logout.png'),
      }]
    };
  }

  render() {
    console.log('render setting');
    return (
      <View style={{flex:1, height:100, flexDirection: 'column', marginTop: 50}}>
        <Text>设置您的账号</Text>
        {
          this.state.items.map((item, i) => {
            return <View key={i} >
              <Image source={item.image}/>
              <Text>item.name</Text>
              <Image source={require('../../../images/next.png')}/>
            </View>
          })
        }
      </View>
    )
  }
}