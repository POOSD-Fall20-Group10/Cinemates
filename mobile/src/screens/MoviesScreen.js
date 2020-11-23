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
    FlatList,
    Modal,
    TouchableHighlight
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const MoviesScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/GetMovies'
  const base ='https://image.tmdb.org/t/p/w500'
  const[response, setResponse] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [score, setScore] = useState('')

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

  movieCall()

    return(
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
        <Card style={styles.inputContainer}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
        <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 7}}>{title}</Text>
            <Text style={{fontWeight: 'bold'}}>Description</Text>
            <Text style={{textAlign: 'center', padding: 7}}>{desc}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Release Date:  </Text>
              <Text>{date}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 7}}>
              <Text style={{fontWeight: 'bold'}}>IMDB score:  </Text>
              <Text>{score}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableHighlight
                  style={{backgroundColor: 'green', marginHorizontal: 20 , width: 50, alignItems: 'center'}}
                  onPress={() => {
                      setModalVisible(!modalVisible);
                      setDesc('')
                  }}
              >
                  <Text style={{color: 'white'}}>Yes</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={{backgroundColor: 'red', marginHorizontal: 20, width: 50, alignItems: 'center'}}
                  onPress={() => {
                      setModalVisible(!modalVisible);
                      setDesc('')
                  }}
              >
                  <Text style={{color: 'white'}}>No</Text>
              </TouchableHighlight>
            </View>
        </View>
    </Modal>
            <FlatList
             padding ={30}
             data={response.movies}
             keyExtractor={(item) => item.id.toString() }
             initialNumToRender={10}
             renderItem={({item}) =>
               <View style={{height: 180, justifyContent: 'center'}}>
                 <Text onPress={() =>
                   {setDesc(item.overview); setTitle(item.title); setDate(item.release_date); setScore(item.vote_average); setModalVisible(!modalVisible);}} style={{height: 25}, {textAlign: 'right'}}>{item.title}</Text>
                 <Image
                 style={{width: 90, height: 130}}
                 source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}
                 />
                 <View style={{height: 2, backgroundColor:'black', marginTop: 8}}></View>
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
  },
  inputContainer: {
    alignSelf: 'center',
    marginVertical: 120,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
textInput: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 39,
    alignItems: 'center',
    marginVertical: 3
},
});


export default MoviesScreen;
