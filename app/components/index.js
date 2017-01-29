import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      tabbar: [
        {
          selected_image: require('../images/home_pre.png'),
          unselected_image: require('../images/home_nor.png')
        },
        {
          selected_image: require('../images/patient_pre.png'),
          unselected_image: require('../images/patient_nor.png')
        },
        {
          selected_image: require('../images/my_pre.png'),
          unselected_image: require('../images/my_nor.png')
        },
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center_view}/>
        <View style={styles.tabbar}>
          {
            this.state.tabbar.map((tabbar, index) => {
              let image = tabbar.unselected_image;
              if (index === this.state.selected) {
                image = tabbar.selected_image;
              }

              return <TouchableHighlight key={index} onPress={()=> this.setState({selected: index})}>
                <Image style={styles.tab_image} source={image}/>
              </TouchableHighlight>
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  center_view: {
    flex: 8,
    backgroundColor: 'red',
  },
  tabbar: {
    flex: 1.5,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    width: Dimensions.get('window').width
  },
  tab_image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').height * 0.13,
  }
});
