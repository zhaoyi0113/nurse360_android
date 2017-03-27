import React from "react";
import {View, Text, Image, StyleSheet, ListView, ActivityIndicator} from "react-native";
import _ from "lodash";
import CommonRowCell from "./common_row_cell";
import HeaderCategoryView from "./header_category_view";
import {colors} from '../constants';

export default class CategoryView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loadMore: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      if (nextProps.list.length > 0) {
        if(nextProps.list.length < this.props.loadMaxNumber) {
          this.setState({list: _.unionBy(this.state.list, nextProps.list, 'id'), loadMore: false});
        }else{
          this.setState({list: _.unionBy(this.state.list, nextProps.list, 'id'), loadMore: true});
        }
      } else {
        this.setState({loadMore: false});
      }
    } else {
      this.setState({loadMore: false});
    }
  }

  renderRow(rowData) {
    let headTitle = rowData.name && rowData.name.split('')[0];
    const title = rowData.title || rowData.name;
    return <CommonRowCell title={title} description={rowData.introduction} image={rowData.image}
                          hasRead={rowData.hasRead}
                          headTitle={headTitle} onClick={()=>this.props.onClick(rowData)}/>
  }

  render() {
    let {title, description, image} = this.props;
    return (<View style={styles.container}>
      <HeaderCategoryView description={description} image={image} title={title}/>

      <ListView
        style={styles.list_view}
        dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={()=> this.state.loadMore && this.props.loadMoreData()}
        enableEmptySections={true}
        renderFooter={()=><ActivityIndicator
                            animating={this.state.loadMore}
                            style={{height: 80}}
                            size="large"
                          />}
      />
    </View>);
  }
}

CategoryView.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  navigator: React.PropTypes.object,
  onClick: React.PropTypes.func,
}
CategoryView.defaultProps = {
  title: '',
  description: '',
  onClick: ()=>{}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.bkColor,
  },
  list_view: {
    flex: 5,
  }
});