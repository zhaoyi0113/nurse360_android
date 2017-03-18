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
    let id;
    if (this.props.screenProps && this.props.screenProps.hospital) {
      id = this.props.screenProps.hospital.id;
    }
    if (this.props.navigation.state.params && this.props.navigation.state.params.hospital) {
      id = this.props.navigation.state.params.hospital.id;
    }
    this.props.queryDepartmentList(id);
  }

  _selectDepartment(department) {
    if (this.props.screenProps && this.props.screenProps.selectDepartment) {
      this.props.screenProps.selectDepartment(department);
    }
    if (this.props.navigation.state.params && this.props.navigation.state.params.selectDepartment) {
      this.props.navigation.state.params.selectDepartment(department);
    }
    this.props.navigation.goBack();
  }

  render() {
    return <DepartmentSelection goBack={()=>this.props.navigation.goBack()}
                                hospital={this.props.screenProps?this.props.screenProps.hospital:this.props.navigation.state.params.hospital}
                                departmentList={this.props.departmentList}
                                selectDepartment={this._selectDepartment.bind(this)}/>
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