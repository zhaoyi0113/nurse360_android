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
import {TabNavigator} from "react-navigation";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.token) {
      return null;
    }
    return (<Tabs screenProps={{rootNavigation: this.props.navigation}}/>);

  }
}

const Tabs = TabNavigator({
  Home: {
    screen: HomeContainer,
  },
  Patient: {
    screen: PatientContainer,
    navigationOptions: {
      tabBar: (state,acc) => {
        console.log('xxxxx, ', state, acc);
        return {
          visible: (acc && acc.visible !== 'undefined') ? acc.visible : true,
          label: 'Camera',
          icon: (obj) => {
            const image = obj.focused ? require('../images/patient_pre.png') : require('../images/patient_nor.png');
            return <Image style={{resizeMode:'contain', width:40, height: 40}}
                          source={image}
            />
          },
        }
      },
    }
  },
  User: {
    screen: UserContainer,
  }
}, {
  tabBarOptions: {
    showIcon: true,
    style: {backgroundColor: 'lightgray', height: 50},
    showLabel: false,
    tabStyle: {margin: 0, padding: 0, height: 50},
    indicatorStyle: {backgroundColor: 'lightgray'},
    iconStyle: {width: 50, height: 50, alignSelf:'center', margin:0, padding:0}
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
