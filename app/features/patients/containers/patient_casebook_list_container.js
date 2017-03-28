import React from 'react';
import {connect} from 'react-redux';

import PatientCasebookList from '../components/patient_casebook_list';
import * as actions from '../../../actions/patient_actions';
import {renderDelayTime} from '../../../constants';
import {header} from '../../../components/navigation_header';

class PatientCasebookListContainer extends React.Component{

  static navigationOptions = {
    title: '病例记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props){
    super(props);
    this.state = {number: 20, index: 0};
  }

  componentDidMount(){
    const {userId, patientId} = this.props.navigation.state.params;
    setTimeout(()=>this.props.queryNurseCaseBookList(this.props.token, userId, patientId, '',this.state.index, this.state.number ), renderDelayTime);
  }

  render(){
    return (<PatientCasebookList patientCaseBookList={this.props.patientCaseBookList}/>);
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    patientCaseBookList: state.patient.patientCaseBookList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryNurseCaseBookList: (token, userId, patientId, content, index, number) => {
      return dispatch(actions.queryNurseCaseBookList(token, userId, patientId, content, index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasebookListContainer)
