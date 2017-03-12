import React from 'react';

import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {FontSize} from '../constants';

export default class CommonRowCell extends React.Component {

  _getHeaderView() {
    let {image, headTitle} = this.props;
    if (image) {
      return <Image style={styles.image} source={image}/>
    }
    if (headTitle) {
      return <Text style={styles.head_title}>{headTitle}</Text>
    }
  }

  render() {
    let {title, description, hasRead} = this.props;
    const style = hasRead === 'YES'? styles.container : styles.notReadContainer;
    return (<View style={style}>
      {this._getHeaderView()}
      <TouchableHighlight style={{flex:5, flexDirection: 'row'}} underlayColor="transparent"
                          onPress={this.props.onClick.bind(this)}>
        <View style={styles.text_view}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
        </View>
      </TouchableHighlight>
      <Image style={styles.next} source={require('../images/next_gray.png')}/>
    </View>);
  }

}

CommonRowCell.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  onClick: React.PropTypes.func,
  hasRead: React.PropTypes.string,
}

CommonRowCell.defaultProps = {
  title: '',
  description: '',
  hasRead: 'NO',
  onClick: () => {
  },
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
  notReadContainer: {
    flex: 1,
    backgroundColor: '#E8EFF7',
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
  head_title: {
    margin: 5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'rgb(85, 155, 236)',
    color: 'rgb(85, 155, 236)',
    fontSize: FontSize.large,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
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
  title: {
    color: 'black',
    textAlign: 'left',
  },
  description: {
    color: '#9a9a9a',
    fontSize: FontSize.small,
    textAlign: 'left',
  }
});