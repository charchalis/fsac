import React, {useEffect, useState, useRef} from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faEye, faPerson, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-async-storage/async-storage';

import authenticate from '../logic/authenticate';
import { setUser } from '../reducers/myUserReducer'

import { showPersistentNotification, cancelPersistentNotification } from '../utils/notificationService';

import { receiveFsac, setFriendList, isTyping, acceptFsac, notFsacosoAnymore } from '../reducers/friendListReducer';
import { addNotification} from '../reducers/tabNavigationReducer';



import AnimatedRingExample from './AnimatedRingExample'
import Settings from './Settings'
import FriendsNavigator from './FriendsNavigator'
import FsacsScreen from './FsacsScreen'
import Events from './Events'
import socket from '../logic/socket'
import { addMessageToChat, setChatrooms, markMessagesAsSeen, markMessageAsDelivered } from '../reducers/chatroomsReducer';


const activateSocket = (token) =>{
  
  console.log("activating socket")
  
}




const Tab = createBottomTabNavigator();

function Home({navigation}) {

  const [isFsacoso, setFsacoso] = useState(false);

  const userId = useSelector((state) => state.myUser.user).id

  const notifications = useSelector(state => state.tabNavigation.notifications)

  const fsacFriendList = useSelector((state) => state.friendList.list) //TODO: right now all friends get notified.
                                                                    //should be just the ones defined in the settings
  
  const onChatroom = useSelector(state => state.onChatroom.onChatroom)
  const onChatroomId = useSelector(state => state.onChatroom.chatroomId)
  const onChatroomRef = useRef(onChatroom);
  const onChatroomIdRef = useRef(onChatroomId);
                                                                    

  const toggleFsacoso = async (nextState) => {
    const newState = nextState ?? !isFsacoso;
    setFsacoso(newState);
  
    const token = await AsyncStorage.getItem('JWT_TOKEN');
  
    if (newState) {
      fsacFriendList.forEach(friend =>
        socket.emit('fsac?', { token, userId, friendId: friend.id })
      );
      showPersistentNotification();
    } else {
      socket.emit('not fsacoso anymore', { token });
      cancelPersistentNotification();
    }
  };

  const FsacButton = (props) =>
      <View style={{alignSelf: 'center', borderRadius: 30, borderColor: "#56b643", borderWidth: 2, width: 60, height: 60}}>
    
        <TouchableOpacity 
        style={{flex: 1, flexDirection: "column",  justifyContent: "center", alignItems: "center", padding: "6%", borderRadius: 100, borderWidth: 2, borderColor: '#091212', backgroundColor: '#56b643'}}
        onPress={() => toggleFsacoso()}>    
          {              
            props.isFsacoso ? 
            <AnimatedRingExample/>
            :
            <Text style={{fontSize: 20, color:"#091212", fontWeight: "600", fontStyle: "italic"}}>fsac</Text>     
          }       
        </TouchableOpacity> 
    </View> 
  
  const dispatch = useDispatch();

  const gimmeChatrooms = async () => {
  
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit("gimme chatrooms", token)
  }

  const gimmeFriends = async () => {
  
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit("gimme friends", token)
  }

  const amIFsacoso = async () => {
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit("am I fsacoso?", token)  
  }

  const authentication = async () => {

    try {
        const token = await AsyncStorage.getItem('JWT_TOKEN');
        if (token !== null) {
            console.log('Login.js: Found token; Authenticating...');
            console.log("token: ", token)
            const authentication = await authenticate(token)
            
            if(authentication.success){
              dispatch(setUser(authentication.user))
              RNBootSplash.hide({fade: true});
            }else navigation.navigate('Login');


        } else {
            console.log('Token does not exist.');
            navigation.navigate('Login');
        }
    }catch (error) {
        console.log('Error retrieving data: ', error);
        navigation.navigate('Login');
    }
  }

  useEffect(() => {

    //AsyncStorage.clear()

    
    
    authentication()

    gimmeFriends();
    gimmeChatrooms();
    amIFsacoso();
    
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

    socket.on("take friend list", (friends) => {
      console.log("FriendListScreen.js: socket.emition: take friend list")
      dispatch(setFriendList(friends))
    })
    
    socket.on("received fsac", (userId) => {
      
      console.log("Home.js: socket.emition: received fsac from ", userId)

      dispatch(addNotification({screen:'fsacs'}))

      //Alert.alert(userId, "wants to fsac", [{
        //text: "hurray",
        //onPress: () => null
      //}])
      
      dispatch(receiveFsac({friendId: userId}))

    })

    socket.on("received message", async ({message}) => {
      
      console.log("Home.js: socket.emition: receiverd private message from ", message.userId)
      console.log("message: ", message)

      dispatch(addMessageToChat({chatroomId: message.chatroomId, message: message}))

      dispatch(addNotification({screen:'friends'}))

      // if(onChatroomRef.current && onChatroomIdRef.current === message.chatroomId){
      //   socket.emit('seen new messages', {
      //     token: await AsyncStorage.getItem('JWT_TOKEN'),
      //     chatroomId: message.chatroomId,
      //     seenDate: Date.now(),
      //     friendId: message.userId
      //   })
      // }
    })

    console.log('\n\n\n\nRETRIGGERED\n\n\n\n')

    socket.on("you are fsacoso", bool => {
      setFsacoso(bool)
      bool ? showPersistentNotification() : cancelPersistentNotification()
    })

    socket.on("accepted fsac", ({friendId, chatroomId}) => {
      

      console.log("Home.js: socket.emition: accepted fsac with ", friendId)
      
      dispatch(acceptFsac({friendId: userId, message: message}))
      dispatch(addNotification({screen:'fsacs'}))
      
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

    socket.on("friend not fsacoso anymore", (friend) => {
      const friendId = friend.friendId
      console.log("friend not fsacoso anymore: " + friendId)
      console.log(friendId)
      dispatch(notFsacosoAnymore(friendId))
    })

    socket.on("friend seen", ({chatroomId, userId, seenDate}) => {
      console.log('friend seen')
      dispatch(markMessagesAsSeen({chatroomId, userId, seenDate}))
      
    })

    socket.on("backend received message successfully", async message => {
      console.log("sent message successfully")
      dispatch(markMessageAsDelivered(message))
    })

    //this is for controlling the fsac button through the notification
    global.toggleFsacosoFromNotification = (state) => toggleFsacoso(state);
    return () => {
      global.toggleFsacosoFromNotification = undefined;
    };
    
  },[])


  useEffect(() => {
    onChatroomRef.current = onChatroom;
    if(onChatroom){
      console.log("navigating to chatscreen")
      navigation.navigate('ChatScreen')
    }
  }, [onChatroom]);

  useEffect(() => {
    onChatroomIdRef.current = onChatroomId;
  }, [onChatroomId]);
  
  


  return (
    <View style={{flex: 1, backgroundColor: "#091212"}}>
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
  
        margin: 2,
        height: 80,
        backgroundColor: "#091212",
        borderRadius: 15,
        borderWidth: 2,
        borderTopWidth: 2,
        borderColor: "#222",
        borderTopColor: "#222"
        //,position: "absolute"
      },

      tabBarLabelStyle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
      },

      tabBarIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      },
      tabBarInactiveTintColor: '#333',
      tabBarActiveTintColor: '#363'
    }}>


      <Tab.Screen name="fsacs"
        component={FsacsScreen}
        options={{
          tabBarBadge: notifications.fsacs, 
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faEye} color={color} size={size} />
      }}/>
      

      <Tab.Screen name="friends" component={FriendsNavigator}
      options={{
        tabBarBadge: notifications.friends , 
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          <FontAwesomeIcon icon={faPerson} color={color} size={size} />
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




export default Home;