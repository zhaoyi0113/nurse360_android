import React from 'react';

import {View, StyleSheet, Text, Image, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import {FontSize} from '../constants';

export default class CommonRowCell extends React.Component {

  _getHeaderView() {
    let {image, headTitle, imageStyle} = this.props;
    if (image) {
      return <Image style={imageStyle} source={image}/>
    }
    if (headTitle) {
      return <Text style={styles.head_title}>{headTitle}</Text>
    }
  }

  render() {
    let {title, description, hasRead, titleStyle, showNextIcon, style} = this.props;
    if(hasRead !== 'YES'){
      style = [style, {backgroundColor: '#E8EFF7'}];
    }
    return (<View style={style}>
      {this._getHeaderView()}
      <TouchableWithoutFeedback style={{flex:5, flexDirection: 'row'}} underlayColor="transparent"
                          onPress={this.props.onClick.bind(this)}>
        <View style={styles.text_view}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showNextIcon?<Image style={styles.next} source={require('../images/next_gray.png')}/>:null}

    </View>);
  }

}

CommonRowCell.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  onClick: React.PropTypes.func,
  hasRead: React.PropTypes.string,
  showNextIcon: React.PropTypes.bool,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
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
    // flex: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    // resizeMode: 'contain',
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
})


CommonRowCell.defaultProps = {
  title: '',
  description: '',
  hasRead: 'NO',
  onClick: () => {
  },
  imageStyle: styles.image,
  titleStyle: styles.title,
  showNextIcon: true,
  style: styles.container
};