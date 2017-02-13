import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import {FontSize} from '../constants';

export default class CommonRowCell extends React.Component {

  render() {
    let {title, description, image} = this.props;

    return (<View style={styles.container}>
      <Image style={styles.image} source={image}/>
      <View style={styles.text_view}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={1}>{description}</Text>
      </View>
      <Image style={styles.next} source={require('../images/next_gray.png')}/>
    </View>);
  }
}

CommonRowCell.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
}

CommonRowCell.defaultProps = {
  title: '',
  description: '',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    height: 30,
  },
  text_view: {
    flex: 4,
    flexDirection: 'column',
    margin: 10,
  },
  next: {
    resizeMode: 'center',
    flex: 1,
  },
  title:{
    color: 'black',
    textAlign: 'left',
  },
  description:{
    color: '#9a9a9a',
    fontSize: FontSize.small,
    textAlign: 'left',
  }
});