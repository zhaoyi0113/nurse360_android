import React from 'react';
import {View, StyleSheet, Text, WebView} from 'react-native';

export default class Article extends React.Component {


  render() {
    let {content} = this.props;
    return (
      <WebView style={styles.container} source={{html:content.content}}/>
   );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 50,
    backgroundColor: '#f6f6f6',
  }

});
