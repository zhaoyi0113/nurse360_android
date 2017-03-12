import React from "react";
import {View, StyleSheet, Text, Image, ScrollView, TouchableHighlight, Navigator, RefreshControl} from "react-native";
import {FontSize} from "../../../constants";
import _ from "lodash";
import Order from "../../order/components/order";
import CourseCell from "../../course/components/course_cell";
import {COURSE_DETAIL} from "../../../routers";
import OrderDetail from "../../order/components/order_detail";

export default class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {routeIndex: 0, isRefreshing: false};
  }

  _goToUserTask() {
    this.props.rootNavigation.navigate('UserOrderList', {fetchOrder: this.props.fetchOrder.bind(this)});
  }

  _goToUserCourse() {
    this.props.rootNavigation.navigate('HistoryCourse')
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.props.refresh()
      .then(v => this.setState({isRefreshing: false}));
  }

  render() {
    let {userInfo, userOrder, userCourse, fetchOrder, cancelOrder} = this.props;
    return (
      <ScrollView style={styles.container}
                  refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="lightgray"
            title="Loading..."
            colors={['lightgray']}
          />
        }
      >
        <UserHeader userInfo={userInfo}
                    navigation={this.props.rootNavigation}
        />
        <Function userInfo={userInfo}
                  goToUserCourse={this._goToUserCourse.bind(this)}
                  goToUserTask={this._goToUserTask.bind(this)}
        />
        <Tasks userInfo={userInfo} userOrder={userOrder}
               fetchOrder={fetchOrder.bind(this)}
               openOrder={(order)=> this.props.rootNavigation.navigate('OrderDetail',
               {order: order, fetchOrder: this.props.fetchOrder.bind(this), cancelOrder: cancelOrder.bind(this)})}
               clickMore={this._goToUserTask.bind(this)}/>
        <LearnHistory userInfo={userInfo} userCourse={userCourse}
                      openCourse={()=>{
                        this.props.rootNavigation.navigate('Article',{routeId: COURSE_DETAIL, id: userCourse.id, title: userCourse.name})}}
                      clickMore={this._goToUserCourse.bind(this)}/>
      </ScrollView>
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
    let wallet = '0.00';
    if (userInfo.wallet) {
      wallet = userInfo.wallet;
    }
    let headerPhoto
    if (userInfo.profilePhotoUrl) {
      headerPhoto = {uri: userInfo.profilePhotoUrl}
    } else {
      headerPhoto = require('../../../images/user/default_header.png')
    }
    return (
      <View style={headerStyles.container}>
        <Image style={headerStyles.image} source={headerPhoto}/>
        <View style={headerStyles.text_area}>
          <Text style={headerStyles.nurse_name}>{userInfo.name}</Text>
          <Text style={headerStyles.department_name}>{userInfo.departmentName}</Text>
          <Text style={headerStyles.hospital_name}>{userInfo.hospitalName}</Text>
        </View>
        <TouchableHighlight style={headerStyles.wallet} underlayColor='transparent'
                            onPress={()=>this.props.navigation.navigate('Wallet')}>
          <View>
            <Text style={headerStyles.nurse_name}>我的钱包</Text>
            <Text style={headerStyles.nurse_name}>{wallet}元</Text>
          </View>
        </TouchableHighlight>
        <View style={headerStyles.right_area}>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('UserSetting')}
                              underlayColor="transparent">
            <Image style={headerStyles.setting}
                   source={require('../../../images/editSetting.png')}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('Wallet')}>
            <Image style={headerStyles.next_image} source={require('../../../images/next.png')}/>
          </TouchableHighlight>
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
        id: 0,
        image: require('../../../images/user/woderenwu.png'),
        text: '我的任务',
      }, {
        id: 1,
        image: require('../../../images/user/wodexuexi.png'),
        text: '我的学习',
      }, {
        id: 2,
        image: require('../../../images/user/wodetiwen.png'),
        text: '患者提问',
      }]
    }
  }

  _clickFunction(f) {
    switch (f.id) {
      case 0:
        this.props.goToUserTask();
        break;
      case 1:
        this.props.goToUserCourse();
        break;
      case 2:
        break;
    }
  }

  render() {
    return (
      <View style={functionStyles.container}>
        {
          this.state.functions.map((f, i) => {
            return <TouchableHighlight key={i} underlayColor='lightgray'
                                       onPress={this._clickFunction.bind(this,f)}
                                       style={functionStyles.view}>
              <View key={i}>
                <Image style={functionStyles.image} source={f.image}/>
                <Text>{f.text}</Text>
              </View>
            </TouchableHighlight>
          })
        }
      </View>
    )
  }

}

class Tasks extends React.Component {
  render() {
    const {userOrder} = this.props;
    let order;
    if (!_.isEmpty(userOrder)) {
      order = <View style={taskStyles.task}>
        <Order order={userOrder} onClick={()=>this.props.openOrder(userOrder)}/>
      </View>
    } else {
      order = <View style={{backgroundColor: 'white', padding: 10}}>
        <Text style={{textAlign:'center'}}>暂无任务提醒</Text>
      </View>
    }
    return (
      <View style={taskStyles.container}>
        <View style={taskStyles.header}>
          <Text style={taskStyles.reminder}>任务提醒</Text>
          <TouchableHighlight onPress={this.props.clickMore.bind(this)} underlayColor='lightgray'><Text
            style={taskStyles.more}>更多</Text></TouchableHighlight>
        </View>
        {order}
      </View>
    )
  }
}

class LearnHistory extends React.Component {
  render() {
    let course;
    if (_.isEmpty(this.props.userCourse)) {
      course = <Text style={{padding: 10, backgroundColor: 'white', textAlign: 'center'}}>暂无学习历史</Text>
    } else {
      course = <CourseCell course={this.props.userCourse} openCourse={this.props.openCourse.bind(this)}/>;
    }
    return (
      <View style={historyStyles.container}>
        <View style={historyStyles.header}>
          <Text style={taskStyles.reminder}>学习历史</Text>
          <TouchableHighlight underlayColor='lightgray'
                              onPress={this.props.clickMore.bind(this)}><Text
            style={taskStyles.more}>更多</Text></TouchableHighlight>
        </View>
        {course}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#f6f6f6',
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
    height: 110,
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
    height: 20,
    width: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },

});

const functionStyles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  }
});

const taskStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: '#f6f6f6',
  },
  reminder: {
    color: '#9a9a9a',
    marginLeft: 10,
    flex: 1,
  },
  more: {
    marginRight: 10,
    textAlign: 'right',
    flex: 1,
    color: '#559bec',
    fontSize: FontSize.small,
  },
  task: {
    backgroundColor: 'white',
  }
});

const historyStyles = StyleSheet.create({
  container: {
    // height: 150,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#f6f6f6',
    flexDirection: 'row',
    margin: 10
  }
});