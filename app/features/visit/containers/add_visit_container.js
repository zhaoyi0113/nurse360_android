import React from 'react';
import {connect} from 'react-redux';

import AddVisit from '../components/add_visit';
import * as actions from '../../../actions/visit_actions';
import {header} from '../../../components/navigation_header';

class AddVisitContainer extends React.Component {

  static navigationOptions = {
    title: '添加出诊记录',
    cardStack: {
      gesturesEnabled: true
    },
    header: {visible: false},
  }

  componentDidMount() {
    this.props.queryVisitItems(this.props.token);
  }

  _addVisit(visit) {
    return this.props.addVisit(this.props.token, visit);
  }

  render() {
    const {order, changeScreen, rootNavigation} = this.props.screenProps;
    return (<AddVisit visitItems={this.props.visitItems}
                      addVisit={this._addVisit.bind(this)}
                      userInfo={this.props.userInfo}
                      navigation={this.props.navigation}
                      rootNavigation={rootNavigation}
                      changeScreen={changeScreen.bind(this)}
                      token={this.props.token}
                      requestUploadImageWaiting={this.props.requestUploadImageWaiting.bind(this)}
                      order={order}/>);
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
    },
    requestUploadImageWaiting: (data) => {
      return dispatch(actions.requestUploadImageWaiting(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVisitContainer);
