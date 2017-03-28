import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import {colors} from '../../../constants';
import CaseCell from './case_cell';

export default class PatientCasebookList extends React.Component {

  render() {
    const {patientCaseBookList} = this.props;
    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}>
      <View style={{flex:1, alignItems: 'center', margin: 10, backgroundColor: 'white'}}>
        <Image style={{margin: 10}} source={require('../../../images/patient/addPat.png')}/>
        <Text>新建病例</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <View style={{height:1,  width: 60, backgroundColor: 'lightgray'}}/>
        <Text style={{marginHorizontal: 10}}>已添加病例</Text>
        <View style={{height:1, width: 60, backgroundColor: 'lightgray' }}/>
      </View>
      {
        patientCaseBookList.map((book, i) => {
          return <View key={i} style={{margin:10}}>
            <CaseCell patient={book.patient} caseName={book.name} recordNum={book.caseSize} time={book.time} />
          </View>
        })
      }
    </ScrollView>);
  }
}

PatientCasebookList.propTypes = {
  patientCaseBookList: React.PropTypes.array,
}

PatientCasebookList.defaultProps = {
  patientCaseBookList: [],
}