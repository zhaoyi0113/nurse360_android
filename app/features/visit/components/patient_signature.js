import React from 'react';
import {View, Button, Text} from 'react-native';
import SignaturePad from 'react-native-signature-pad';

export default class PatientSignature extends React.Component {

  constructor(props) {
    super(props);
    this.state = {signature: null, showSign: true};
  }

  _signaturePadError = (error) => {
    console.error(error);
  }

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
    this.setState({signature: base64DataUrl});
  }

  _clearSign = () => {
    this.setState({ showSign: false })
    setTimeout( () => { this.setState({ showSign: true }); }, 0);
  }

  render() {
    return (<View style={{flex:1, margin: 10}}>
      <Text style={{alignSelf: 'flex-end'}} onPress={this._clearSign.bind(this)}>清除</Text>
      {
        this.state.showSign ? <SignaturePad onError={this._signaturePadError}
                                            onChange={this._signaturePadChange}
                                            style={{flex: 1, borderColor: 'gray', borderWidth: 1}}/> : null
      }
      <Button title='确认，并跳转护士签字'
              disabled={!this.state.signature}
              onPress={this.props.addSignature.bind(this)}/>
    </View>);
  }

}