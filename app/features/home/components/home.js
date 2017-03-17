import React, {Component} from "react";
import {View, ScrollView, Image, RefreshControl, StyleSheet, Text, Dimensions, Alert} from "react-native";
import CommonRowCell from "../../../components/common_row_cell";
import CommonTableHeader from "../../../components/common_table_header";
import Order from "../../order/components/order";
import * as types from "../../../actions/action_types";
import {NOTIFICATION_DETAIL, COURSE_DETAIL} from "../../../routers";


export default class Home extends Component {

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

  _fetchOrder(order) {
    return this.props.fetchOrder(order)
      .then((response) => {
        if (response.type === types.FETCH_ORDER_HTTP + types.FAIL) {
          return;
        }
        this.props.queryOrders();
        Alert.alert(
          '',
          '您已抢单成功',
          [
            {text: '知道了', onPress: () => console.log('Ask me later pressed'), style: 'cancel'},
            {
              text: '查看订单', onPress: () => this.props.rootNavigation.navigate('OrderDetail',
              {
                order: order,
                fetchOrder: this._fetchOrder.bind(this),
              })
            },
          ],
          {cancelable: false}
        );
      });
  }

  _getNotificationView() {
    const {navigate} = this.props.rootNavigation;
    if (this.props.notifications.length > 0) {
      return this.props.notifications.map((noti, i) => {
        return <CommonRowCell key={i} title={noti.title} description={noti.introduction} image={noti.image}
                              hasRead={noti.hasRead}
                              onClick={()=>navigate('Article',{ routeId: NOTIFICATION_DETAIL, id: noti.id, title:noti.title})}/>
      });
    } else {
      return <Text style={{textAlign: 'center'}}>暂无通知</Text>;
    }
  }

  _getStudyCoursesView() {
    if (this.props.courses.length > 0) {
      const {navigate} = this.props.rootNavigation;
      return this.props.courses.map((course, i) => {
        return <CommonRowCell key={i} title={course.name} description={course.introduction}
                              headTitle={course.name.split('')[0]}
                              hasRead={course.hasRead}
                              onClick={()=> navigate('Article',
                                {
                                  routeId: COURSE_DETAIL,
                                  id: course.id,
                                  title: course.name,
                                }
                              )}/>
      });
    } else {
      return <Text style={{textAlign: 'center'}}>暂无学习</Text>;
    }
  }

  _getOrdersView() {
    if (this.props.orders.length > 0) {
      const {navigate} = this.props.rootNavigation;
      return this.props.orders.map((order, i) => {
        return <Order order={order} key={i} navigator={this.props.navigator}
                      fetchOrder={this._fetchOrder.bind(this)}
                      onClick={()=>navigate('OrderDetail',{
                        order: order,
                        fetchOrder: (order)=>this._fetchOrder(order),
                      })}/>
      });
    } else {
      return <Text style={{textAlign: 'center'}}>暂无服务</Text>;
    }
  }

  render() {
    const {navigate} = this.props.rootNavigation;
    return (<ScrollView style={{flexDirection: 'column', backgroundColor: '#f6f6f6'}}
                        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="lightgray"
            title="Loading..."
            colors={['lightgray']}
          />
        }>
      <Image style={{height:150,width:Dimensions.get('window').width,resizeMode:'cover'}}
             source={require('../../../images/home/headIm.png')}/>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='通知' more='更多'
                             clickMore={()=>navigate('NotificationList',
                               {})}/>
          {this._getNotificationView()}
        </View>
      </View>
      <View style={{height:1, flex:1, backgroundColor: 'lightgray'}}/>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='学习' more='更多'
                             clickMore={()=>navigate('StudyList')}/>
          {this._getStudyCoursesView()}
        </View>
      </View>
      <View style={{height:1, flex:1, backgroundColor: 'lightgray'}}/>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='患者服务' more='更多'
                             clickMore={()=>navigate('OrderList',
                                      {
                                        fetchOrder: (order)=>this._fetchOrder(order)
                                      })}
          />
          {this._getOrdersView()}
        </View>
      </View>
    </ScrollView>);
  }
}

Home.propTypes = {
  notifications: React.PropTypes.array,
  courses: React.PropTypes.array,
  orders: React.PropTypes.array,
}

Home.defaultProps = {
  notifications: [],
  courses: [],
  orders: [],
}

const styles = {
  notification_view: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  title_view: {
    flex: 1,
    flexDirection: 'column',
  }
}