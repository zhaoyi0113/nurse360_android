import React from "react";
import {View, Text, ScrollView, StyleSheet, TextInput} from "react-native";
import _ from "lodash";

export default class AddVisit extends React.Component {

  render() {
    const {visitItems} = this.props;
    return (<ScrollView style={{flexDirection: 'column', backgroundColor: '#f6f6f6'}}>
        <Text style={{marginHorizontal:10, marginVertical:5}}>治疗项目</Text>
        <DiagnosticItems items={visitItems}/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>出诊地址</Text>
        <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                   multiline={true} placeholder='填写您要出诊的地址。'/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>操作及观察记录</Text>
        <TextInput style={{flex:1, marginHorizontal:10, backgroundColor: 'white'}} underlineColorAndroid='transparent'
                   numberOfLines={5}
                   multiline={true} placeholder='本次家庭治疗、护理操作的具体情况记录。'/>
        <Text style={{marginHorizontal:10, marginVertical:5}}>上传问题相关或诊断结果（最多9张，没有可不传)</Text>
      </ScrollView>
    );
  }
}

class DiagnosticItems extends React.Component {

  render() {
    let {items} = this.props;
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
                const itemStyle = StyleSheet.create({
                  style: {
                    flex: 0.3,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    textAlign: 'center',
                    borderRadius: 2,
                    backgroundColor: 'lightgray'
                  }
                });
                const emptyStyle = StyleSheet.create({style: {flex: 0.3, marginHorizontal: 10, marginVertical: 5}});
                const style = item ? itemStyle : emptyStyle;
                return <Text key={j} style={style.style}>{itemName}</Text>
              })
            }
          </View>
        })
      }
    </View>)
  }
}

