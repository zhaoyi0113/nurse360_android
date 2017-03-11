import React from 'react';
import {connect} from 'react-redux';

import OrderDetail from '../components/order_detail';
import * as actions from '../../../actions/order_actions';
import {header} from '../../../components/navigation_header';

class OrderDetailContainer extends React.Component {
  static navigationOptions = {
    title: '订单详情',
    cardStack: {
      gesturesEnabled: true
    },
    header:header,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {order} = this.props.navigation.state.params;
    this.props.queryOrder(this.props.token, order.id);
  }

  render() {
    if(!this.props.order){
      return null;
    }
    let {fetchOrder} = this.props.navigation.state.params;
    return <OrderDetail order={this.props.order}
                        navigation={this.props.navigation}
                        fetchOrder={fetchOrder.bind(this)}/>
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    order: state.order.order,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryOrder: (token, id) => {
      return dispatch(actions.queryOrder(token, id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailContainer);