import {View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Animated, Easing} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import {newMessage, isTyping} from '../reducers/friendListReducer'


import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";


import Message from './Message'
import socket from '../logic/socket'
import { addMessageToChat } from '../reducers/chatroomsReducer';
import BouncingDots from './BouncingDots';
import { useIsFocused } from '@react-navigation/native';



const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const chatroomId = useSelector(state => state.onChatroom.chatroomId)
  const chatroom = useSelector(state => state.chatrooms.list).find(room => room.id === chatroomId);
  const friend = useSelector(state => state.friendList.list).find(friend  => friend.chatroom_id === chatroomId)

  const dispatch = useDispatch();

  const [newMessageText, setNewMessageText] = useState('')

  const [amTyping, setAmTyping] = useState(false)

  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused){
      const notMineMessages = (chatroom.messages || []).filter(message => message.userId !== myUser.id )
      if(notMineMessages.length > 0 && !notMineMessages[notMineMessages.length - 1].seen){
        reportSeenMessages()
        chatroom.messages.filter(m => !m.seen && m.userId !== myUser.id).forEach(m => m.seen = true)
      }
    }
  }, [focused]) 
  

  const flatListRef = useRef();

  const reportSeenMessages = async () => {
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit('seen new messages', {token , chatroomId, seenDate: Date.now(), friendId: friend.id})
  }

  const dealWithMessageButton = async () => {

    if(newMessageText === '') return

    const token = await AsyncStorage.getItem('JWT_TOKEN');
    console.log("-------------------sending message------------------")
    console.log("token: ", token)
    console.log("message: ", newMessageText)
    console.log("sender: ", myUser.id)
    console.log("receiver: ", friend.id)

    const message = {text: newMessageText, userId: myUser.id, receiverId: friend.id, chatroomId: chatroomId, seen: false, delivered: false, date: Date.now()}

    console.log(message)

    socket.emit("sent message", {token, message})

    dispatch(addMessageToChat({chatroomId, message}))
    
    setNewMessageText('')

    console.log(message)

  
  } 


  useEffect(() => {

    socket.on("received message", async ({message}) => {
      
      console.log("Chatscreen.js: socket.emition: receiverd private message from ", message.userId)
      console.log("message: ", message)

      if(focused){
        socket.emit('seen new messages', {
          token: await AsyncStorage.getItem('JWT_TOKEN'),
          chatroomId: message.chatroomId,
          seenDate: Date.now(),
          friendId: message.userId
        })
      }
    })

    
    // add friend image to header
    navigation.setOptions({ 
      headerTitle: (props) =>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image
                style={{ width: 45, height: 45 , backgroundColor: "#fff", borderRadius: 25, marginLeft: -10, marginRight: 10}}
                source={{uri: `data:image/jpeg;base64,${friend.image}`}}
              />
              <Text style={{fontSize: 23}}>{friend.username}</Text>
            </View>,

      
      headerRight: () => <TouchableOpacity><FontAwesomeIcon icon={faBars} color={"#fff"} size={30} /></TouchableOpacity>
    }); 

        
    return () => {
      dispatch(setOnChatroom(false));
      AsyncStorage.getItem('JWT_TOKEN').then( token => socket.emit("am typing", {token, chatroomId: chatroomId, friendId: friend.id, bool: false}))
    }

  }, []);

  
  useEffect(() => {
    setAmTyping(newMessageText != '')
  }, [newMessageText])

  useEffect(() => {
    AsyncStorage.getItem('JWT_TOKEN').then( token => 
      socket.emit("am typing", {token, chatroomId: chatroomId, friendId: friend.id, bool: amTyping}))
  }, [amTyping])


    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: "#091212"}}>

          <ScrollView ref={flatListRef} style={{flex:1}}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}>

          
            {chatroom.messages ? chatroom.messages.map((message, index) =>
                <Message message={message} key={index} mine={myUser.id === message.userId}/>
            ) : null}

          {friend.typing ?
            <View style={{ minHeight: 40, padding: 7, paddingTop: 3, paddingBottom: 3, borderRadius: 15, margin: 5, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: "#00f", flexDirection: 'row'}}>
              <BouncingDots color={'#fff'}/>
            </View>
          : null}

          </ScrollView>

          

          <View style={{flexDirection: 'row', backgroundColor: "#555"}}>
            <TextInput  onChangeText={setNewMessageText} value={newMessageText} style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 5, padding: 10}}
              onPress={() => {dealWithMessageButton() }}>
              <FontAwesomeIcon icon={faEnvelope} color={'#ffffffaa'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;