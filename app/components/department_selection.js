import React from "react";
import {View, StyleSheet, Text, ScrollView, TouchableHighlight} from "react-native";
import _ from 'lodash';

import ManualNavBar from "./manual_nav_bar";

export default class DepartmentSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  selectDepartment() {
    if (this.state.selectedSubDepartment) {
      this.props.selectDepartment(this.state.selectedSubDepartment);
    }
  }

  render() {
    let {selectedDepartment} = this.state;
    let subDepartmentList = [];
    if (selectedDepartment) {
      if (selectedDepartment.subDepartment) {
        subDepartmentList = selectedDepartment.subDepartment;
      } else {
        subDepartmentList = [selectedDepartment];
      }
    }
    return (<View style={styles.container}>
      <ManualNavBar left="注册" title={this.props.hospital.name} right="完成"
                    clickLeft={()=>this.props.goBack()}
                    clickRight={this.selectDepartment.bind(this)}/>
      <View style={{flexDirection: 'row'}}>
        <ScrollView style={{flex:1}}>
          {
            this.props.departmentList.map((department, i) => {
              let style = styles.department_row;
              if (selectedDepartment && department.id === selectedDepartment.id) {
                style = styles.department_row_selected;
              }
              return <TouchableHighlight kye={i} style={style}
                                         onPress={()=>this.setState({selectedDepartment: department})}>
                <Text style={styles.department_text}>{department.name}</Text>
              </TouchableHighlight>
            })
          }
        </ScrollView>
        <ScrollView style={{flex:3}}>
          {
            subDepartmentList.map((dep, i) => {
              let style = styles.department_row;
              if (this.state.selectedSubDepartment && this.state.selectedSubDepartment.id === dep.id) {
                style = styles.department_row_selected;
              }
              return <TouchableHighlight key={i} style={style}
                                         onPress={()=> this.setState({selectedSubDepartment: dep})}>
                <Text style={styles.department_text}>{dep.name}</Text>
              </TouchableHighlight>
            })
          }
        </ScrollView>
      </View>
    </View>)
  }

}

DepartmentSelection.propTypes = {
  departmentList: React.PropTypes.array,
}

DepartmentSelection.defaultProps = {
  departmentList: []
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  department_row: {
    height: 50,
  },
  department_row_selected: {
    height: 50,
    backgroundColor: 'blue',
  },
  department_text: {
    marginLeft: 10,
    color: '#559bec',
    alignSelf: 'flex-start',
    flex: 1,
    textAlignVertical: 'center',
  },
});
