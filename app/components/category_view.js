import React from "react";
import {View, Text, Image, StyleSheet, ListView, ActivityIndicator} from "react-native";
import _ from "lodash";
import {FontSize} from "../constants";
import CommonRowCell from "./common_row_cell";

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
      <View style={styles.header_view}>
        <Image style={styles.title_image} source={image}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
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
  header_view: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
  title_image: {
    resizeMode: 'contain',
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: FontSize.xlarge,
    flex: 0.5,
  },
  description: {
    fontSize: FontSize.small,
    flex: 0.5,
  },
  list_view: {
    flex: 5,
    margin: 10,

  }
});