import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {FontSize} from "../constants";

export default class HeaderCategoryView extends React.Component {

  render() {
    let {image, title, description} = this.props;

    return (
      <View style={styles.header_view}>
        <Image style={styles.title_image} source={image}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }

}

HeaderCategoryView.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.number,
}

HeaderCategoryView.defaultProps = {
  title: '',
  description: '',
}

const styles = StyleSheet.create({
  header_view: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius:5,
    backgroundColor: 'white',
  },
  title_image: {
    resizeMode: 'contain',
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: FontSize.xlarge,
    flex: 0.5,
  },
  description: {
    fontSize: FontSize.small,
    flex: 0.5,
  },
});