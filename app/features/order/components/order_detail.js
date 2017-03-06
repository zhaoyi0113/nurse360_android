import React from "react";
import {View, Text, Image, StyleSheet, Button, Linking, Alert} from "react-native";

import HeaderCategoryView from "../../../components/header_category_view";
import {FontSize} from "../../../constants";
import {getDate, getTime} from "../../../reducers/common_reducer";
import {ORDER_STATUS_NAME} from '../../../reducers/order_reducer';

export default class OrderDetail extends React.Component {

  static navigationOptions = {
    title: '订单详情',
    cardStack: {
      gesturesEnabled: true
    }
  }

  _cancelOrder() {
    const mobile = '01065185531';
    Alert.alert(
      '取消需联系客服',
      mobile,
      [
        {
          text: '呼叫', onPress: () => Linking.openURL('tel:' + mobile)
        },
        {
          text: '取消'
        }
      ]
    )
  }

  _addVisit(order) {
    this.props.navigation.navigate('VisitContainer', {order: order});
  }

  render() {
    let {order, fetchOrder} = this.props.navigation.state.params;
    let {patient} = order;
    let payment = order.pingPP && order.pingPP.length > 0 ? order.pingPP[0] : {}

    return (<View style={styles.container}>
      <HeaderCategoryView title={ORDER_STATUS_NAME[order.orderStatus]} description={'订单号:'+order.orderNo}
                          image={require('../../../images/order/alPay.png')}/>
      <Patient patient={patient} serviceStartTime={order.serviceStartTime} address={order.address}/>
      {
        order.vendorType === 'HOSPITAL' ?
          <Hospital hospital={order.vendorHospital} service={order.serviceItem} serviceIcon={order.icon}/> :
          <View/>
      }
      <Paymethod payment={payment} service={order.serviceItem}/>
      <TimeInfo order={order} payment={payment} fetchOrder={(order)=>fetchOrder(order)}
                addVisit={()=>this._addVisit(order)}
                cancelOrder={this._cancelOrder.bind(this)}/>
    </View>);
  }
}


class Patient extends React.Component {
  render() {
    let {patient, serviceStartTime, address} = this.props;
    return (<View style={styles.info_blok}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={{marginRight: 10}}>{patient.name}</Text>
        <Text>{patient.mobile}</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={{marginRight: 10, fontSize: FontSize.small, marginBottom: 5}}>时间:{getDate(serviceStartTime)}</Text>
        <Text style={{fontSize: FontSize.small}}>地址: {address}</Text>
      </View>
    </View>);
  }
}

class Hospital extends React.Component {

  render() {
    let {hospital, service, serviceIcon} = this.props;
    return (<View style={styles.info_blok}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1.5}}>
        <Image style={{flex:0.2, resizeMode: 'contain', marginRight: 5}}
               source={require('../../../images/hospital/yi.png')}/>
        <Text style={{flex:3}}>{hospital.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1.5}}>
        <Image style={{flex:0.08, resizeMode: 'contain', marginRight: 5}}
               source={serviceIcon}/>
        <Text style={{flex:1}}>{service.name}</Text>
        <Text style={{fontSize: FontSize.small}}>¥ {service.servicePrice}</Text>
      </View>
    </View>);
  }
}

class Paymethod extends React.Component {
  render() {
    let {payment, service} = this.props;
    return (<View
      style={{flex:0.25, marginHorizontal:10,marginVertical:5, backgroundColor:'white', flexDirection: 'column', borderRadius:5}}>
      <View style={{flex:1, flexDirection: 'row', padding: 5, borderBottomWidth:1, borderBottomColor: '#F5FCFF'}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>支付方式</Text>
        <Text>{payment.channel === 'wx' ? '微信' : '支付宝'}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', padding: 5}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>优惠</Text>
        <Text>¥ {service.serviceDiscount}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', padding: 5}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>实付款</Text>
        <Text>¥ {service.servicePrice}</Text>
      </View>
    </View>);
  }
}

class TimeInfo extends React.Component {
  render() {
    let {order, payment, addVisit} = this.props;
    let textStyle = StyleSheet.create({style: {fontSize: FontSize.small}});
    let fetchTime;
    let fetchTimeStyle;
    if (order.fetchTime) {
      fetchTime = getTime(order.fetchTime);
      fetchTimeStyle = StyleSheet.create({style: {fontSize: FontSize.small, flex: 2}});
    } else {
      fetchTime = '待接单';
      fetchTimeStyle = StyleSheet.create({style: {fontSize: FontSize.small, flex: 2, color: 'rgb(85, 155, 236)'}});
    }
    return (<View style={{flex:0.2, flexDirection: 'column', marginHorizontal:10, marginBottom: 5}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={textStyle.style}>创建时间：</Text>
        <Text style={textStyle.style}>{getTime(order.time)}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={textStyle.style}>付款时间：</Text>
        <Text style={textStyle.style}>{getTime(payment.time)}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={textStyle.style}>接单时间：</Text>
        <Text style={fetchTimeStyle.style}>{fetchTime}</Text>
      </View>
      <OrderButtonPanel order={order} fetchOrder={this.props.fetchOrder.bind(this)}
                        addVisit={addVisit.bind(this)}
                        cancelOrder={this.props.cancelOrder.bind(this)}/>
    </View>);
  }
}

class OrderButtonPanel extends React.Component {

  render() {
    const {order, fetchOrder, cancelOrder, addVisit} = this.props;
    let actionStyle = order.orderStatus === 'TO_SERVICE' ? styles.action_active : styles.action_gray;
    if (order.orderStatus === 'IN_PROCESS' && order.isNurseFetched === 'YES') {
      return (<View style={{flex:0.5, flexDirection: 'row'}}>
        <Text style={styles.chuzhen} onPress={addVisit.bind(this)}>出诊添加</Text>
        <View style={{flex:1}}/>
        <Text style={styles.chuzhen} onPress={cancelOrder.bind(this)}>取消订单</Text>
        <Text style={actionStyle} onPress={()=>this.props.fetchOrder(order)}>{order.actionName}</Text>
      </View>)
    }
    return (<View style={{flex:0.5, flexDirection: 'row'}}>
      <View style={{flex:1}}/>
      <Text style={actionStyle} onPress={()=>fetchOrder(order)}>{order.actionName}</Text>
    </View>)
  }

}



OrderDetail.propTypes = {
  order: React.PropTypes.object,
  fetchOrder: React.PropTypes.func,
}
OrderDetail.defaultProps = {
  order: {},
  fetchOrder: () => {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_blok: {
    flex: 0.2,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 5
  },
  action_gray: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'gray',
    borderColor: 'gray', width: 50, textAlign: 'center'
  },
  action_active: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'rgb(85, 155, 236)',
    borderColor: 'rgb(85, 155, 236)', width: 50, textAlign: 'center'
  },
  chuzhen: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'rgb(85, 155, 236)',
    borderColor: 'rgb(85, 155, 236)', width: 50, textAlign: 'center', marginRight: 10,
  }

});