import React from 'react';
import {View, StyleSheet} from 'react-native';

import ManualNavBar from './manual_nav_bar';

export default class HospitalSelection extends React.Component {

  selectHospital() {

  }

  render() {
    return (<View style={styles.container}>
      <ManualNavBar left="注册" title="选择医院" right="完成" clickLeft={()=>this.props.goBack()}
                    clickRight={()=>this.selectHospital.bind(this)}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});