import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {FontSize} from '../../../constants';

export default class User extends React.Component {

  render() {
    let {userInfo} = this.props;
    return (
      <View style={styles.container}>
        <UserHeader userInfo={userInfo}/>
        <Function userInfo={userInfo}/>
        <View style={styles.task_reminder}>
          <Text>task</Text>
        </View>
        <View style={styles.learn_history}>
          <Text>history</Text>
        </View>
      </View>
    );
  }

}

User.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
}
User.defaultProps = {
  userInfo: {},
}

class UserHeader extends React.Component {

  render() {
    let {userInfo} = this.props;
    return (
      <View style={headerStyles.container}>
        <Image style={headerStyles.image} source={{uri: userInfo.profilePhotoUrl}}/>
        <View style={headerStyles.text_area}>
          <Text style={headerStyles.nurse_name}>{userInfo.name}</Text>
          <Text style={headerStyles.department_name}>{userInfo.departmentName}</Text>
          <Text style={headerStyles.hospital_name}>{userInfo.hospitalName}</Text>
        </View>
        <View style={headerStyles.wallet}>
          <Text style={headerStyles.nurse_name}>我的钱包</Text>
          <Text style={headerStyles.nurse_name}>{userInfo.wallet}元</Text>
        </View>
        <View style={headerStyles.right_area}>
          <Image style={headerStyles.setting} source={require('../../../images/editSetting.png')}/>
          <Image style={headerStyles.next_image} source={require('../../../images/next_blue.png')}/>
        </View>
      </View>
    )
  }
}

class Function extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      functions: [{
        image: require('../../../images/user/woderenwu.png'),
        text: '我的任务',
      }, {
        image: require('../../../images/user/wodexuexi.png'),
        text: '我的学习',
      }, {
        image: require('../../../images/user/wodetiwen.png'),
        text: '患者提问',
      }
      ]
    }
  }

  render() {
    return (
      <View style={functionStyles.container}>
        {
          this.state.functions.map((f, i) => {
            return <View key={i} style={functionStyles.view}>
              <Image style={functionStyles.image} source={f.image}/>
              <Text>{f.text}</Text>
            </View>
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },

  function: {
    flex: 1,
  },
  task_reminder: {
    flex: 2,
  },
  learn_history: {
    flex: 1,
  }
});

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#559bec',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    alignSelf: 'center',
  },
  text_area: {
    marginLeft: 10,
    flex: 3,
    alignSelf: 'center',
  },
  nurse_name: {
    color: 'white'
  },
  department_name: {
    color: 'white',
    fontSize: FontSize.small,
    marginBottom: 10,
  },
  hospital_name: {
    color: 'white',
    fontSize: FontSize.small,
  },
  right_area: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginRight: 5,
  },
  wallet: {
    right: 5,
    alignSelf: 'center',
  },
  setting: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  next_image: {
    height: 10,
    width: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },

});

const functionStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  }
});