import React from 'react';
import {ScrollView, Text} from 'react-native';
import RNFS from 'react-native-fs';
import {header} from '../../../components/navigation_header';


export default class UserAgreement extends React.Component {
  static navigationOptions = {
    title: '用户协议',
    header:header,
  }
  constructor(props) {
    super(props);
    this.state = {agreement: ''}
  }

  componentDidMount() {
    RNFS.readFileAssets('agreement.txt').then((res) => {
      this.setState({agreement: res});
    })
  }

  render() {
    return (
      <ScrollView style={{flex: 1,  marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 40}}>
        <Text style={{flex: 1}}>{this.state.agreement}</Text>
      </ScrollView>
    )
  }

}

