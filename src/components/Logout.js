
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


import{connect} from 'react-redux'
import Login from './Login'
import Navigation from './Navigation'
import PeopleList  from './PeopleList'
import Loader from './Loader'

import firebase from 'firebase'
import * as actions from '../actions'


class Logout extends Component {

  state={
    loggedIn:false
  }

 

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyC99Kys6rbKuftyYyOF__CXarDFaBoTRqs",
      authDomain: "crm-app-e45ff.firebaseapp.com",
      databaseURL: "https://crm-app-e45ff.firebaseio.com",
      projectId: "crm-app-e45ff",
      storageBucket: "crm-app-e45ff.appspot.com",
      messagingSenderId: "311775653391"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
   }

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.login()
      }else{
        this.props.logout()
      }
    })
  }

  renderInitialView(){
    switch(this.props.loggedIn){
      case true:
           return <Navigation />
      case false:
            return <Login />
      default:
            return <Loader size="large"/>
    }
  }

  render() {
    return (
      
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

mapStateToProps=state=>{
  return{
    loggedIn:state.loggedIn
  }
}

export default connect(mapStateToProps,actions)(Logout)