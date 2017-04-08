import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../actions/follow_up_actions';

import TemplateDetail from '../components/template_detail';
import {header} from '../../../components/navigation_header';

class TemplateDetailContainer extends React.Component {

  static navigationOptions = {
    title: ({state}) => {
      return state.params.template.title || state.params.title || ''
    },
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    const {template, submit} = this.props.navigation.state.params;
    const id = !submit ? template.followUpId : template.id;
    this.props.queryTemplateDetail(this.props.token, id);
  }

  componentWillUnmount() {
    this.props.clearTemplateDetail();
  }

  _submitTemplate() {
    const {patient, template} = this.props.navigation.state.params;
    console.log('send template ', patient);
    this.props.sendFollowUp(this.props.token, patient.userId, '', patient.patientId, template.id)
      .then(v => {
        console.log('send follow up resposne ', v);
        this.props.sendQuestionnaire(this.props.token, patient.followUpId, 'QUESTIONNAIRE', v.payload.data.id, template.id);
      });
  }

  render() {
    const {submit, patient} = this.props.navigation.state.params;
    return <TemplateDetail submit={submit} template={this.props.templateDetail}
                           patient={patient}
                           submitTemplate={this._submitTemplate.bind(this)}/>
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    templateDetail: state.followUp.templateDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryTemplateDetail: (token, id) => {
      return dispatch(actions.queryTemplateDetail(token, id));
    },
    clearTemplateDetail: () => {
      return dispatch(actions.clearTemplateDetail());
    },
    sendQuestionnaire: (token, followUpId, followUpType, consultationId, questionnaireId) => {
      return dispatch(actions.sendQuestionnaire(token, followUpId, followUpType, consultationId, questionnaireId));
    },
    sendFollowUp: (token, userId, desc, patientId, categoryId) => {
      return dispatch(actions.sendFollowUp(token, userId, desc, patientId, categoryId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetailContainer);
