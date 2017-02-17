import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, StyleSheet, Alert} from 'react-native';

import App from '../components'
import WaitingIndicator from '../components/waiting_indicator';
import * as actions from '../actions/common_actions';

class MainContainer extends Component {

  render() {

    if (this.props.alert) {
      Alert.alert(
        this.props.alert.title,
        this.props.alert.message,
        [
          {text: '确定', onPress: () => this.props.clearAlert()},
        ]
      )
    }

    return (
      <View style={{flex: 1}}>
        <App token={this.props.token} setNavigator={this.props.setNavigator.bind(this)} navigator={this.props.navigator}/>
        <WaitingIndicator isVisible={this.props.waitingIndicator}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    waitingIndicator: state.common ? state.common.waitingIndicator : false,
    alert: state.common.alert,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearAlert: () => {
      dispatch(actions.clearAlert());
    },
    setNavigator: (navigator) => {
      dispatch(actions.setNavigator(navigator));
    }
  }
}

MainContainer.propTypes = {
  waitingIndicator: React.PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);