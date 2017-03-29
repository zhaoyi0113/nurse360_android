import React from 'react';
import {connect} from 'react-redux';

import PatientCasebookList from '../components/patient_casebook_list';
import * as actions from '../../../actions/patient_actions';
import {renderDelayTime} from '../../../constants';
import {header} from '../../../components/navigation_header';

class PatientCasebookListContainer extends React.Component {

  static navigationOptions = {
    title: '病例记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {number: 200, index: 0, caseBook: {}};
  }

  _openCase(book) {
    const {patient} = this.props.navigation.state.params;
    this.props.queryNurseCaseBookDetail(this.props.token, book.id)
      .then(v => {
        console.log('get case response', v);
        this.props.navigation.navigate('CaseDetail',{caseBook: v.payload.data, patient, editing: false} )
      });
  }

  _refresh(){
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(){
    const {userId, patientId} = this.props.navigation.state.params;
    setTimeout(() => this.props.queryNurseCaseBookList(this.props.token, userId, patientId, '', this.state.index, this.state.number)
      .then(v=>this.list._endRefresh()).catch(err => this.list._endRefresh()), renderDelayTime);

  }

  render() {
    const {patient} = this.props.navigation.state.params;
    return (
      <PatientCasebookList navigation={this.props.navigation}
                           patient={patient}
                           refresh={this._refresh.bind(this)}
                           ref={list=>this.list = list}
                           patientCaseBookList={this.props.patientCaseBookList} openCase={this._openCase.bind(this)}/>);
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
    queryNurseCaseBookDetail: (token, id) => {
      return dispatch(actions.queryNurseCaseBookDetail(token, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasebookListContainer)
