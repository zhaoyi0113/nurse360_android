import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {FontSize} from '../../../constants';

export default class CourseCell extends React.Component {

  render() {
    let {course} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title_text}>
          {course.name.split('')[0]}
        </Text>
        <View>
          <Text>{course.name}</Text>
          <Text>{course.introduction}</Text>
        </View>
        <Image source={require('../../../images/next.png')}/>
      </View>
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