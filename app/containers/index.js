import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import App from '../components'
import WaitingIndicator from '../components/waiting_indicator';

class MainContainer extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <App token={this.props.token}/>
        <WaitingIndicator isVisible={this.props.waitingIndicator}/>
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    waitingIndicator: state.common ? state.common.waitingIndicator : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

MainContainer.propTypes = {
  waitingIndicator: React.PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});