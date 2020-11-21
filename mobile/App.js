import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import AccountScreen from './src/screens/AccountScreen';

const CinematesStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation }) => {
  return (
      <Drawer.Navigator initialRouteName="Movies" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => navigation.reset ({
            index: 0,
            routes: [{name: 'Login'}]
            })} />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen 
          name = "Movies"
          component = { MoviesScreen }
        />

        <Drawer.Screen 
          name = "Groups"
          component = { GroupsScreen }
        />

        <Drawer.Screen 
          name = "Account"
          component = { AccountScreen }
        />

        
      </Drawer.Navigator>
  );
} 

export default function App() {
  return (
    <NavigationContainer>
      <CinematesStack.Navigator>

        <CinematesStack.Screen
          name = "Login"
          component = { LoginScreen }
          options = {{ headerShown: false }}
        />

        <CinematesStack.Screen
          name = "Register"
          component = { RegisterScreen }
          options = {{  headerShown: false }}
        />

        <CinematesStack.Screen
            name = "Main"
            component = { MainScreen }
            options = {{  headerShown: false }}
        />
        
      </CinematesStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
