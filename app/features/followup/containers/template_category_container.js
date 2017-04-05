import React from 'react';
import {connect} from 'react-redux';
import TemplateCategory from '../components/template_category';
import * as actions from '../../../actions/follow_up_actions';
import {header} from '../../../components/navigation_header';

class TemplateCategoryContainer extends React.Component {

  static navigationOptions = {
    title: '模版',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {categoryId} = this.props.navigation.state.params;
    this.props.queryTemplateCategoryItems(this.props.token, categoryId);
  }

  _refresh() {
    this.loadData().then(v => this.template && this.template._endRefresh()).catch(err => this.template && this.template._endRefresh());
  }

  render() {
    const {templateCategoryItems, navigation} = this.props;
    const {patient} = this.props.navigation.state.params;
    return (
      <TemplateCategory
        ref={t=>this.template=t}
        templateCategoryItems={templateCategoryItems} navigation={navigation} patient={patient}
        refresh={this._refresh.bind(this)}/>)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    templateCategoryItems: state.followUp.templateCategoryItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryTemplateCategoryItems: (token, categoryId, index, number) => {
      return dispatch(actions.queryTemplateCategoryItems(token, categoryId, index, number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateCategoryContainer);