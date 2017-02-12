import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default class ManualNavBar extends React.Component {

  render() {
    let {left, title, right} = this.props;

    return (<View style={styles.container}>

      <TouchableHighlight style={{flex:1}} onPress={()=>this.props.clickLeft()} underlayColor='lightgray'>
        <View style={{flex:1,  flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{resizeMode:'center', flex: 0.3}} source={require('../images/back_blue.png')}/>
          <Text style={styles.left}>{left}</Text>
        </View>
      </TouchableHighlight>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight style={{flex:1}} onPress={()=>this.props.clickRight()} underlayColor="lightgray">
        <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
          <Text style={styles.right}>{right}</Text>
        </View>
      </TouchableHighlight>
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
    color: '#559bec',
  },
  title: {
    flex: 3,
    textAlign: 'center',
  },
  right: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    alignSelf: 'center',
  }
});