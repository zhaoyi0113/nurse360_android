import React from "react";
import {connect} from "react-redux";
import CategoryView from "../../../components/category_view";
import * as actions from "../../../actions/study_actions";
import {COURSE_DETAIL} from "../../../routers";
import {header} from "../../../components/navigation_header";

class StudyCourseListContainer extends React.Component {

  static navigationOptions = {
    title: '学习',
    cardStack: {
      gesturesEnabled: true
    },
    header:header,
  }

  constructor(props) {
    super(props);
    this.state = {index: 0, number: 20};
  }

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData() {
    this.props.queryStudyCourses(this.props.token, this.state.index, this.state.number);
    this.setState({index: this.state.index + 1});
  }

  render() {
    return (
      <CategoryView title='我的学习' description='我正在学习的课程'
                    list={this.props.courses}
                    loadMoreData={this.loadMoreData.bind(this)}
                    loadMaxNumber={this.state.number}
                    onClick={ (data)=>
                      this.props.navigation.navigate('Article',
                                {
                                  id: data.id,
                                  routeId: COURSE_DETAIL,
                                  title: data.name,
                                }
                              )
                    }
                    image={require('../../../images/study/studyIcon.png')}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    courses: state.study.courseList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryStudyCourses: (token, index, number) => {
      return dispatch(actions.queryStudyCourseList(token, index, number));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyCourseListContainer)