import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../actions/follow_up_actions';

import TemplateDetail from '../components/template_detail';
import {header} from '../../../components/navigation_header';

class TemplateDetailContainer extends React.Component {

  static navigationOptions = {
    title: ({state}) => {
      state.params.template.title || ''
    },
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    const {template, submit} = this.props.navigation.state.params;
    console.log('xxx:', template, submit)
    const id = !submit ? template.followUpId : template.id;
    this.props.queryTemplateDetail(this.props.token, id);
  }

  componentWillUnmount() {
    this.props.clearTemplateDetail();
  }

  _submitTemplate() {

  }

  render() {
    const {submit} = this.props.navigation.state.params;
    return <TemplateDetail submit={submit} template={this.props.templateDetail}
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
    sendTemplate: (token, followUpId, followUpType, consultationId, questionnaireId) => {
      return dispatch(actions.sendTemplate(token, followUpId, followUpType, consultationId, questionnaireId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetailContainer);
