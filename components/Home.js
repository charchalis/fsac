import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faEye, faPerson, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-async-storage/async-storage';



import { receiveFsac, newMessage, isTyping, acceptFsac } from '../reducers/friendListReducer';
import { addNotification} from '../reducers/tabNavigationReducer';



import AnimatedRingExample from './AnimatedRingExample'
import Settings from './Settings'
import FriendsNavigator from './FriendsNavigator'
import Fsacs from './Fsacs'
import Events from './Events'
import socket from '../logic/socket'
import { setChatrooms } from '../reducers/chatroomsReducer';


const activateSocket = (token) =>{
  
  console.log("activating socket")
  
}




const Tab = createBottomTabNavigator();

function Home({navigation}) {

  const [isFsacoso, setFsacoso] = useState(false);

  const notifications = useSelector(state => state.tabNavigation.notifications)
  
  const dispatch = useDispatch();

  const gimmeChatrooms = async () => {
  
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit("gimme chatrooms", token)
  }

  useEffect(() => {

    RNBootSplash.hide({fade: true});

    
    socket.on("untrusty socket", () => {
      Alert.alert("JWT token not valid", "you cheeky little bugger. Back to the login page you go", [{
          text: "I'm sorry I tried to hack you, daddy ;c",
          onPress: () => navigation.navigate('Login')
      }])

    })


    socket.on("papers please", async () => {

      console.log("Home.js: socket emition: papers please")
    
      const getToken = async () => await AsyncStorage.getItem('JWT_TOKEN');

      const token = await getToken()

      socket.emit("authenticate client socket", token)
        
    })
    
    socket.on("received fsac", (userId) => {
      
      console.log("Home.js: socket.emition: received fsac from ", userId)

      dispatch(addNotification({screen:'friends'}))

      //Alert.alert(userId, "wants to fsac", [{
        //text: "hurray",
        //onPress: () => null
      //}])
      
      dispatch(receiveFsac({friendId: userId}))

    })

    socket.on("received private message", ({userId, message}) => {
      

      console.log("Home.js: socket.emition: receiverd private message from ", userId)
      console.log("message: ", message)

      console.log("userid", userId)
      console.log("message", message)

      dispatch(newMessage({friendId: userId, message: message}))

      dispatch(addNotification({screen:'friends'}))

    })

    socket.on("accepted fsac", ({friendId, chatroomId}) => {
      

      console.log("Home.js: socket.emition: accepted fsac with ", friendId)
      
      dispatch(acceptFsac({friendId: userId, message: message}))
      dispatch(addNotification({screen:'friends'}))
      
    })

    socket.on("is typing", ({friendId, chatroomId, bool}) => {
      
      //TODO: logic for when its a group chat

      console.log(friendId, " is typing in ", chatroomId, ": ", bool)

      dispatch(isTyping({friendId, bool}))
      console.log("is typing over")
    
    })

    socket.on("take chatrooms", (chatrooms) => {
      console.log("received chatrooms")
      dispatch(setChatrooms(chatrooms))
    })

    gimmeChatrooms()
    
  },[])

  const onChatroom = useSelector(state => state.onChatroom.onChatroom)
  
  useEffect(() => {
    if(onChatroom){
      console.log("navigating to chatscreen")
      navigation.navigate('ChatScreen')
    }
  }, [onChatroom]);


  
  


  return (
    <View style={{flex: 1, backgroundColor: "#091212"}}>
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        
        alignItems: 'center',
        justifyContent: 'center',

        margin: 2,
        borderRadius: 15,
        height: 100,
        backgroundColor: "#091212",
        borderWidth: 2,
        borderTopWidth: 2,
        borderColor: "#56b643",
        borderTopColor: "#56b643"
        //,position: "absolute"
      },
      tabBarActiveTintColor: '#56b643',
    }}>



      

      <Tab.Screen name="friends" component={FriendsNavigator}
      options={{
        tabBarBadge: notifications.friends , 
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faPerson} color={color} size={size} />
      }}/>



      <Tab.Screen name="fsacs"
        component={Fsacs}
        options={{
          tabBarBadge: notifications.fsacs, 
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faEye} color={color} size={size} />
      }}/>



      <Tab.Screen name="FSAC" component={"does not matter"} 
        listeners={{tabPress: e => e.preventDefault()}}
        options={{
          headerShown: false,
          tabBarButton: () => <FsacButton isFsacoso={isFsacoso} setFsacoso={setFsacoso}/>
      }}/>



      <Tab.Screen name="events"
      component={Events}
      options={{
        tabBarBadge: notifications.events, 
        headerShown: false, 
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faHouse} color={color} size={size}/>
      }} />



      <Tab.Screen name="settings" component={Settings}
      options={{
        tabBarBadge: notifications.settings, 
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faGear} color={color} size={size}/>
      }}/>



    </Tab.Navigator>
    </View>
  );
}

const FsacButton = (props) =>
      <View style={{alignSelf: 'center', borderRadius: 30, borderColor: "#56b643", borderWidth: 2, backgroundColor: "#fff", width: 60, height: 60}}>
    {/*
      <View style={{borderRadius: 25, borderColor: "#56b643", borderWidth: 2, top: "-3%", backgroundColor: "#091212", width: 50, height: 50}}>
      <View style={{borderRadius: 50, borderColor: "#56b643", borderWidth: 2, top: "-14%", backgroundColor: "#091212", width: 100, height: 100}}>
    */}
        <TouchableOpacity 
        style={{flex: 1, flexDirection: "column",  justifyContent: "center", alignItems: "center", padding: "6%", borderRadius: 100, borderWidth: 2, backgroundColor: "#56b643"}}
        onPress={()=> {props.setFsacoso(!props.isFsacoso)}}  >    
          {              
            props.isFsacoso ? 
            <AnimatedRingExample/>
            :
            <Text style={{fontSize: 20, color:"#091212", fontWeight: "600", fontStyle: "italic"}}>fsac</Text>     
          }       
        </TouchableOpacity> 
    </View> 

export default Home;