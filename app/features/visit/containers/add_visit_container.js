import React from 'react';
import {connect} from 'react-redux';

import AddVisit from '../components/add_visit';
import * as actions from '../../../actions/visit_actions';

class AddVisitContainer extends React.Component {

  static navigationOptions = {
    title: '添加出诊记录',
    cardStack: {
      gesturesEnabled: true
    }
  }

  componentDidMount() {
    this.props.queryVisitItems(this.props.token);
  }

  render() {
    return (<AddVisit visitItems={this.props.visitItems}/>);
  }

}

AddVisitContainer.propTypes = {
  visitItems: React.PropTypes.array.isRequired,
}

AddVisitContainer.defaultProps = {
  visitItems: [],
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    visitItems: state.visit.visitItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryVisitItems: (token) => {
      return dispatch(actions.queryVisitItems(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVisitContainer);
