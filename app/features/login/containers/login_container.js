import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text, Navigator} from "react-native";
import {StackNavigator, NavigationActions} from "react-navigation";
import Login from "../components/login";
import * as actions from "../../../actions/login_actions";
import Register from "../components/register";
import RegisterOccupationInfo from "../components/register_occupation_info";
import HospitalSelectionContainer from "../../../containers/hospital_selection_container";
import DepartmentSelectionContainer from "../../../containers/department_selection_container";
import UpdatePasswordContainer from '../../user/containers/password_update_container';
import ForgetPasswordContainer from '../../login/containers/forget_password_container';


class LoginContainer extends Component {

  static navigationOptions = {
    header: {
      visible: false
    },
  }

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
    // if (nextProps.registerSuccess) {
    //   let {mobile, password} = this.state.registerInfo.state;
    //   if (mobile && password) {
    //     this.props.login(mobile, password);
    //   }
    // }
  }

  componentWillMount() {
    if (this.props.token) {
      // this.props.loginSuccess();
    }
  }

  register() {
    let {mobile, password, verifyCode} = this.registerInfo;
    this.props.register(mobile, password, verifyCode, this.state.hospital.id, this.state.department.id, this.state.title)
      .then(v => this._login(mobile, password));
  }

  _login(mobile, password) {
    this.props.login(mobile, password).then(v => {
      this.props.navigation.goBack();
    });

  }

  _nextRegisterStep(registerInfo) {
    this.registerInfo = registerInfo;
  }

  render() {
    if(this.props.token){
      return null;
    }
    if(!this.props.storageLoaded){
      return null;
    }
    return (<Routers screenProps={{
      login: this._login.bind(this),
      requestSmsCode: this.props.requestSmsCode.bind(this),
      register: this.register.bind(this),
      hospital: this.state.hospital,
      department:this.state.department,
      nextRegisterStep: this._nextRegisterStep.bind(this),
      selectDepartment: (department)=>{
      this.setState({department: department});
                        },
      selectHospital:(hospital)=>{
                              this.setState({hospital:hospital});
                        },
      selectJobTitle: (title) => {
        this.setState({title: title});
      }
      }}
    />)
      ;

  }

}

const Routers = StackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  RegisterInfo: {screen: RegisterOccupationInfo},
  HospitalSelection: {screen: HospitalSelectionContainer},
  DepartmentSelection: {screen: DepartmentSelectionContainer},
  UpdatePassword:{screen:UpdatePasswordContainer},
  ForgetPassword: {screen: ForgetPasswordContainer}
}, {
  initialRouteName: 'Login',
})

const mapStateToProps = (state) => {
  return {
    registerSuccess: state.login.registerSuccess,
    token: state.login.token,
    storageLoaded: state.common.storageLoaded,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (mobile, password) => {
      return dispatch(actions.login(mobile, password));
    },
    requestSmsCode: (mobile) => {
      if (!mobile) {
        return;
      }
      return dispatch(actions.requestSmsCode(mobile));
    },
    register: (mobile, password, smsCode, hospitalId, departmentId, jobTitle) => {
      return dispatch(actions.register(mobile, password, smsCode, hospitalId, departmentId, jobTitle));
    },
    loginSuccess: () => {
      // return dispatch(NavigationActions.navigate({routeName: 'Main'}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)