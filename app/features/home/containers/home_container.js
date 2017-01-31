import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class HomeContainer extends Component {

  render() {
    return (<View>
      <Text>Home</Text>
    </View>)
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)