import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    Modal,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const GroupsScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
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
                    <TextInput style={styles.textInput} placeholder="Enter group name" onChangeText={(val) => setName(val)} />
                    <Text>Group Description</Text>
                    <TextInput style={styles.textInput} placeholder="Enter group description" onChangeText={(val) => setName(val)} />
                    <TouchableHighlight
                        onPress={() => {
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
