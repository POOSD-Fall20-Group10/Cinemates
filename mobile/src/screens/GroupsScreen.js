import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TextInput,
    Modal,
    ImageBackground,
    TouchableHighlight,
    FlatList,
    Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import Card from '../components/Card';
import IndividualGroupScreen from './IndividualGroupScreen';

const GroupsScreen = ({ navigation }) => {

    const url = 'https://cine-mates.herokuapp.com/API/AddGroup'
    const url2 = 'https://cine-mates.herokuapp.com/API/ListGroups'

    const [modalVisible, setModalVisible] = useState(false);

    const[id, setID] = useState('')
    const[token, setToken] = useState('')

    const[groupName, setGN] = useState('')
    const[groupDesc, setDC] = useState('')

    const[myerror, setErr] = useState('')
    const[response, setResponse] = useState('')

    async function getItem() {
      try {
        const value = await AsyncStorage.getItem('key');
        const obj = JSON.parse(value)

        setID(obj.id)
        setToken(obj.token)
      } catch (error) {
        console.log(error + "h")
      }
    }

    async function storeInfo(param) {
      try {
        await AsyncStorage.setItem('group', JSON.stringify(param))
      } catch(e) {
        console.log(e)
      }
    }

    getItem()

    const createPayload = () => {

      if(groupName == ''){
        setErr("Error: empty group name")
        return
      }

      var obj = {
        token: token,
        members: [
          {userID: id},
        ],
        name: groupName,
        description: groupDesc,
        messages: [],
      }

      var objstr = JSON.stringify(obj)

      doRegister(objstr)

    }


    async function doRegister(param) {
      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: param
        });

        let responseJson = await response.json()
        console.log(responseJson)
          if(responseJson.error ==''){
            setErr('')
            setModalVisible(!modalVisible);
          }
        }
       catch (e) {
          console.log(e)
        }
    }

    //group retrieval via get groups button
    async function getGroups() {
      try {
        let response = await fetch(url2, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            userID: id,
          })
        });

        let responseJson = await response.json()

        setResponse(responseJson)

        }
       catch (e) {
          console.log(e)
        }
    }

    //getGroups()

    return(
        <ImageBackground
        source={background}
        style={styles.imagebackground}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
            <View style={styles.modalView}>
                <Text>Group Name</Text>
                <TextInput style={styles.textInput} placeholder="Enter group name" onChangeText={(val) => setGN(val)} />
                <Text>Group Description</Text>
                <TextInput style={styles.textInput} placeholder="Enter group description" onChangeText={(val) => setDC(val)} />
                <Text>{myerror}</Text>
                <TouchableHighlight
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        createPayload();
                    }}
                >
                    <Text>Submit</Text>
                </TouchableHighlight>
            </View>
        </Modal>

        <TouchableHighlight
            style={styles.button}
            onPress={() => {
                setModalVisible(true);
            }}
        >
            <Text>Add new group</Text>
        </TouchableHighlight>
        <Card style={styles.inputContainer}>
            <Button title="Load groups" onPress={() => getGroups()}/>
            <FlatList
             padding ={25}
             data={response.groups}
             keyExtractor={(item) => item.name }
             renderItem={({item}) =>
             <View style={{height: 30}}>
                <Text onPress={() => {navigation.navigate(IndividualGroupScreen, {screen: 'IndividualGroupScreen'}); storeInfo(item);}}>{item.name}</Text>
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
    button: {
        backgroundColor: 'white',
        padding: 10,
        elevation: 2,
        borderColor: 'black'
    },
    inputContainer: {
        alignSelf: 'center',
        marginVertical: 120,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
  });


export default GroupsScreen;
