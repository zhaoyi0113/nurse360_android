import React from 'react';
import {connect} from 'react-redux';
import DepartmentSelection from '../components/department_selection';

import * as actions from '../actions/hospital_actions';

class DepartmentSelectionContainer extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }
  componentDidMount() {
    this.props.queryDepartmentList(this.props.screenProps.hospital.id);
  }

  render() {
    return <DepartmentSelection goBack={()=>this.props.navigation.goBack()}
                                hospital={this.props.screenProps.hospital}
                                departmentList={this.props.departmentList}
                                selectDepartment={(department)=>{
                                  this.props.screenProps.selectDepartment(department);
                                  this.props.navigation.goBack();
                                }}/>
  }
}

DepartmentSelectionContainer.propTypes = {
  departmentList: React.PropTypes.array
}

DepartmentSelectionContainer.defaultProps = {
  departmentList: [],
}

const mapStateToProps = (state) => {
  return {
    departmentList: state.hospital.departmentList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryDepartmentList: (hospitalId) => {
      dispatch(actions.queryDepartment(hospitalId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSelectionContainer)