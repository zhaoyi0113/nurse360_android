import React from 'react';
import {View, Text, Image, ScrollView, RefreshControl} from 'react-native';
import CommonRowCell from '../../../components/common_row_cell';
import {colors} from '../../../constants';

export default class TemplateCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.props.refresh();
  }

  _endRefresh() {
    this.setState({isRefreshing: false});
  }

  render() {
    let {templateCategoryItems, navigation} = this.props;

    return (<ScrollView style={{flex:1, backgroundColor: colors.bkColor}}
                        refreshControl={<RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh.bind(this)}
                          tintColor="lightgray"
                          title="Loading..."
                          colors={['lightgray']}/>
                      }
    >
      {
        templateCategoryItems.map((template, i) => {
          return (<View key={i} style={{height:80}}>
            <CommonRowCell title={template.title}
                           hasRead='YES'
                           description={template.description}
                           onClick={()=>navigation.navigate('TemplateDetail', {template:template, submit:true})}
                           headTitle={template.title.split('')[0]} />
          </View>);
        })
      }
    </ScrollView>);
  }
}

TemplateCategory.propTypes = {
  templateCategoryItems: React.PropTypes.array,
}

TemplateCategory.defaultProps = {
  templateCategoryItems: []
}