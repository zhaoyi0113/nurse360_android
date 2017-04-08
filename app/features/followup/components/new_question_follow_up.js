import React from 'react';
import {View, Text, Image, ScrollView, TextInput, Button} from 'react-native';

import {colors, margin} from '../../../constants';
import ImageSelector from '../../../components/image_selector';


const QuestionCategory = ({questionList, selectCategory}) => {
  const list = questionList.length > 0 ?
    questionList.reduce((rows, key, index) => {
      (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key));
      return rows
    }, []) : [];
  return (<View style={{flexDirection: 'column', flex:1}}>
      {
        list.map((array, i) => {
          return (<View key={i} style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
            {
              array.map((category, j) => {
                const bk = category.select ? colors.labelColor : 'lightgray';
                return <Text key={j}
                             onPress={()=>selectCategory(category)}
                             style={{flex:1, textAlign:'center', backgroundColor: bk, margin:5,
                             borderRadius:3,height:30,textAlignVertical:'center', color:'white'}}>
                  {category.name}</Text>
              })
            }
          </View>)
        })
      }
    </View>
  )
}

export default class NewQuestionFollowUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {questionList: [], content: ''};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionList && this.state.questionList.length === 0) {
      this.setState({questionList: nextProps.questionList.slice()});
    }
  }

  _selectedCategory(category) {
    this.state.questionList.map(q => q.select = false);
    category.select = !category.select;
    this.setState({questionList: this.state.questionList});
  }

  _enableSubmit() {
    const selectedQuestion = this.state.questionList.filter(q => q.select);
    if (!selectedQuestion || selectedQuestion.length == 0) {
      return false;
    }
    if (!this.state.content) {
      return false;
    }
    return true;
  }

  _submit() {
    const selectedQuestion = this.state.questionList.filter(q => q.select);

    this.props.submit(selectedQuestion, this.state.content, this.imageSelector.state.images);
  }

  render() {
    const {questionList} = this.state;
    return (
      <View style={{flex:1}}>
        <ScrollView style={{backgroundColor: colors.bkColor, flex:1}}>
          <QuestionCategory questionList={questionList} selectCategory={this._selectedCategory.bind(this)}/>
          <Text style={{marginLeft:20, color: colors.lightTextColor}}>编辑提问</Text>
          <TextInput style={{margin:margin, backgroundColor: 'white', height: 120}}
                     placeholder='请输入随访的具体内容'
                     value={this.state.content}
                     onChangeText={(text)=>this.setState({content: text})}
                     multiline={true} underlineColorAndroid='transparent'/>
          <Text style={{color: colors.lightTextColor, marginLeft:20}}>上传问题相关图片（最多9张，没有可不传)</Text>
          <ImageSelector ref={i=>this.imageSelector = i}/>
        </ScrollView>
        <View style={{margin:margin, borderRadius:5}}>
          <Button title='推送' onPress={this._submit.bind(this)} disabled={!this._enableSubmit()}/>
        </View>
      </View>
    );
}

}


NewQuestionFollowUp.propTypes = {
  questionList: React.PropTypes.array,
}

NewQuestionFollowUp.defaultProps = {
  questionList: [],
}
