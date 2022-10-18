/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home'
import ChatBox from './components/ChatBox'
 
const Stack = createNativeStackNavigator();

const App = () => {
  
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Chatbox" component={ChatBox} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
};

export default App;
