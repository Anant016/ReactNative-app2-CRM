
import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PeopleItem from './PeopleItem';
import AddPerson from './AddPeople'
import CompanyList from './CompanyList'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Button } from 'react-native-elements';
import PeopleDetail from './PeopleDetail'
import * as actions from '../actions'

import _ from 'lodash'

const width=Dimensions.get('window').width-40
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom:20
  },
  button:{
    flex: 1, flexDirection: 'row',

  }
});

class PeopleList extends Component {
  static navigationOptions = {  
    tabBarLabel: 'People',
    tabBarIcon : ({ tintColor }) => {
            <Icon
                name={'user'}
                size={45} 
                style={{ color: tintColor }}
            />
        }
}

  componentWillMount(){
    this.props.loadInitialContacts();
  }
  renderInitialView(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);


    if(this.props.detailView===true){
      return <PeopleDetail />
    }
    else{
      return(
      <View>
      <View style={styles.button}>
        <Button 
            title="Add Person"
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: (Dimensions.get('window').width-150)/2,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 50,
              marginBottom:50
            }}
            onPress={()=>this.props.navigation.navigate('AddPerson')}/>
            <Button 
         buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: (Dimensions.get('window').width-150)/2,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 50,
          marginBottom:50
        }}
        containerStyle={{ marginTop: 20 }}
          title='Companies'
            style={styles.button}
            onPress={()=>this.props.navigation.navigate('CompanyList')}/>
          
          <Button 
            icon={
              <Icon
                name='lock'
                size={15}
                color='white'
              />
            }
            title="X"
            loading                       
            buttonStyle={{
              backgroundColor: "red",
              width: 30,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 50,
              marginBottom:50
            }}
            onPress={()=>{this.props.logout()}}/>

   </View>
   <View style={{paddingTop:50}}>
        <ListView 
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) => 
            <PeopleItem people={rowData} />
          }
        />
        </View>
        </View>);
    }
  }
  render() {
    
    return (
      
      <View style={styles.container}>
      <Text>{this.props.loggedIn}</Text>
         {this.renderInitialView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const people=_.map(state.people,(val,uid)=>{
    return{...val,uid}
  })
  return { 
    people,
    detailView:state.detailView,
    loggedIn:state.loggedIn

  };
 
};

export default connect(mapStateToProps,actions)(PeopleList);
