import React from "react";
import {View, Text, Image, StyleSheet, ListView, ActivityIndicator} from "react-native";
import _ from "lodash";
import CommonRowCell from "./common_row_cell";
import HeaderCategoryView from "./header_category_view";

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
        this.setState({list: _.unionBy(this.state.list, nextProps.list, 'id'), loadMore: true});
      } else {
        this.setState({loadMore: false});
      }
    } else {
      this.setState({loadMore: false});
    }
  }

  renderRow(rowData) {
    let headTitle = rowData.name && rowData.name.split('')[0];
    return <CommonRowCell title={rowData.title} description={rowData.introduction} image={rowData.image}
                          headTitle={headTitle}/>
  }

  render() {
    let {title, description, image} = this.props;
    return (<View style={styles.container}>
      <HeaderCategoryView description={description} image={image} title={title}/>

      <ListView
        style={styles.list_view}
        dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.props.loadMoreData.bind(this)}
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
}
CategoryView.defaultProps = {
  title: '',
  description: ''
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
  },
  list_view: {
    flex: 5,
    margin: 5,

  }
});