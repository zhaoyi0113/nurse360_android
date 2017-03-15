import React from "react";
import {View, StyleSheet, Image, TextInput, ListView, Text, TouchableHighlight, ActivityIndicator} from "react-native";
import _ from "lodash";
import ManualNavBar from "./manual_nav_bar";
import {FontSize} from "../constants";


export default class HospitalSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '', list: [], loadMore: true, selectedHospital: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  selectHospital() {
    if(this.state.selectedHospital !== null) {
      this.props.selectHospital(this.state.selectedHospital);
    }
  }

  renderRow(rowData) {
    let style = styles.rowData;
    if(rowData === this.state.selectedHospital){
      style = styles.selected;
    }
    return <TouchableHighlight onPress={()=>this.setState({searchText: rowData.name, selectedHospital: rowData})} underlayColor="lightgray">
      <Text style={style}
            >{rowData.name}</Text>
    </TouchableHighlight>
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hospitalList) {
      if (nextProps.hospitalList.length > 0) {
        this.setState({list: _.union(this.state.list, nextProps.hospitalList), loadMore: true});
      } else {
        this.setState({loadMore: false});
      }
    }
  }

  onEndReached() {
    this.props.queryHospital(this.state.searchText);
  }

  render() {

    return (<View style={styles.container}>
      <ManualNavBar left="注册" title="选择医院" right="完成"
                    clickLeft={()=>this.props.goBack()}
                    clickRight={this.selectHospital.bind(this)}/>

      <View style={styles.searchView}>
        <Image style={{resizeMode: 'contain', height: 20, marginTop: 10}} source={require('../images/search.png')}/>
        <TextInput style={{flex:1, height: 35, fontSize: FontSize.small}}
                   underlineColorAndroid='transparent'
                   inlineImageLeft='search.png'
                   value={this.state.searchText}
                   onChangeText={(text)=>this.setState({searchText: text})}
                   returnKeyType="search"
                   onSubmitEditing={()=>{
                     this.setState({list:[]})
                     this.props.queryHospital(this.state.searchText)
                   }}
                   placeholder="搜索医院"/>
      </View>
      <ListView
        style={{backgroundColor: 'white', flex:1, margin: 5, height: 300}}
        dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        enableEmptySections={true}
        onEndReachedThreshold={100}
        renderFooter={()=><ActivityIndicator
                            animating={this.state.loadMore}
                            style={{height: 80}}
                            size="large"
                          />}
      />
    </View>);
  }
}

HospitalSelection.propTypes = {
  hospitalList: React.PropTypes.array.isRequired,
}

HospitalSelection.defaultProps = {
  hospitalList: [],
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
    borderRadius: 5,
  },
  rowData: {
    textAlign: 'center',
    height: 30,
    textAlignVertical: 'center',
  },
  selected: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    backgroundColor: 'lightgray',
  }
});