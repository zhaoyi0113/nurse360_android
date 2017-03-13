import React from 'react';
import {View} from 'react-native';

export default class Line extends React.Component {

  static propTypes = {style: React.PropTypes.object, orientation: React.PropTypes.string};

  static defaultProps = {
    style: {height: 1, marginHorizontal: 0, backgroundColor: 'lightgray'},
    orientation: 'horizontal',
    verticalStyle: {width: 1, backgroundColor: 'lightgray'}
  }

  render() {
    const style = this.props.orientation === 'horizontal' ? this.props.style : this.props.verticalStyle;
    return <View style={style}/>
  }
}

