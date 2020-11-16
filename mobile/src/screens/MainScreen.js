import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    Button,
    TextInput,
    Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Background from '../components/Background';
import Card from '../components/Card';

const MainScreen = ({ navigation }) => {
    return (
        <Background>
            <View style={styles.screen}>
                <Card style={styles.inputContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
                        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
                        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
                        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
                        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
                    </View>
                </Card>
                <Card style={styles.inputContainer}>

                </Card>
                <Card style={styles.inputContainer}>

                </Card>
            </View>
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
        alignSelf: 'stretch'
        
    }
});

export default MainScreen;