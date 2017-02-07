import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ManualNavBar extends React.Component {

  render() {
    let {left, title, right} = this.props;

    return (<View style={styles.container}>
      <Text style={styles.left} onPress={()=>this.props.clickLeft()}>{left}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.right} onPress={()=>this.props.clickRight()}>{right}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  left: {
    flex: 1,
  },
  title: {
    flex: 3,
  },
  right: {
    flex: 1,
  }
});