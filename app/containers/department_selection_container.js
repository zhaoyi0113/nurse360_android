import React from 'react';
import {connect} from 'react-redux';
import DepartmentSelection from '../components/department_selection';

import * as actions from '../actions/hospital_actions';

class DepartmentSelectionContainer extends React.Component {

  componentDidMount() {
    this.props.queryDepartmentList(this.props.hospital.id);
  }

  render() {
    return <DepartmentSelection goBack={this.props.goBack.bind(this)}
                                hospital={this.props.hospital}
                                departmentList={this.props.departmentList}
                                selectDepartment={this.props.selectDepartment.bind(this)}/>
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