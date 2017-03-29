import React from 'react';
import {connect} from 'react-redux';

import NewCase from '../components/new_case';
import {header} from '../../../../components/navigation_header';

import * as actions from '../../../../actions/patient_actions';

class NewCaseContainer extends React.Component {

  static navigationOptions = {
    title: '病例记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  _createNewCaseBook(data) {
    const {loadCaseListData} = this.props.navigation.state.params;
    this.props.createNewCaseBook(this.props.token, data).then(v => {
      return this.props.createCaseRecord(this.props.token, {
        casebook_id: v.payload.data.id,
        case_record: data.caseRecord
      });
    }).then(r => {
      loadCaseListData();
      this.props.navigation.goBack();
    });
  }

  _updateCaseBook(data) {
    const {loadData} = this.props.navigation.state.params;
    this.props.updateCaseBook(this.props.token, data)
      .then(v => {
        loadData();
        this.props.navigation.goBack();
      });
  }

  render() {
    const {patient, caseBook, editing} = this.props.navigation.state.params;
    return (<NewCase patient={patient} caseBook={caseBook} editing={editing}
                     updateCaseBook={this._updateCaseBook.bind(this)}
                     createNewCaseBook={this._createNewCaseBook.bind(this)}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCaseBook: (token, data) => {
      return dispatch(actions.createNewCaseBook(token, data));
    },
    createCaseRecord: (token, data) => {
      return dispatch(actions.createCaseRecord(token, data));
    },
    updateCaseBook: (token, data) => {
      return dispatch(actions.updateCaseBook(token, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCaseContainer)

