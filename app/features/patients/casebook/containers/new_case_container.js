import React from 'react';
import {connect} from 'react-redux';

import NewCase from '../components/new_case';
import {header} from '../../../../components/navigation_header';


class NewCaseContainer extends React.Component {

  static navigationOptions = {
    title: '病例记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    const {patient} = this.props.navigation.state.params;
    return (<NewCase patient={patient}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCaseContainer)

