import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text, Navigator} from "react-native";
import Login from "../components/login";
import * as actions from "../../../actions/login_actions";

import Register from '../components/register';
import RegisterOccupationInfo from '../components/register_occupation_info';
import HospitalSelectionContainer from '../../../containers/hospital_selection_container';

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [{
        id: 0,
        title: 'login'
      }, {
        id: 1,
        title: 'register'
      }, {
        id: 2,
        title: 'occupation',
      }, {
        id: 3,
        title: 'hospital',
      }],

    };
  }

  renderScene(route, navigator) {
    if (route.id === 0) {
      return <Login login={(mobile, password)=> this.props.login(mobile,password)}
                    goRegister={()=> navigator.push(this.state.routes[1])}
      />
    } else if (route.id === 1) {
      return <Register goLogin={()=>navigator.pop()} requestSmsCode={this.props.requestSmsCode}
                       nextStep={()=>navigator.push(this.state.routes[2])}/>
    } else if (route.id === 2) {
      return <RegisterOccupationInfo goBack={()=>navigator.pop()}
                                     hospital={this.state.hospital}
                                     selectHospital={()=>navigator.push(this.state.routes[3])}/>
    } else if (route.id === 3) {
      return <HospitalSelectionContainer goBack={()=>navigator.pop()}
                                         selectHospital={(hospital)=>{
                                           this.setState({hospital:hospital});
                                           navigator.pop();
                                         }}/>
    }
  }

  render() {

    return (<Navigator style={{flex: 2}}
                       initialRoute={this.state.routes[0]}
                       configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
                       renderScene={this.renderScene.bind(this)}

      />
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (mobile, password) => {
      dispatch(actions.login(mobile, password));
    },
    requestSmsCode: (mobile) => {
      if (!mobile) {
        return;
      }
      dispatch(actions.requestSmsCode(mobile));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)