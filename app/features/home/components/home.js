import React, {Component} from 'react';
import {View, ScrollView, Image, RefreshControl, StyleSheet, Text, Dimensions} from 'react-native';

import CommonRowCell from '../../../components/common_row_cell';
import CommonTableHeader from '../../../components/common_table_header';
import Order from '../../order/components/order';

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

  _getNotificationView() {
    if (this.props.notifications.length > 0) {
      return this.props.notifications.map((noti, i) => {
        const image = noti.significance === 'NO' ? require('../../../images/notification/inform_blue.png')
          : require('../../../images/notification/inform_red.png')
        return <CommonRowCell key={i} title={noti.title} description={noti.introduction} image={image}/>
      });
    } else {
      return <Text>暂无通知</Text>;
    }
  }

  _getStudyCoursesView() {
    if (this.props.courses.length > 0) {
      return this.props.courses.map((course, i) => {
        return <CommonRowCell key={i} title={course.name} description={course.introduction}
                              headTitle={course.name.split('')[0]}/>
      });
    } else {
      return <Text>暂无通知</Text>;
    }
  }

  _getOrdersView() {
    if (this.props.orders.length > 0) {
      return this.props.orders.map((order, i) => {
        return <Order order={order} key={i}/>
      });
    } else {
      return <Text>暂无服务</Text>;
    }
  }

  render() {
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
      <Image style={{resizeMode: 'stretch'}} source={require('../../../images/home/headIm.png')}/>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='通知' more='更多'/>
          {this._getNotificationView()}
        </View>
      </View>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='学习' more='更多'/>
          {this._getStudyCoursesView()}
        </View>
      </View>
      <View style={styles.notification_view}>
        <View style={styles.title_view}>
          <CommonTableHeader title='患者服务' more='更多'/>
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