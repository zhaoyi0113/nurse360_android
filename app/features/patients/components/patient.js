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

export default class Patient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
  }

  _getInternPatient() {
    return <View style={{flex:1,justifyContent: 'center',  alignItems: 'center', backgroundColor: 'white', flexDirection: 'row', height: 40}}>
      <Text style={{textAlign: 'center', flex: 1}}>暂无院内患者</Text></View>;
  }

  _getOuterPatient() {
    return  <View style={{flex:1,justifyContent: 'center',  alignItems: 'center', backgroundColor: 'white', flexDirection: 'row', height: 40}}>
      <Text style={{textAlign: 'center', flex: 1}}>暂无院外患者</Text></View>;
  }

  render() {
    const {navigate} = this.props.navigation;
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
        <Function
        />
        <View style={{flexDirection: 'column'}}>
          <CommonTableHeader title='院内患者' more='更多'
                             clickMore={()=>navigate('StudyList')}/>
          {this._getInternPatient()}
        </View>
        <View>
          <CommonTableHeader title='院外患者' more='更多'
                             clickMore={()=>navigate('StudyList')}/>
          {this._getOuterPatient()}
        </View>
      </ScrollView>
    );
  }
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
        this.props.goToUserTask();
        break;
      case 1:
        this.props.goToUserCourse();
        break;
      case 2:
        break;
    }
  }

  render() {
    return (
      <View style={functionStyles.container}>
        {
          this.state.functions.map((f, i) => {
            return <TouchableHighlight key={i} underlayColor='lightgray'
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