import React, {Component} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Animated,
  Image,
  Dimensions
} from "react-native";
import {HomeContainer} from "../features/home";
import {PatientContainer} from "../features/patients";
import {UserContainer} from "../features/user";
import {LoginContainer} from "../features/login";
import {TabNavigator} from "react-navigation";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.token) {
      return <LoginContainer/>
    }
    return (<Tabs screenProps={{rootNavigation: this.props.rootNavigation}}/>);

  }
}

const Tabs = TabNavigator({
  Home: {
    screen: HomeContainer,
  },
  Patient: {
    screen: PatientContainer,
  },
  User: {
    screen: UserContainer,
  }
}, {
  tabBarOptions: {
    // activeTintColor: 'lightgray',
    // inactiveTintColor: 'lightgray',
    showIcon: true,
    style: {backgroundColor: 'lightgray', height: 40},
    showLabel: false,
    tabStyle: {margin: 0, padding: 0, height: 40},
    indicatorStyle: {backgroundColor: 'lightgray'}
  },
  tabBarPosition: 'bottom',
});

App.propTypes = {}

App.defaultProps = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  center_view: {
    flex: 15,
  },
  tabbar: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    width: Dimensions.get('window').width
  },
  tab_image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').height * 0.06,
  }
});
