import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const MoviesScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/GetMovies'
  const[response, setResponse] = useState('')

  async function movieCall() {
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        })
      });

      let responseJson = await response.json()

      setResponse(responseJson)

      /*
      responseJson.movies.forEach( function (movieInfo)
      {
        console.log(movieInfo.title);
      });
      */

    }
     catch (e) {
        console.log(e)
      }
  }

    return(
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
        <Card>
            <Button title="Movie" onPress={() => movieCall()}/>
            <FlatList
             padding ={30}
             data={response.movies}
             keyExtractor={(item) => item.title }
             renderItem={({item}) =>
             <View style={{height: 50}}>
             <Text style={{height: 50}}>{item.title}</Text>
             <View style={{height: 1,backgroundColor:'gray'}}></View>
             </View>
            }
            />
        </Card>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  imagebackground: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});


export default MoviesScreen;
