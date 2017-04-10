import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, RefreshControl} from 'react-native';

import FollowUpList from '../components/follow_up_list';
import * as actions from '../../../actions/follow_up_actions';
import {header} from '../../../components/navigation_header';
import {colors} from '../../../constants';

class FollowUpListContainer extends React.Component {

  static navigationOptions = {
    title: '随访记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {read, patient} = this.props.navigation.state.params;
    return read ? this.props.queryFollowUpReadList(this.props.token, patient.followUpId, 0, 200)
      : this.props.queryFollowUpUnReadList(this.props.token, patient.followUpId, 0, 200);
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.loadData().then(v => this.setState({isRefreshing: false})).catch(err => this.setState({isRefreshing: false}));
  }

  render() {
    const {read, patient} = this.props.navigation.state.params;
    const list = read ? this.props.readList : this.props.unreadList;
    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}
                        refreshControl={<RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh.bind(this)}
                          tintColor="lightgray"
                          title="加载中..."
                          colors={['lightgray']}/>
                      }
    >
      <FollowUpList list={list} patient={patient} navigation={this.props.navigation}/>
    </ScrollView>);
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    readList: state.followUp.readList,
    unreadList: state.followUp.unreadList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryFollowUpUnReadList: (token, followUpId, index = 0, number = 3) => {
      return dispatch(actions.queryFollowUpUnReadList(token, followUpId, index, number));
    },
    queryFollowUpReadList: (token, followUpId, index = 0, number = 3) => {
      return dispatch(actions.queryFollowUpReadList(token, followUpId, index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpListContainer);