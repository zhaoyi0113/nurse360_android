import _ from "lodash";
import React from "react";
import {Text, View, TouchableHighlight} from "react-native";
import SettingContainer from "../features/user/containers/setting_container";
import About from "../features/user/components/about";
import UserAgreemnt from "../features/user/components/user_agreement";
import {StackNavigator} from "react-navigation";
import MainContainer from "../containers/index";
import ArticleContainer from "../containers/article_container";
import OrderDetailContainer from "../features/order/containers/order_detail_container";
import NotificationListContainer from "../features/home/containers/notification_list_container";
import StudyCourseListContainer from "../features/home/containers/study_course_list_container";
import OrderListContainer from "../features/order/containers/order_list_container";
import UserTaskContainer from "../features/user/containers/user_task_container";
import UserHistoryCourseContainer from "../features/user/containers/user_history_course_container";
import WalletContainer from "../features/user/containers/wallet_container";
import Withdraw from "../features/user/components/withdraw";
import SuggestionFeedbackContainer from "../features/user/containers/suggestion_feedback_container";
import LoginContainer from "../features/login/containers/login_container";
import AddVisit from "../features/visit/containers/add_visit_container";
import VisitContainer from "../features/visit/containers/visit_container";
import UpdatePasswordContainer from '../features/user/containers/password_update_container';
import ForgetPasswordContainer from '../features/login/containers/forget_password_container';
import UserProfileUpdateContainer from '../features/user/containers/user_profile_update_container';
import HospitalSelectionContainer from '../containers/hospital_selection_container';
import DepartmentSelectionContainer from '../containers/department_selection_container';
import QualificationContainer from '../features/user/containers/qualification_container';
import Patient from '../features/patients/components/patient';
import PatientListContainer from '../features/patients/containers/patient_list_container';
import PatientVisitListContainer from '../features/patients/containers/patient_visit_list_container';
import PatientDetail from '../features/patients/components/patient_detail';
import PatientCasebookListContainer from '../features/patients/containers/patient_casebook_list_container';
import CaseDetailContainer from '../features/patients/casebook/containers/case_detail_container';
import NewCaseContainer from '../features/patients/casebook/containers/new_case_container';
import NewCaseRecordContainer from '../features/patients/casebook/containers/new_case_record_container';
import PatientVisitContainer from '../features/patients/visit/containers/patient_visit_container';
import BarcodeScannerContainer from '../features/patients/containers/barcode_scanner';
import FollowUpContainer from '../features/followup/containers/follow_up_container';
import NewFollowUpContainer from '../features/followup/containers/new_follow_up_container';
import TemplateCategoryContainer from '../features/followup/containers/template_category_container';
import TemplateDetailContainer from '../features/followup/containers/template_detail_container';
import NewQuestionFollowUpContainer from '../features/followup/containers/new_question_follow_up_container'
import FollowUpPatientListContainer from '../features/followup/containers/follow_up_patient_list_conatiner';
import QuestionDetailContainer from '../features/followup/containers/question_detail_container';
import FollowUpListContainer from '../features/followup/containers/follow_up_list_container';
import QuestionReply from '../features/followup/components/question_reply';

