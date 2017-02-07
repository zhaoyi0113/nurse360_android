import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

export default class CommonHeader extends React.Component {

  render() {
    const {headerImage, textImage, text} = this.props
    return (
      <View style={styles.container}>
        <Image style={styles.head_image} source={headerImage}/>
        <Image style={styles.login_image} source={textImage}/>
        {
          text ? <Text style={{marginBottom: 10}}>{text}</Text> : <View style={{flex:2}}/>
        }

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  head_image: {flex: 3, resizeMode: 'contain', marginVertical: 10},
  login_image: {flex: 1, resizeMode: 'contain', marginVertical: 10},
});