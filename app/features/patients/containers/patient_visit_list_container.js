import React from "react";
import {connect} from "react-redux";

import CategoryView from "../../../components/category_view";
import * as actions from "../../../actions/patient_actions";
import {NOTIFICATION_DETAIL} from "../../../routers";
import {header} from '../../../components/navigation_header';
import {renderDelayTime} from '../../../constants';

class PatientVisitListContainer extends React.Component {

  static navigationOptions = {
    title: '随访记录',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    setTimeout(() => this.loadMoreData(), renderDelayTime);
  }

  loadMoreData() {
    this.props.queryVisitList(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  render() {
    const list = this.props.patientVisitList;

    const dataList = list.map(l => {
      return {
        id: l.id,
        title: l.patient.name + '  ( ' + l.patient.genderText + ', ' + l.patient.age + ' 岁 )',
        introduction: l.patient.mobile, image: l.patient.image, hasRead: 'YES'
      };
    });
    return (
      <CategoryView
        showHeader={false}
        list={dataList}
        loadMaxNumber={this.state.number}
        loadMoreData={this.loadMoreData.bind(this)}
        onClick={(data)=>{
                      this.props.navigation.navigate('Article',
                               {id: data.id, routeId: NOTIFICATION_DETAIL, title: data.title})
                               }}
      />
    );
  }

}

PatientVisitListContainer.propTypes = {
  patientVisitList: React.PropTypes.array,
}

PatientVisitListContainer.defaultProps = {
  patientVisitList: [],
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    patientVisitList: state.patient.patientVisitList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryVisitList: (token,  index, number) => {
      return dispatch(actions.queryVisitList(token,index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientVisitListContainer)