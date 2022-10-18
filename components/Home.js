import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';


import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye, faPerson, faHouse, faGear
} from "@fortawesome/free-solid-svg-icons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RNBootSplash from "react-native-bootsplash";

import AnimatedRingExample from './AnimatedRingExample'
import Settings from './Settings'
import Friends from './Friends'
import Fsacs from './Fsacs'
import Events from './Events'

 




const Tab = createBottomTabNavigator();

function Home({navigation}) {

  const [isFsacoso, setFsacoso] = useState(false);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);


  return (
    <View style={{flex: 1, backgroundColor: "#091212"}}>
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        
        margin: "2%",
        
        paddingBottom: "5%",
        borderRadius: 15,
        height: "10%",
        backgroundColor: "#091212",
        borderWidth: 2,
        borderTopWidth: 2,
        borderColor: "#56b643",
        borderTopColor: "#56b643",
        position: "absolute"
      },
      tabBarActiveTintColor: '#56b643',
    }}>



      <Tab.Screen name="events"
      component={Events}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faHouse} color={color} size={size}/>
      }} />



      <Tab.Screen name="fsacs"
        component={Fsacs}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faEye} color={color} size={size}/>
      }}/>



      <Tab.Screen name="FSAC" component={Fsacs}
        listeners={{tabPress: e => e.preventDefault()}}
        options={{
          headerShown: false,
          tabBarButton: () => <FsacButton isFsacoso={isFsacoso} setFsacoso={setFsacoso}/>
      }}/>



      <Tab.Screen name="friends" component={Friends}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faPerson} color={color} size={size} />
      }}/>



      <Tab.Screen name="settings" component={Settings}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faGear} color={color} size={size}/>
      }}/>



    </Tab.Navigator>
    </View>
  );
}

const FsacButton = (props) =>
    <View style={{borderRadius: 50, borderColor: "#56b643", borderWidth: 2, top: "-14%", backgroundColor: "#091212", width: 100, height: 100}}>
        <TouchableOpacity 
        style={{padding: 10, flex: 1, flexDirection: "column",  justifyContent: "center", alignItems: "center", padding: "6%", borderRadius: 100, borderWidth: 2, backgroundColor: "#56b643"}}
        onPress={()=> {props.setFsacoso(!props.isFsacoso)}}>    
          {              
            props.isFsacoso ? 
            <AnimatedRingExample/>
            :
            <Text style={{fontSize: 25, color:"#091212", fontWeight: "600", fontStyle: "italic"}}>fsac</Text>     
          }       
        </TouchableOpacity> 
    </View> 

export default Home;