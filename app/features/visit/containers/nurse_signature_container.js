import React from "react";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";

import PatientSignature from "../components/patient_signature";
import * as actions from "../../../actions/visit_actions";
import * as orderActions from '../../../actions/order_actions';

class NurseSignatureContainer extends React.Component {

  static navigationOptions = {
    title: '护士签字',
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {patient: true};
  }

  _addNurseSignature(signature) {
    const {patientSignature, order, visitRecordId} = this.props.navigation.state.params;
    const that = this;
    this.props.sendPatientSignature(this.props.token, visitRecordId, patientSignature)
      .then(v => {
        return that.props.sendNurseSignature(that.props.token, visitRecordId, signature)
      })
      .then(v => {
        // this.props.navigation.goBack();
        let routes = this.props.nav.routes.slice(0, this.props.nav.routes.length - 3);
        this.props.signatureSuccess(order, routes, this.props.nav.routes.length - 3);
      });
  }

  render() {
    return <PatientSignature buttonText='确认并提交' addSignature={this._addNurseSignature.bind(this)}/>;
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    nav: state.nav,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPatientSignature: (token, id, patientSignature) => {
      return dispatch(actions.sendPatientSignature(token, id, patientSignature));
    },
    sendNurseSignature: (token, id, signature) => {
      return dispatch(actions.sendNurseSignature(token, id, signature));
    },
    fetchOrder: (token, id) => {
      return dispatch(orderActions.fetchOrder(token, id));
    },
    cancelOrder: (token, id) => {
      return dispatch(orderActions.cancelOrder(token, id));
    },
    signatureSuccess: (order, routes, i) => {
      return dispatch(NavigationActions.reset({index: i-1, actions: [routes[i-1]]}));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NurseSignatureContainer);