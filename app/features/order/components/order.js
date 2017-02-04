import React from 'react';
import {View, StyleSheet, Text, Image, Button, TouchableHighlight} from 'react-native';
import {FontSize} from '../../../constants';

export default class Order extends React.Component {

  render() {
    let {order} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{height: 30, width: 30, margin:10}} source={require('../../../images/yi.png')}/>
          <Text style={{fontSize: FontSize.large}}>{order.hospitalName}</Text>
          <Text style={{flex:1, marginRight:10, fontSize: FontSize.small, textAlign:'right'}}>{order.statusName}</Text>
        </View>
        <View style={styles.order}>
          <View style={styles.order_header}>
            <Image style={{margin:10, height:30, width:30}} source={{uri: order.icon}}/>
            <Text style={{fontSize: FontSize.small}}>{order.serviceName}</Text>
            <Text
              style={{fontSize: FontSize.small, flex: 1, textAlign:'right', marginRight:10, color: '#559bec'}}>{order.totalConsumption}元</Text>
          </View>
          <Text style={{marginLeft: 50, fontSize: FontSize.small}}>{order.orderDate}</Text>
          <Text style={{marginLeft: 50, fontSize: FontSize.small}}>{order.address}</Text>
          <View style={{ flex:1,  marginRight: 10}}>
            <Text
              style={{fontSize: FontSize.small, borderWidth:1, alignSelf: 'flex-end', padding:2, color:'gray', borderColor:'gray'}}>{order.actionName}</Text>
          </View>
        </View>
      </View>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object.isRequired,
}

Order.defaultProps = {
  order: {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  order: {
    flex: 3,
    flexDirection: 'column',
  },
  order_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

});