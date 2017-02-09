import React from 'react';
import {View, StyleSheet, Image, TextInput, ListView, Text, TouchableHighlight} from 'react-native';

import ManualNavBar from './manual_nav_bar';
import {FontSize} from '../constants';

export default class HospitalSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchText: ''}
  }

  selectHospital() {

  }

  renderRow(rowData){
    return <Text style={styles.rowData}>{rowData}</Text>
  }
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (<View style={styles.container}>
      <ManualNavBar left="注册" title="选择医院" right="完成" clickLeft={()=>this.props.goBack()}
                    clickRight={()=>this.selectHospital.bind(this)}/>

      <View style={styles.searchView}>
        <Image style={{resizeMode: 'contain', height: 20, marginTop: 10}} source={require('../images/search.png')}/>
        <TextInput style={{flex:1, height: 35, fontSize: FontSize.small}}
                   inlineImageLeft='search.png'
                   onChangeText={(text)=>this.setState({searchText: text})}
                   placeholder="搜索医院"/>
      </View>
      <ListView
        style={{backgroundColor: 'white', flex:1, margin: 10}}
        dataSource={ds.cloneWithRows([1,2,3])}
        renderRow={this.renderRow.bind(this)}
      />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  searchView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 5,
  },
  rowData: {

  }
});