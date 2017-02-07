import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text, Navigator} from "react-native";
import Login from "../components/login";
import * as actions from "../../../actions/login_actions";

import RegisterContainer from './register_container';

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
      }],
    };
  }

  renderScene(route, navigator) {
    if (route.id === 0) {
      return <Login login={(mobile, password)=> this.props.login(mobile,password)}
                    goRegister={()=> navigator.push(this.state.routes[1])}

      />
    } else if (route.id === 1) {
      return <RegisterContainer goLogin={()=>navigator.pop()}/>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)