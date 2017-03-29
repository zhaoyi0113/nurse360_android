import React from 'react';

import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {colors} from '../constants';

export default class TextViewSelection extends React.Component {

  render() {
    const {text, selected, style, selectedStyle, unSelectedStyle, image, onPress} = this.props;
    return (<TouchableHighlight style={style} underlayColor={colors.underlayColor} onPress={onPress.bind(this)}>
      <View style={{flex:1}}>
        <Text style={selected? selectedStyle:unSelectedStyle}>{text}</Text>
        {
          selected ? <Image style={styles.image} source={image}/> : null
        }
      </View>
    </TouchableHighlight>);
  }

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  unselected: {
    backgroundColor: 'white', height: 40, lineHeight: 30, marginBottom: 5,
  },
  selected: {
    backgroundColor: '#E8EFF7', height: 40, lineHeight: 30, marginBottom: 5,
  },
  image: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 20,
  }
});

TextViewSelection.propTypes = {
  selected: React.PropTypes.bool,
  text: React.PropTypes.string,
  selectedStyle: React.PropTypes.number,
  unSelectedStyle: React.PropTypes.number,
  style: React.PropTypes.number,
  onPress: React.PropTypes.func,
}

TextViewSelection.defaultProps = {
  selected: false,
  text: '',
  selectedStyle: styles.selected,
  unSelectedStyle: styles.unselected,
  style: styles.container,
  image: require('../images/Artboard 6.png'),
  onPress: () => {
  }
}