export const Root = StackNavigator({
  Main: {screen: MainContainer, path: 'main'},
  Article: {path: 'article', screen: ArticleContainer},
  OrderDetail: {path: 'orderDetail', screen: OrderDetailContainer},
  NotificationList: {screen: NotificationListContainer},
  StudyList: {screen: StudyCourseListContainer},
  OrderList: {screen: OrderListContainer},
  UserOrderList: {screen: UserTaskContainer},
  HistoryCourse: {screen: UserHistoryCourseContainer},
  Wallet: {screen: WalletContainer},
  Withdraw: {screen: Withdraw},
  UserSetting: {screen: SettingContainer},
  Feedback: {screen: SuggestionFeedbackContainer},
  UserAgreement: {screen: UserAgreemnt},
  About: {screen: About},
  Login: {screen: LoginContainer},
  AddVisit: {screen: AddVisit},
  VisitContainer: {screen: VisitContainer},
  PasswordUpdate: {screen: UpdatePasswordContainer},
  ForgetPassword: {screen: ForgetPasswordContainer},
  UserProfileUpdate: {screen: UserProfileUpdateContainer},
  HospitalSelection: {screen: HospitalSelectionContainer},
  DepartmentSelection: {screen: DepartmentSelectionContainer},
  Qualification: {screen: QualificationContainer},
  Patient: {screen: Patient},
  PatientList: {screen: PatientListContainer},
  PatientVisitList: {screen: PatientVisitListContainer},
  PatientDetail: {screen: PatientDetail},
  PatientCasebookList: {screen: PatientCasebookListContainer},
  CaseDetail: {screen: CaseDetailContainer},
  NewCase: {screen: NewCaseContainer},
  NewCaseRecord: {screen: NewCaseRecordContainer},
  PatientVisit: {screen: PatientVisitContainer},
  BarcodeScanner: {screen: BarcodeScannerContainer},
  FollowUpContainer: {screen: FollowUpContainer},
  NewFollowUp: {screen: NewFollowUpContainer},
  TemplateCategory: {screen: TemplateCategoryContainer},
  TemplateDetail: {screen: TemplateDetailContainer},
  NewQuestionFollowUp: {screen: NewQuestionFollowUpContainer},
  FollowUpPatientList: {screen: FollowUpPatientListContainer},
  QuestionDetail: {screen: QuestionDetailContainer},
  FollowUpList: {screen: FollowUpListContainer},
  QuestionReply: {screen: QuestionReply},
}, {
  initialRouteName: 'Login',
});

export const getStateForAction = Root.router.getStateForAction;

export const SETTING_ROUTER = 1;
export const ABOUT_ROUTER = 2;
export const USER_AGREEMENT = 3;
export const STUDY_CATEGORY_VIEW = 4;
export const NOTIFICATION_CATEGORY_VIEW = 5;
export const PATIENT_SERVICE_CATEGORY_VIEW = 6;
export const ARTICLE_VIEW = 7;
export const NOTIFICATION_DETAIL = 8;
export const COURSE_DETAIL = 9;
export const ORDER_DETAIL = 10;
export const USER_ORDER_LIST = 11;
export const USER_HISTORY_COURSES = 12;
export const SUGGESTION_FEEDBACK = 13;
export const USER_WALLET = 14;
export const WITHDRAW = 15;


export const routers = [
  {
    id: 0,
    title: '',
  }, {
    //user setting
    id: SETTING_ROUTER,
    title: '设置',
  }, {
    id: ABOUT_ROUTER,
    title: '关于',
  }, {
    id: USER_AGREEMENT,
    title: '用户协议'
  }, {
    id: STUDY_CATEGORY_VIEW,
    title: '学习',
  }, {
    id: NOTIFICATION_CATEGORY_VIEW,
    title: '通知',
  }, {
    id: PATIENT_SERVICE_CATEGORY_VIEW,
    title: '患者服务'
  }, {
    id: ARTICLE_VIEW,
    title: '文章',
  }, {
    id: NOTIFICATION_DETAIL,
    title: '',
  }, {
    id: COURSE_DETAIL,
    title: '',
  }, {
    id: ORDER_DETAIL,
    title: '',
  }, {
    id: USER_ORDER_LIST,
    title: '我的任务',
  }, {
    id: USER_HISTORY_COURSES,
    title: '我的学习'
  }, {
    id: SUGGESTION_FEEDBACK,
    title: '意见反馈',
  }, {
    id: USER_WALLET,
    title: '我的钱包',
  }, {
    id: WITHDRAW,
    title: '申请提现'
  }
]

export const getRouters = (id) => {
  return _.find(routers, {id: id});
}

export const getRouteComponent = (route, navigator) => {
  switch (route.id) {
    case SETTING_ROUTER:
      return <SettingContainer navigator={navigator}/>;
    case ABOUT_ROUTER:
      return <About navigator={navigator}/>;
    case USER_AGREEMENT:
      return <UserAgreemnt navigator={navigator}/>;
  }
}

export const getRouterMap = (router) => {
  return {
    LeftButton: (route, navigator, index, navState) => {
      return (<TouchableHighlight onPress={() => navigator.pop()}>
        <Text style={{color: '#559bec'}}> {'< 返回'}</Text>
      </TouchableHighlight>);
    },
    RightButton: (route, navigator, index, navState) => {
      return null;
    },
    Title: (route, navigator, index, navState) => {
      return (<Text>{route.title}</Text>);
    },
  }
}