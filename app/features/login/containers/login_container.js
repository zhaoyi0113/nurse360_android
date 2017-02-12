import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text, Navigator} from "react-native";
import Login from "../components/login";
import * as actions from "../../../actions/login_actions";
import Register from "../components/register";
import RegisterOccupationInfo from "../components/register_occupation_info";
import HospitalSelectionContainer from "../../../containers/hospital_selection_container";
import DepartmentSelectionContainer from "../../../containers/department_selection_container";

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
      }, {
        id: 4,
        title: 'department',
      }],

    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerSuccess) {
      let {mobile, password} = this.registerInfo.state;
      if (mobile && password) {
        this.props.login(mobile, password);
      }
    }
  }

  register() {
    let {mobile, password, verifyCode} = this.registerInfo.state;
    let title = this.occupationInfo.state.title;
    this.props.register(mobile, password, verifyCode, this.state.hospital.id, this.state.department.id, title);
  }

  renderScene(route, navigator) {
    if (route.id === 0) {
      return <Login login={(mobile, password)=> this.props.login(mobile,password)}
                    goRegister={()=> navigator.push(this.state.routes[1])}
      />
    } else if (route.id === 1) {
      return <Register goLogin={()=>navigator.pop()} requestSmsCode={this.props.requestSmsCode}
                       nextStep={()=>navigator.push(this.state.routes[2])}
                       ref={(register)=> this.registerInfo=register}/>
    } else if (route.id === 2) {
      return <RegisterOccupationInfo goBack={()=>navigator.pop()}
                                     ref={(info)=>this.occupationInfo=info}
                                     hospital={this.state.hospital}
                                     department={this.state.department}
                                     selectHospital={()=>navigator.push(this.state.routes[3])}
                                     selectDepartment={()=>navigator.push(this.state.routes[4])}
                                     register={this.register.bind(this)}
      />
    } else if (route.id === 3) {
      return <HospitalSelectionContainer goBack={()=>navigator.pop()}
                                         selectHospital={(hospital)=>{
                                           this.setState({hospital:hospital});
                                           navigator.pop();
                                         }}/>
    } else if (route.id === 4) {
      return <DepartmentSelectionContainer goBack={()=>navigator.pop()}
                                           hospital={this.state.hospital}
                                           selectDepartment={(department)=>{
                                              this.setState({department:department});
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
  return {
    registerSuccess: state.login.registerSuccess,
  }
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
    },
    register: (mobile, password, smsCode, hospitalId, departmentId, jobTitle) => {
      dispatch(actions.register(mobile, password, smsCode, hospitalId, departmentId, jobTitle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)