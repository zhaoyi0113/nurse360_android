import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {FontSize} from '../constants';

export default class CommonTableHeader extends React.Component {

  render() {
    let {title, more} = this.props;
    return (<View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight style={styles.more_click} underlayColor="transparent" onPress={()=>this.props.clickMore()}>
        <Text style={styles.more}>{more}</Text>
      </TouchableHighlight>
    </View>);
  }
}

CommonTableHeader.propTypes = {
  title: React.PropTypes.string,
  more: React.PropTypes.string,
  clickMore: React.PropTypes.func,
}

CommonTableHeader.defaultProps = {
  title: '',
  more: '更多',
  clickMore: ()=>{},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    color: '#9a9a9a',
    flex: 1,
    marginLeft: 15,
  },
  more_click: {
    flex: 1,
  },
  more: {
    marginRight: 10,
    textAlign: 'right',
    flex: 1,
    color: '#559bec',
    fontSize: FontSize.small,
  }
})