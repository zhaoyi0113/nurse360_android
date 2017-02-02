import React, {Component} from 'react';
import {connect} from 'react-redux';

import App from '../components'

class MainContainer extends Component {
  render() {
    return (
        <App token={this.props.token}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);