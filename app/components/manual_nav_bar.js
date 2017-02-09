import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class ManualNavBar extends React.Component {

  render() {
    let {left, title, right} = this.props;

    return (<View style={styles.container}>
      <Image style={{resizeMode:'center', flex: 0.3}} source={require('../images/back_blue.png')}/>
      <Text style={styles.left} onPress={()=>this.props.clickLeft()}>{left}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.right} onPress={()=>this.props.clickRight()}>{right}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({

  container: {
    // flex: 1,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  left: {
    flex: 1,
    marginLeft: 0,
    textAlign: 'left',
    color: 'lightblue',
  },
  title: {
    flex: 3,
    textAlign: 'center',
  },
  right: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  }
});