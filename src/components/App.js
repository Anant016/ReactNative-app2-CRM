
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import Login from './Login'
import Navigation from './Navigation'
import PeopleList  from './PeopleList'
import Loader from './Loader'

import firebase from 'firebase'

import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import reducers from '../reducers/PeopleReducer'
import {connect} from 'react-redux'

import Thunk from 'redux-thunk';
import Logout from './Logout'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducers,
  composeEnhancer(applyMiddleware(Thunk))
  );

class App extends Component {

  state={
    loggedIn:null
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
        this.setState({loggedIn:true})
      }else{
        this.setState({loggedIn:false})
      }
    })
  }

  renderInitialView(){
    switch(this.state.loggedIn){
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
      <Provider store={store}>
      <View style={styles.container}>
        <Logout/>
      </View>
      </Provider>
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

export default App;