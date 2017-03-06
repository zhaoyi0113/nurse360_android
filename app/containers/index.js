import React, {Component} from "react";
import {connect} from "react-redux";
import {View, ActivityIndicator, StyleSheet, Alert} from "react-native";
import App from "../components";
import * as actions from "../actions/common_actions";

class MainContainer extends Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <App token={this.props.token} navigation={this.props.navigation}/>
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