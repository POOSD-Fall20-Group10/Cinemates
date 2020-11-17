import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const RegisterScreen = ({ navigation }) => {

  const[fname, setfname] = useState('')
  const[lname, setlname] = useState('')
  const[username, setusername] = useState('')
  const[email, setemail] = useState('')
  const[password, setpassword] = useState('')
  const[password2, setpassword2] = useState('')
  const url = 'https://cine-mates.herokuapp.com/API/AddUser'

const doRegister = () => {
  //set variables
  setfname('')
  setlname('')
  setusername('')
  setemail('')
  setpassword('')
  setpassword2('')

  //json object construction
  var obj = {
    firstName: fname,
    lastName: lname,
    login: username,
    email: email,
    password: password,
    password2: password2,
  };

  var objstr = JSON.stringify(obj)

    Alert.alert(objstr)
}



    return (
        <Background>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? "height" : "padding"}
                    style={{ flex : 1 }}
                >
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <View style={{justifyContent: 'space-between', }}>
                <Card style={styles.inputContainer}>

                    <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(val) => setfname(val)}/>
                    <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(val) => setlname(val)}/>
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={(val) => setusername(val)}/>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={(val) => setemail(val)}/>
                    <TextInput style={styles.textInput} placeholder="Password" onChangeText={(val) => setpassword(val)}/>
                    <TextInput style={styles.textInput} placeholder="Confirm Password" onChangeText={(val) => setpassword2(val)}/>
                    <Button title="Register" onPress={() => doRegister()}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Already have an account?</Text>
                        <Button
                            title="Login"
                            onPress={() =>
                                navigation.reset ({
                                index: 0,
                                routes: [{name: 'Login'}]
                            })}/>
                    </View>
                </Card>
                </View>
            </View>
                    </KeyboardAvoidingView>
        </Background>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        alignSelf: 'center',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    textInput: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 39,
        alignItems: 'center',
        marginVertical: 3
    }
});

export default RegisterScreen;
