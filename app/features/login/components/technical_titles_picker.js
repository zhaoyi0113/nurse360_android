import React from 'react';
import {Picker, View} from 'react-native';

export default class TechnicalTitlesPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {titles: ['', "护士", "护师", "主管护师", "副主任护师", "主任护师"], title:''};
  }

  render() {
    if (this.props.hidden) {
      return (<View/>);
    }
    return (
      <Picker
        style={this.props.style}
        selectedValue={this.state.title}
        mode={Picker.MODE_DROPDOWN}
        onValueChange={(t) => this.setState({title: t})}>
        {
          this.state.titles.map((title,i) => {
            return <Picker.Item key={i} label={title} value={title}/>
          })
        }
      </Picker>
    );
  }
}

TechnicalTitlesPicker.propTypes = {
  hidden: React.PropTypes.bool.isRequired,
}
TechnicalTitlesPicker.defaultProps = {
  hidden: false
}