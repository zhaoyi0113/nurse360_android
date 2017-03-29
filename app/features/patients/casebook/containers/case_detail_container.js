import React from 'react';
import {connect} from 'react-redux';

import CaseDetail from '../components/case_detail';
import {header} from '../../../../components/navigation_header';
import * as actions from '../../../../actions/patient_actions';
import {renderDelayTime} from '../../../../constants';

class CaseDetailContainer extends React.Component {

  static navigationOptions = {
    title: '记录详情',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    let {bookId} = this.props.navigation.state.params;
    setTimeout(() => this.props.queryNurseCaseBookDetail(this.props.token, bookId), renderDelayTime);
  }

  componentWillUnmount(){
    this.props.clearCaseBook();
  }

  _loadData() {
    let {bookId} = this.props.navigation.state.params;
    this.props.queryNurseCaseBookDetail(this.props.token, bookId)
  }

  render() {
    let {patient} = this.props.navigation.state.params;
    return (<CaseDetail caseBook={this.props.caseBook}
                        loadData={this._loadData.bind(this)}
                        patient={patient} navigation={this.props.navigation}/>);
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    caseBook: state.patient.caseBook,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryNurseCaseBookDetail: (token, id) => {
      return dispatch(actions.queryNurseCaseBookDetail(token, id));
    },
    clearCaseBook: () => {
      return dispatch(actions.clearCaseBook());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetailContainer)

