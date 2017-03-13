import React from 'react';
import {View} from 'react-native';

export default class Line extends React.Component{

  static propTypes = {style: React.PropTypes.object};

  static defaultProps = {style: {height:1, marginHorizontal: 0, backgroundColor: 'lightgray'}}

  render(){
    const style = this.props.style;
    return <View style={style}/>
  }
}

