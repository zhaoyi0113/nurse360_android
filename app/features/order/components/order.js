import React from 'react';
import {View, StyleSheet, Text, Image, Button, TouchableHighlight} from 'react-native';
import {FontSize} from '../../../constants';

export default class Order extends React.Component {

  render() {
    let {order} = this.props;
    let actionStyle = order.orderStatus === 'TO_SERVICE' ? styles.action_active : styles.action_gray;
    return (
      <TouchableHighlight style={styles.container} onPress={this.props.onClick.bind(this)} underlayColor='transparent'>
        <View style={{flex:1}}>
        <View style={styles.header}>
          <Image style={{height: 30, width: 30, margin:10}} source={require('../../../images/yi.png')}/>
          <Text style={{fontSize: FontSize.large}}>{order.hospitalName}</Text>
          <Text style={{flex:1, marginRight:10, fontSize: FontSize.small, textAlign:'right'}}>{order.statusName}</Text>
        </View>
        <View style={styles.order}>
          <View style={styles.order_header}>
            <Image style={{margin:10, height:30, width:30}} source={order.icon}/>
            <Text style={{fontSize: FontSize.small}}>{order.serviceName}</Text>
            <Text
              style={{fontSize: FontSize.small, flex: 1, textAlign:'right', marginRight:10, color: '#559bec'}}>{order.totalConsumption}元</Text>
          </View>
          <Text style={{marginLeft: 50, fontSize: FontSize.small}}>{order.orderDate}</Text>
          <Text style={{marginLeft: 50, fontSize: FontSize.small}}>{order.address}</Text>
          <View style={{ flex:1,  marginRight: 10}}>
            <Text
              onPress={()=>this.props.fetchOrder(order)}
              style={actionStyle}>
              {order.actionName}
            </Text>
          </View>
        </View>
        </View>
      </TouchableHighlight>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
}

Order.defaultProps = {
  order: {},
  onClick: () => {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: 10,
    marginBottom: 10,
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
  },
  action_gray: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'gray',
    borderColor: 'gray', width: 50, textAlign: 'center'
  },
  action_active: {
    fontSize: FontSize.small, borderWidth: 1, alignSelf: 'flex-end', padding: 2, color: 'rgb(85, 155, 236)',
    borderColor: 'rgb(85, 155, 236)', width: 50, textAlign: 'center'
  }

});