import React from 'react';

import {connect} from 'react-redux';
import OrderList from "../../order/components/order_list";
import * as actions from "../../../actions/user_actions";
import OrderDetail from '../../order/components/order_detail';
import {View, Button,Image} from 'react-native';
import {header} from '../../../components/navigation_header';


class UserTaskContainer extends React.Component {
  static navigationOptions = {
    title: '我的任务',
    header:  header,
    cardStack: {
      gesturesEnabled: true,
    }
  }
  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    this._loadMoreData();
  }

  _loadMoreData() {
    this.props.getUserOrders(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  _onClick(order){
    let {fetchOrder} = this.props.navigation.state.params;
    this.props.navigation.navigate('OrderDetail', {order: order, fetchOrder: fetchOrder.bind(this)})
    // this.props.navigator.push({
    //   id: ORDER_DETAIL,
    //   title: '订单详情',
    //   component: <OrderDetail order={order}/>
    // });
  }

  render() {
    return (<OrderList orders={this.props.userOrders} loadMoreData={this._loadMoreData.bind(this)}
                       title="我的任务" description="查看患者订单或患者咨询"
                       onClick={this._onClick.bind(this)}
                       image={require('../../../images/order/alPay.png')}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
    userOrders: state.user.userOrders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: (token, index, number) => {
      dispatch(actions.getUserOrders(token, index, number));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTaskContainer)