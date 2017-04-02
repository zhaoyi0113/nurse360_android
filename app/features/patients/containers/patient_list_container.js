import React from "react";
import {connect} from "react-redux";

import CategoryView from "../../../components/category_view";
import * as actions from "../../../actions/patient_actions";
import {NOTIFICATION_DETAIL} from "../../../routers";
import {header} from '../../../components/navigation_header';
import {renderDelayTime} from '../../../constants';

class PatientListContainer extends React.Component {

  static navigationOptions = {
    title: ({ state }) => state.params.internal?'院内患者':'院外患者',
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
    const internal = this.props.navigation.state.params.internal;
    this.props.queryPatientList(this.props.token, this.state.index, this.state.number, internal);
    this.setState({index: this.state.index + 1});
  }

  render() {
    const internal = this.props.navigation.state.params.internal;
    const list = internal ? this.props.internalPatientList : this.props.externalPatientList;

    const dataList = list.map(l => {
      return {id: l.id,
        title: l.patient.name + '  ( ' + l.patient.genderText + ', ' + l.patient.age + ' 岁 )',
        introduction: l.patient.mobile, image: l.patient.image, hasRead: 'YES',
        patient:l,
      };
    });
    return (
      <CategoryView
        showHeader={false}
        list={dataList}
        loadMaxNumber={this.state.number}
        loadMoreData={this.loadMoreData.bind(this)}
        onClick={(data)=>{
          console.log('patient=', data);
                      this.props.navigation.navigate('PatientDetail',
                               {patient: data.patient})
                               }}
      />
    );
  }

}

PatientListContainer.propTypes = {
  internalPatientList: React.PropTypes.array,
  externalPatientList: React.PropTypes.array,
}

PatientListContainer.defaultProps = {
  internalPatientList: [],
  externalPatientList: [],
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    internalPatientList: state.patient.internalPatientList,
    externalPatientList: state.patient.externalPatientList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryPatientList: (token, index, number, internal) => {
      if (internal) {
        return dispatch(actions.queryInternalPatientList(token, index, number));
      } else {
        return dispatch(actions.queryExternalPatientList(token, index, number));
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListContainer)