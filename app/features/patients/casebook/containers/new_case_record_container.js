import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../actions/patient_actions';
import NewCaseRecord from '../components/new_case_record';
import {renderDelayTime} from '../../../../constants';
import {header} from '../../../../components/navigation_header';

class NewCaseRecordContainer extends React.Component {


  static navigationOptions = {
    title: '添加记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }


  componentDidMount() {
  }

  _createCaseRecord(data) {
    let {loadData, bookId} = this.props.navigation.state.params;
    this.props.createCaseRecord(this.props.token, {casebook_id: bookId, case_record: data})
      .then(v => {
        loadData();
        this.props.navigation.goBack();
      });
  }

  render() {
    return (
      <NewCaseRecord createNewCaseRecord={this._createCaseRecord.bind(this)}/>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCaseRecord: (token, data) => {
      return dispatch(actions.createCaseRecord(token, data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCaseRecordContainer)

