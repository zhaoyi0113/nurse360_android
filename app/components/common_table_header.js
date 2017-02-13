import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontSize} from '../constants';

export default class CommonTableHeader extends React.Component {

  render() {
    let {title, more} = this.props;
    return (<View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.more}>{more}</Text>
    </View>);
  }
}

CommonTableHeader.propTypes = {
  title: React.PropTypes.string,
  more: React.PropTypes.string,
}

CommonTableHeader.defaultProps = {
  title: '',
  more: '更多',
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
    marginLeft: 10,
    fontSize: FontSize.small,
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