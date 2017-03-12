import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {FontSize} from '../../../constants';

export default class CourseCell extends React.Component {

  render() {
    let {course} = this.props;
    return (
      <TouchableHighlight style={{flex:1}} underlayColor='lightgray' onPress={this.props.openCourse.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.title_text}>
            {course.name && course.name.split('')[0]}
          </Text>
          <View style={{flex:1}}>
            <Text>{course.name}</Text>
            <Text style={{fontSize: FontSize.small}}>{course.introduction}</Text>
          </View>
          <Image style={{width: 30, height: 20, marginRight: 10}} source={require('../../../images/next.png')}/>
        </View>
      </TouchableHighlight>
    );
  }
}

CourseCell.propTypes = {
  course: React.PropTypes.object.isRequired,
}

CourseCell.defaultProps = {
  course: {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title_text: {
    margin: 10, height: 30, width: 30, color: '#559bec', lineHeight: 25, fontSize: FontSize.large,
    borderRadius: 15, textAlign: 'center', borderWidth: 1, borderColor: '#559bec'
  }
});