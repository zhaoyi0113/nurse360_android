import React from "react";
import {View, Text, Image, StyleSheet, Button} from "react-native";
import HeaderCategoryView from "../../../components/header_category_view";
import {FontSize} from "../../../constants";
import {getDate, getTime} from "../../../reducers/common_reducer";

export default class OrderDetail extends React.Component {

  render() {
    let {order} = this.props;
    let {patient} = order;
    let payment = order.pingPP && order.pingPP.length > 0 ? order.pingPP[0] : {}

    return (<View style={styles.container}>
      <HeaderCategoryView title='快抢单' description={'订单号:'+order.orderNo}
                          image={require('../../../images/order/alPay.png')}/>
      <Patient patient={patient} serviceStartTime={order.serviceStartTime} address={order.address}/>
      {
        order.vendorType === 'HOSPITAL' ? <Hospital hospital={order.vendorHospital} service={order.serviceItem}/> :
          <View/>
      }
      <Paymethod payment={payment} service={order.serviceItem}/>
      <TimeInfo order={order} payment={payment}/>
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
    let {hospital, service} = this.props;
    return (<View style={styles.info_blok}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1.5}}>
        <Image style={{flex:0.2, resizeMode: 'contain', marginRight: 5}}
               source={require('../../../images/hospital/yi.png')}/>
        <Text style={{flex:3}}>{hospital.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1.5}}>
        <Image style={{flex:0.08, resizeMode: 'contain', marginRight: 5}}
               source={require('../../../images/hospital/dingzhituisong.png')}/>
        <Text style={{flex:1}}>{service.name}</Text>
        <Text style={{fontSize: FontSize.small}}>¥ {service.servicePrice}</Text>
      </View>
    </View>);
  }
}

class Paymethod extends React.Component {
  render() {
    let {payment, service} = this.props;
    return (<View style={{flex:0.3, margin:10, backgroundColor:'white', flexDirection: 'column', borderRadius:5}}>
      <View style={{flex:1, flexDirection: 'row', padding: 10, borderBottomWidth:1, borderBottomColor: '#F5FCFF'}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>支付方式</Text>
        <Text>{payment.channel === 'wx' ? '微信' : '支付宝'}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', padding: 10}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>优惠</Text>
        <Text>¥ {service.serviceDiscount}</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', padding: 10}}>
        <Text style={{flex:1, color: '#9b9b9b'}}>实付款</Text>
        <Text>¥ {service.servicePrice}</Text>
      </View>
    </View>);
  }
}

class TimeInfo extends React.Component {
  render() {
    let {order, payment} = this.props;
    let textStyle = StyleSheet.create({style:{fontSize: FontSize.small}});
    let actionStyle = order.orderStatus === 'TO_SERVICE' ? styles.action_active : styles.action_gray;
    return (<View style={{flex:0.15, flexDirection: 'column', margin:10}}>
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
        <Text style={{fontSize: FontSize.small, flex:2}}>{getTime(order.fetchTime)}</Text>
        <Text style={actionStyle}>{order.actionName}</Text>
      </View>
    </View>);
  }
}

OrderDetail.propTypes = {
  order: React.PropTypes.object,
}
OrderDetail.defaultProps = {
  order: {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  info_blok: {flex: 0.2, margin: 10, padding: 10, backgroundColor: 'white', flexDirection: 'column', borderRadius: 5},
  action_gray: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'gray',
    borderColor: 'gray', width: 50, textAlign: 'center'
  },
  action_active: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'rgb(85, 155, 236)',
    borderColor: 'rgb(85, 155, 236)', width: 50, textAlign: 'center'
  }
});