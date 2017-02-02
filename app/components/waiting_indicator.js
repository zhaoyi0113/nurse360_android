import React, {Component} from 'react';
import Overlay from 'react-native-overlay';
import {BlurView} from 'react-native-blur';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';

export default class WaitingIndicator extends Component {

  render() {
    return (
      <Overlay isVisible={this.props.isVisible}>
        <BlurView style={styles.background} blurType="dark" blurAmount={10} >

          <ActivityIndicator
            size="large"
            animating={true}
            style={styles.spinner}/>
        </BlurView>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  spinner: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 100,
    opacity: 0.9,
    borderRadius: 10,
  }
});
