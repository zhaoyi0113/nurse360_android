import React from 'react';
import {View, Image, Text, ScrollView, TouchableHighlight, RefreshControl} from 'react-native';
import {colors} from '../../../constants';
import CaseCell from './case_cell';

export default class PatientCasebookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.props.refresh();
  }

  _endRefresh() {
    this.setState({isRefreshing: false});
  }

  render() {
    const {patientCaseBookList, openCase, navigation, patient, loadData} = this.props;
    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}
                        refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="lightgray"
                        title="Loading..."
                        colors={['lightgray']}/>}
    >
      <View style={{flex:1, alignItems: 'center', margin: 10, backgroundColor: 'white', paddingBottom:10}}>
        <TouchableHighlight underlayColor={colors.underlayColor}
                            onPress={()=>navigation.navigate('NewCase', {patient:patient, loadCaseListData: loadData})}>
          <Image style={{margin: 10, width: 50, height: 50}} source={require('../../../images/patient/addPat.png')}/>
        </TouchableHighlight>
        <Text>新建病例</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <View style={{height:1,  width: 60, backgroundColor: 'lightgray'}}/>
        <Text style={{marginHorizontal: 10}}>已添加病例</Text>
        <View style={{height:1, width: 60, backgroundColor: 'lightgray' }}/>
      </View>
      {
        patientCaseBookList.map((book, i) => {
          return <View key={i} style={{margin:0}}>
            <CaseCell patient={book.patient} caseName={book.name} onClick={()=>openCase(book)} recordNum={book.caseSize}
                      time={book.time}/>
          </View>
        })
      }
    </ScrollView>);
  }
}

PatientCasebookList.propTypes = {
  patientCaseBookList: React.PropTypes.array,
  openCase: React.PropTypes.func,
}

PatientCasebookList.defaultProps = {
  patientCaseBookList: [],
  openCase: () => {
  }
}