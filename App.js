/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye, faPerson, faHouse, faGear, faRadar
} from "@fortawesome/free-solid-svg-icons";

import {PulseAnimation} from 'react-native-animated-pulse';

function HomeScreen({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        margin: "2%",
        paddingBottom: "5%",
        borderRadius: 15,
        height: "10%",
        backgroundColor: "#091212"
      },
      tabBarActiveTintColor: '#56b643'
    }}>
      <Tab.Screen name="events"
      component={EventsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faHouse} color={color} size={size}/>
      }} />
      <Tab.Screen name="fsacs"
        component={FsacsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faEye} color={color} size={size}/>
      }}/>
      <Tab.Screen name="FSAC" component={FsacsScreen}
        listeners={{tabPress: e => e.preventDefault()}}
        options={{
          headerShown: false,
          tabBarButton: () =>
            <View style={{borderRadius: 100, borderColor: "#091212", borderWidth: 2, top: "-5%", backgroundColor: "#091212", minWidth: "20%"}}>
              <PulseAnimation color={'#bbb'} numPulses={3} diameter={400} speed={20} duration={2000} />
              <TouchableOpacity 
                style={{flex: 1, flexDirection: "column",  justifyContent: "center", alignItems: "center", padding: "6%", borderRadius: 100, borderWidth: 2, backgroundColor: "#56b643"}}
                onPress={()=> Alert.alert("you are fsacatings")}>
                  <Text style={{fontSize: 20, color:"#091212"}}>fsac</Text>
              </TouchableOpacity>
            </View>
            
      }}/>
      <Tab.Screen name="friends" component={FriendsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faPerson} color={color} size={size} />
      }}/>
      <Tab.Screen name="settings" component={SettingsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faGear} color={color} size={size}/>
      }}/>
    </Tab.Navigator>
  );
}

function ChatBoxScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: "#000"}}>Chatbox Screen</Text>
    </View>
  );
}

function EventsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: "#000"}}>events Screen</Text>
      <Button
        title="Go to chatbox"
        onPress={() => navigation.push('Chatbox')}
      />
    </View>
  );
}

function FsacsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: "#000"}}>fsacs Screen</Text>
    </View>
  );
}

function FriendsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: "#000"}}>friends Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: "#000"}}>settings Screen</Text>
    </View>
  );
}

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  
  

  return (
    <View style={{flex:1, background: "#fff"}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chatbox" component={ChatBoxScreen} />
      </Stack.Navigator>
      
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
