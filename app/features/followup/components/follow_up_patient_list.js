import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {colors} from '../../../constants';
import CommonRowCell from '../../../components/common_row_cell';
import {parsePatientGender, parsePatientTitle} from '../../../reducers/common_reducer';

export default class FollowUpPatientList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});

    this.props.refresh();
  }

  endRefresh() {
    this.setState({isRefreshing: false});
  }

  render() {
    const {patientList, navigation} = this.props;
    return (<ScrollView style={{backgroundColor: colors.bkColor, flex:1}}
                        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="lightgray"
            title="加载中..."
            colors={['lightgray']}
          />
        }>
      {
        patientList.map((p, i) => {
          const {patient} = p;
          const image = patient ? {uri: patient.headImageUrl} : require('../../../images/home/headIm.png');
          return (<View key={i}>
            <CommonRowCell title={parsePatientTitle(patient)}
                           hasRead='YES'
                           description={patient.mobile}
                           image={image}
                           onClick={()=>navigation.navigate('FollowUpContainer', {p})}
            />
          </View>);
        })
      }
    </ScrollView>);
  }
}

FollowUpPatientList.propTypes = {
  patientList: React.PropTypes.array,
}

FollowUpPatientList.defaultProps = {
  patientList: [],
}