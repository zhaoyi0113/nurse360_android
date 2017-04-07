import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import CommonTableHeader from '../../../components/common_table_header';
import CommonRowCell from '../../../components/common_row_cell';
import {colors} from '../../../constants';
import BarcodeScanner from 'react-native-barcodescanner';

export default class Patient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false, showBarScanner: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.props.refresh();
  }

  _endRefresh() {
    this.setState({isRefreshing: false});
  }

  _getPatientCell(patients, text) {
    const {navigate} = this.props.navigation;
    if (patients.length > 0) {
      return patients.map((patient, i) => {
        const name = patient.patient.name + '  (  ' + patient.patient.genderText + ', ' + patient.patient.age + '岁 )';
        const desc = patient.patient.mobile;
        return <CommonRowCell key={i} title={name} description={desc}
                              hasRead='YES'
                              image={patient.patient.image}
                              onClick={()=> {
                                navigate('PatientDetail',
                                {
                                  patient: patient,
                                }
                              );
                              }}/>
      });
    } else {
      return <View
        style={{flex:1,justifyContent: 'center',  alignItems: 'center', backgroundColor: 'white', flexDirection: 'row', height: 40}}>
        <Text style={{textAlign: 'center', flex: 1}}>{text}</Text></View>;
    }
  }

  _addPatient() {
    // this.props.navigation.navigate('BarcodeScanner', {goBack: ()=>this.props.update()});
    this.setState({showBarScanner: true});
    // this.props.showHideTabbar(false);
    // console.log(this.props.navigation);

  }

  _barcodeReceived(e) {
    console.log('scan result:', e);
    this.setState({showBarScanner: false});
  }


  render() {
    const {navigate} = this.props.navigation;
    if (this.state.showBarScanner) {
      return (<View style={{flex:1}}>
        <BarcodeScanner
          onBarCodeRead={this._barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
      </View>);
    }

    return (<ScrollView style={{flexDirection: 'column', backgroundColor: '#f6f6f6'}}
                        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="lightgray"
            title="Loading..."
            colors={['lightgray']}
          />
        }>
        <Image style={{height:150,width:Dimensions.get('window').width,resizeMode:'cover'}}
               source={require('../../../images/home/headIm.png')}/>
        <Function goToFollowUpList={()=>navigate('FollowUpPatientList')} goToVisitRecord={()=>navigate('PatientVisitList')} addPatient={this._addPatient.bind(this)}/>
        <View style={{flex:1}}>
          <CommonTableHeader title='院内患者' more='更多'
                             clickMore={()=>navigate('PatientList', {internal: true})}/>
          {this._getPatientCell(this.props.internalPatients, '暂无院内患者')}
        </View>
        <View style={{flex:1}}>
          <CommonTableHeader title='院外患者' more='更多'
                             clickMore={()=>navigate('PatientList', {internal: false})}/>
          {this._getPatientCell(this.props.externalPatients, '暂无院外患者')}
        </View>
      </ScrollView>
    );
  }
}

Patient.propTypes = {
  internalPatients: React.PropTypes.array,
  externalPatients: React.PropTypes.array,
}

Patient.defaultProps = {
  internalPatients: [],
  externalPatients: [],
}


class Function extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      functions: [{
        id: 0,
        image: require('../../../images/patient/tianjiahuanzhe.png'),
        text: '添加患者',
      }, {
        id: 1,
        image: require('../../../images/patient/wodetiwen.png'),
        text: '患者提问',
      }, {
        id: 2,
        image: require('../../../images/patient/pinggu.png'),
        text: '随访记录',
      }]
    }
  }

  _clickFunction(f) {
    switch (f.id) {
      case 0:
        this.props.addPatient();
        break;
      case 1:
        this.props.goToUserCourse();
        break;
      case 2:
        this.props.goToFollowUpList();
        break;
    }
  }

  render() {
    return (
      <View style={functionStyles.container}>
        {
          this.state.functions.map((f, i) => {
            return <TouchableHighlight key={i} underlayColor={colors.underlayColor}
                                       onPress={this._clickFunction.bind(this,f)}
                                       style={functionStyles.view}>
              <View key={i}>
                <Image style={functionStyles.image} source={f.image}/>
                <Text style={{textAlign:'center'}}>{f.text}</Text>
              </View>
            </TouchableHighlight>
          })
        }
      </View>
    )
  }

}

const functionStyles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  }
});