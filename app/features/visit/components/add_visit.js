import React from "react";
import {View, Text, ScrollView, StyleSheet, TextInput} from "react-native";
import _ from "lodash";

export default class AddVisit extends React.Component {

  render() {
    const {visitItems} = this.props;
    return (<ScrollView style={{flexDirection: 'column', backgroundColor: '#f6f6f6'}}>
        <Text style={{marginHorizontal:10, marginVertical:5}}>治疗项目</Text>
        <DiagnosticItems items={visitItems} ref={(i)=>this.diagnostic = i}/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>出诊地址</Text>
        <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                   multiline={true} placeholder='填写您要出诊的地址。'/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>操作及观察记录</Text>
        <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                   numberOfLines={5}
                   multiline={true} placeholder='本次家庭治疗、护理操作的具体情况记录。'/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>上传问题相关或诊断结果（最多9张，没有可不传)</Text>
      </ScrollView>
    )
}

}

class DiagnosticItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  componentWillReceiveProps(nextProps) {
    let items = _.cloneDeep(nextProps.items);
    this.setState({items: items});
  }

  render() {
    let {items} = this.state;
    let arrays = [];
    items.map((item, i) => {
      let index = Math.floor(i / 3);
      if (i % 3 === 0) {
        arrays.push([]);
      }
      arrays[index].push(item);
    });
    if (items.length % 3 !== 0) {
      let left = 3 - items.length % 3;
      _.times(left, () => {
        arrays[arrays.length - 1].push(null);
      });
    }
    return (<View style={{flex:1}}>
      {
        arrays.map((array, i) => {
          return <View key={i} style={{flex:1, flexDirection:'row'}}>
            {
              array.map((item, j) => {
                const itemName = item ? item.itemName : '';
                const style = item ? (item.selected ? styles.diagnostic_selected_item : styles.diagnostic_item) : styles.diagnostic_empty_style;
                return <Text key={j} style={style} onPress={()=>{
                  item.selected = item.selected?false:true;
                  this.setState({items: items});
                }}>{itemName}</Text>
              })
            }
          </View>
        })
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  diagnostic_item: {
    flex: 0.3,
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: 'lightgray'
  },
  diagnostic_selected_item: {
    flex: 0.3,
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#559bec',
  },
  diagnostic_empty_style: {flex: 0.3, marginHorizontal: 10, marginVertical: 5}
});