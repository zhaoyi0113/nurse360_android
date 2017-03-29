import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import Patient from '../components/patient';
import {renderDelayTime} from '../../../constants';
import * as actions from '../../../actions/patient_actions';

class PatientContainer extends Component {

  static navigationOptions = {
    tabBar: {
      label: '',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: (obj) => {
        const image = obj.focused ? require('../../../images/patient_pre.png') : require('../../../images/patient_nor.png');
        return <Image style={{resizeMode:'contain', width:40, height: 40}}
                      source={image}
        />
      }
    },
  };

  componentDidMount() {
    setTimeout(() => this._refresh(), renderDelayTime);
  }

  _refresh() {
    const promises = [];
    promises.push(this.props.queryInternalPatients(this.props.token, 0, 2));
    promises.push(this.props.queryExternalPatient(this.props.token, 0, 2));
    const that = this;
    Promise.all(promises).then((v) => {
      if (that.patient) {
        that.patient._endRefresh();
      }
    }).catch(() => that.patient._endRefresh());

  }

  render() {
    const {rootNavigation} = this.props.screenProps;
    return (<Patient navigation={rootNavigation}
                     refresh={this._refresh.bind(this)}
                     ref={(patient)=>this.patient=patient}
                     internalPatients={this.props.internalPatients}
                     externalPatients={this.props.externalPatients}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    externalPatients: state.patient.externalPatients,
    internalPatients: state.patient.internalPatients,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryInternalPatients: (token, index, number) => {
      return dispatch(actions.queryInternalPatient(token, index, number));
    },
    queryExternalPatient: (token, index, number) => {
      return dispatch(actions.queryExternalPatient(token, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer)