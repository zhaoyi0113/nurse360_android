import React from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions/order_actions";
import OrderList from "../components/order_list";

class OrderListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    this.loadMoreData();
  }

  componentWillUnmount() {
    this.props.queryOrders(this.props.token, 0, 2);
  }

  loadMoreData() {
    this.props.queryOrders(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  render() {
    return (<OrderList orders={this.props.orders} loadMoreData={this.loadMoreData.bind(this)}
                       title="患者服务" description="患者需求服务"
                       onClick={this.props.onClick.bind(this)}
                       image={require('../../../images/order/alPay.png')}/>);
  }

}


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    orders: state.order.orders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryOrders: (token, index, number) => {
      return dispatch(actions.queryOrders(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer)