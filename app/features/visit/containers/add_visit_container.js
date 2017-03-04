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

  _addVisit(visit){
    this.props.addVisit(this.props.token, visit)
      .then(v=> this.props.navigation.goBack());
  }

  render() {
    return (<AddVisit visitItems={this.props.visitItems}
                      addVisit={this._addVisit.bind(this)}
                      userInfo={this.props.userInfo}
                      order={this.props.navigation.state.params.order}/>);
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
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryVisitItems: (token) => {
      return dispatch(actions.queryVisitItems(token));
    },
    addVisit: (token, visit) => {
      return dispatch(actions.addVisit(token, visit));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVisitContainer);
