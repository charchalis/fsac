/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './reducers/store';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import Home from './components/Home'
import ChatScreen from './components/ChatScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  
  useEffect(() => {
    StatusBar.setBackgroundColor("#091212");
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerStyle: { backgroundColor: "#888"}, headerTintColor: '#000'}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerStyle: {backgroundColor: '#555'}, headerTintColor: '#fff'}}/>
        </Stack.Navigator>  
      </NavigationContainer>
    </Provider>
  );
};

export default App;
