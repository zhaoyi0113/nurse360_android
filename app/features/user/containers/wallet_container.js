import React from "react";
import {connect} from "react-redux";
import Wallet from "../components/wallet";
import * as actions from "../../../actions/wallet_actions";
import {ScrollView} from 'react-native';

class WalletContainer extends React.Component {

  componentDidMount() {
    this.props.queryWallet(this.props.token);
  }

  _withdraw() {
    this.props.withdraw()
      .then(() => {
        this.props.navigator.pop();
      });
  }

  _refresh() {
    this.props.queryWallet(this.props.token)
      .then(() => {
        if (this.wallet) {
          this.wallet._endRefresh();
        }
      });
  }

  render() {
    return (
      <Wallet userInfo={this.props.userInfo}
              ref={(wallet)=>this.wallet = wallet}
              wallets={this.props.wallets}
              _refresh={this._refresh.bind(this)}
              navigator={this.props.navigator}
              withdraw={this._withdraw.bind(this)}/>
    );
  }
}

WalletContainer.propTypes = {
  wallets: React.PropTypes.array,
}

WalletContainer.defaultProps = {
  wallets: [],
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    userInfo: state.user.userInfo,
    wallets: state.wallet.wallets,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryWallet: (token) => {
      return dispatch(actions.queryWallet(token));
    },
    withdraw: (token, amount) => {
      return dispatch(actions.withdraw(token, amount));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);