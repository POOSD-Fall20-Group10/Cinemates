import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    TextInput,
    Modal,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import Card from '../components/Card';

const GroupsScreen = ({ navigation }) => {

    const url = 'https://cine-mates.herokuapp.com/API/AddGroup'

    const [modalVisible, setModalVisible] = useState(false);

    const[id, setID] = useState('')
    const[token, setToken] = useState('')

    const[groupName, setGN] = useState('')
    const[groupDesc, setDC] = useState('')

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

    getItem()

    const createPayload = () => {

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
                        setModalVisible(!modalVisible);
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
    }
  });


export default GroupsScreen;
