import React from "react";
import {connect} from "react-redux";
import HospitalSelection from "../components/hospital_selection";
import * as actions from "../actions/hospital_actions";

class HospitalSelectionContainer extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }
  constructor(props) {
    super(props);
    this.state = {index: 0, number: 50};
  }

  componentDidMount() {
    this.props.queryHospitalList('', this.state.index, this.state.number);
  }

  render() {
    return <HospitalSelection goBack={()=>this.props.navigation.goBack()}
                              selectHospital={(hospital)=>{
                                this.props.screenProps.selectHospital(hospital);
                                this.props.navigation.goBack();
                              }}
                              hospitalList={this.props.hospitalList}
                              queryHospital={(name)=>{
                                this.props.queryHospitalList(name, this.state.index+1, this.state.number);
                                this.setState({index: this.state.index+1});
                              }}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    hospitalList: state.hospital.hospitalList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryHospitalList: (name, index, number) => {
      dispatch(actions.queryHospital(name, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalSelectionContainer);