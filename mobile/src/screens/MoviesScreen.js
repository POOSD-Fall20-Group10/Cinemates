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
  const likedlink = 'https://cine-mates.herokuapp.com/API/AddMovieToAllLists'

  const[response, setResponse] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [score, setScore] = useState('')
  const [liked, setLiked] = useState('')

  const [userID, setUserID] = useState('')
  const [token, setToken] = useState('')

  const [movieObj, setObj] = useState('')

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

  async function userInfo() {
    try {
      const value = await AsyncStorage.getItem('key');
      const obj = JSON.parse(value)

      setUserID(obj.id)
      setToken(obj.token)

    } catch (error) {
      console.log(error)
    }
  }

  async function robertMagic() {
    try {
      let response = await fetch(likedlink, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          userID: userID,
          movieID: movieObj,
          liked: liked
        })
      });

      let responseJson = await response.json()
      console.log(responseJson)

      }
     catch (e) {
        console.log(e)
      }
  }

  movieCall()
  userInfo()

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
                setModalVisible(!modalVisible);
            }}
        >
        <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 7}}>{movieObj.title}</Text>
            <Text style={{fontWeight: 'bold'}}>Description</Text>
            <Text style={{textAlign: 'center', padding: 7}}>{movieObj.overview}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Release Date:  </Text>
              <Text>{movieObj.release_date}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 7}}>
              <Text style={{fontWeight: 'bold'}}>IMDB score:  </Text>
              <Text>{movieObj.vote_average}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableHighlight
                  style={{backgroundColor: 'green', marginHorizontal: 20 , width: 50, alignItems: 'center'}}
                  onPress={() => {
                      setLiked('true')
                      robertMagic()
                      setModalVisible(!modalVisible);

                  }}
              >
                  <Text style={{color: 'white'}}>Yes</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={{backgroundColor: 'red', marginHorizontal: 20, width: 50, alignItems: 'center'}}
                  onPress={() => {
                      setLiked('false')
                      robertMagic()
                      setModalVisible(!modalVisible);

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
                   {setObj(item); setModalVisible(!modalVisible);}} style={{height: 25}, {textAlign: 'right'}}>{item.title}</Text>
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
