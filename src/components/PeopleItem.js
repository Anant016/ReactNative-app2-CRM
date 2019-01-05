import React from 'react';
import { Text, View, StyleSheet, Image,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
      top: 20,
      left: 80,
      fontSize: 24,
  },
  image: {
      height: 100,
  },
  action: {
      backgroundColor: 'black',
      color: 'white',
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      
  },
});

const PeopleItem = (props) => {
    return (
        <TouchableWithoutFeedback
          onPress={()=>props.selectPerson(props.people)}
        >
        <View style={[theme.cardStyle, styles.card]}>
            <Image
                source={require('./img/background.jpg')}
                style={[theme.cardImageStyle, styles.image]}
            />
            <Icon
                name={'user'}
                size={100} 
                style={styles.icon}
            />
            <Text style={[theme.cardTitleStyle, styles.title]}>{props.people.first_name} {props.people.last_name}</Text>
            <Text style={[theme.cardActionStyle, styles.action]}>{props.people.company}</Text>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default connect(null, actions)(PeopleItem);