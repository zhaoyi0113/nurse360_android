import React from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {colors} from '../constants';

export const Position = {
  TOP_LEFT: 0,
  TOP: 1,
  TOP_RIGHT: 2,
  RIGHT_TOP: 3,
  RIGHT: 4,
  RIGHT_BOTTOM: 5,
  BOTTOM_RIGHT: 6,
  BOTTOM: 7,
  BOTTOM_LEFT: 8,
  LEFT_BOTTOM: 9,
  LEFT: 10,
  LEFT_TOP: 11,
};

export default class ImageWithIcon extends React.Component {

  iconStyle(position) {
    switch (position) {
      case Position.TOP_RIGHT:
        return styles.topRight;
    }
  }

  render() {
    let {imageStyle, source, icon, iconPosition, showIcon, clickIcon} = this.props;
    return (<View style={styles.container}>
      <Image style={imageStyle} source={source}/>
      {
        showIcon ? <TouchableHighlight style={this.iconStyle(iconPosition)}
                                       onPress={()=> clickIcon()}
                                       underlayColor={colors.underlayColor}>
          <Image style={styles.iconImage}
                 source={icon}/></TouchableHighlight> : null
      }
    </View>);
  }

}

ImageWithIcon.propTypes = {
  iconPosition: React.PropTypes.number,
  showIcon: React.PropTypes.bool,
  clickIcon: React.PropTypes.func,
}

ImageWithIcon.defaultProps = {
  iconPosition: Position.TOP_RIGHT,
  showIcon: false,
  clickIcon: () => {
  }
}

const styles = StyleSheet.create({
  container: {},
  topRight: {
    position: 'absolute',
    right: 0,
  },
  iconImage: {
    width: 20,
    height: 20,
  }
});