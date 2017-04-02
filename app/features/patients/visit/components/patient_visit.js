import React from 'react';
import {View, Text, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {colors} from '../../../../constants';
import {getDate} from '../../../../reducers/common_reducer';
import CommonRowCell from '../../../../components/common_row_cell';

export default class PatientVisit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _endRefresh() {
    this.setState({isRefreshing: false});
  }

  _refresh() {
    this.setState({isRefreshing: true});
    this.props.refresh();
  }

  render() {
    const {patientVisitList, navigation, patient} = this.props;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <TouchableHighlight
        underlayColor={colors.underlayColor}
        onPress={()=> navigation.navigate('VisitContainer', {order: {id:0, patient: patient, userId: patient.userId}})}
        style={{backgroundColor: 'white', flexDirection: 'column', marginHorizontal: 10}}>
        <View style={{alignItems:'center',}}>
          <Image style={{width:40,height:40,marginTop: 10}} source={require('../../../../images/patient/addPat.png')}/>
          <Text style={{color: colors.lightTextColor}}>添加一条出诊记录</Text>
        </View>
      </TouchableHighlight>
      <ScrollView style={{marginHorizontal: 10}}>
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._refresh.bind(this)}
          tintColor="lightgray"
          title="Loading..."
          colors={['lightgray']}
        />
        {
          patientVisitList.length===0?<Text style={{alignSelf: 'center', margin:10}}>没有出诊记录</Text>:null
        }
        {
          patientVisitList.map((visit, i) => {
            let image = visit.recordImages && visit.recordImages.length > 0 ? {uri: visit.recordImages[0]} : require('../../../../images/home/headIm.png');

            return <View key={i}>
              <Text style={{color: colors.lightTextColor, marginLeft:10}}>{getDate(visit.time)}</Text>
              <CommonRowCell hasRead='YES' description={visit.visitRecord} title={visit.serviceItems[0].itemName}
                             image={image}
                             onClick={()=> navigation.navigate('VisitContainer', {order: {id:0, patient: patient, userId: patient.userId}, visitRecord: visit})}
                             titleStyle={{color: colors.lightTextColor}}
                             imageStyle={{height:50, width:50, marginLeft:10}}/>
            </View>
          })
        }
      </ScrollView>
    </View>);
  }
}


PatientVisit.propTypes = {
  patientVisitList: React.PropTypes.array,
}

PatientVisit.defaultProps = {
  patientVisitList: [],
}