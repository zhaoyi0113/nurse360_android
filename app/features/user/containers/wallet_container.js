import React from 'react';
import {connect} from 'react-redux';
import Wallet from '../components/wallet';
import * as actions from '../../../actions/wallet_actions';

class WalletContainer extends React.Component {

  componentDidMount() {
    this.props.queryWallet(this.props.token);
  }

  render() {
    return (<Wallet userInfo={this.props.userInfo} wallets={this.props.wallets}/>);
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
      dispatch(actions.queryWallet(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);