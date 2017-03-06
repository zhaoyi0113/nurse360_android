import React from "react";
import {StackNavigator} from "react-navigation";
import {connect} from "react-redux";
import AddVisitContainer from "../../visit/containers/add_visit_container";
import PatientSignatureContainer from "../../visit/containers/patient_signature_container";
import NurseSignatureContainer from "../../visit/containers/nurse_signature_container";

class VisitContainer extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  _exitVisit(){
    this.props.navigation.goBack();
  }

  render() {
    const {order} = this.props.navigation.state.params;
    return (
      <Tabs screenProps={{order: order, exit: this._exitVisit.bind(this)}}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

export default connect(mapStateToProps)(VisitContainer);


const Tabs = StackNavigator({
  AddVisit: {
    screen: AddVisitContainer,
  },
  PatientSignature: {
    screen: PatientSignatureContainer,
  },
  NurseSignature: {
    screen: NurseSignatureContainer,
  }
}, {
  initialRouteName: 'AddVisit',
});