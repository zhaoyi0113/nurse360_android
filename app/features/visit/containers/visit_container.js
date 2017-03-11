import React from "react";
import {StackNavigator} from "react-navigation";
import {View} from 'react-native';
import {connect} from "react-redux";
import AddVisitContainer from "../../visit/containers/add_visit_container";
import PatientSignatureContainer from "../../visit/containers/patient_signature_container";
import NurseSignatureContainer from "../../visit/containers/nurse_signature_container";
import ManualNavBar from '../../../components/manual_nav_bar';

class VisitContainer extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  constructor(props){
    super(props);
    this.state = {screenName: '添加出诊记录'};
  }

  _exitVisit() {
    this.props.navigation.goBack();
  }

  _getTitle(name) {
    if (name === 'PatientSignature') {
      return '患者签字';
    } else if (name === 'NurseSignature') {
      return '护士签字';
    }
    return '添加出诊记录';
  }

  render() {
    const {order} = this.props.navigation.state.params;

    return (
      <View style={{flex:1}}>
        <ManualNavBar clickLeft={()=>this.props.navigation.goBack()} title={this._getTitle(this.state.screenName)}/>
        <Tabs
          screenProps={{order: order, rootNavigation: this.props.navigation, exit: this._exitVisit.bind(this), changeScreen:(screenName)=>this.setState({screenName: screenName})}}/>
      </View>
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