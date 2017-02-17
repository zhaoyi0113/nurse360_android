import React from "react";
import {ListView, View, Image, Text, ActivityIndicator, StyleSheet} from "react-native";
import Order from "./order";
import _ from "lodash";
import HeaderCategoryView from "../../../components/header_category_view";

export default class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loadMore: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders) {
      if (nextProps.orders.length > 0) {
        this.setState({orders: _.unionBy(this.state.orders, nextProps.orders, 'id'), loadMore: true});
      } else {
        this.setState({loadMore: false});
      }
    } else {
      this.setState({loadMore: false});
    }
  }

  renderRow(rowData) {
    return <Order order={rowData}/>
  }

  render() {
    let {image, title, description} = this.props;
    return (
      <View style={styles.container}>
        <HeaderCategoryView title={title} description={description} image={image}/>
        <ListView
          style={styles.list_view}
          dataSource={this.state.dataSource.cloneWithRows(this.state.orders)}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.props.loadMoreData.bind(this)}
          enableEmptySections={true}
          renderFooter={()=><ActivityIndicator
                            animating={this.state.loadMore}
                            style={{height: 80}}
                            size="large"
                          />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
  },
  list_view: {
    flex: 5,
    margin: 10,
  }
});