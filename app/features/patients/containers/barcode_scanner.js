import React from 'react';
import {View} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import {header} from '../../../components/navigation_header';

export default class BarcodeScannerContainer extends React.Component {

  static navigationOptions = {
    title: '添加患者',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    window.alert(e.data);
    window.alert(e.type);
  }

  componentWillUnmount(){
    this.props.navigation.state.params.goBack();
  }

  render() {
    return (
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
      />
    );
  }
}