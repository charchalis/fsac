import {View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";


import Message from './Message'
import socket from '../logic/socket'


const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const friend = useSelector(state => state.onChatroom.friend)
  
  const [messages, setMessages] = useState(friend.messages)

  const [newMessage, setNewMessage] = useState('')
  
  const [lastSeenMessageId, setLastSeenMessageId] = useState(-1)

  const [isTyping, setIsTyping] = useState(false)
  const [amTyping, setAmTyping] = useState(false)
  

  const dispatch = useDispatch();

  const flatListRef = useRef();

  const dealWithMessageButton = async () => {

    const token = await AsyncStorage.getItem('JWT_TOKEN');
    console.log("-------------------sending message------------------")
    console.log("token: ", token)
    console.log("message: ", newMessage)
    console.log("sender: ", myUser.id)
    console.log("receiver: ", friend.id)

    let message = {text: newMessage, userId: myUser.id, receiverId: friend.id, chatroomId: friend.chatroomId, seen: false, delivered: false, date: Date.now()}

    socket.emit("sent private message", {token, message})
    
    setMessages([...messages, message])
    setNewMessage('')
    console.log(messages.length)
  
  } 

  useEffect(() => {

    console.log("friend.chatroomId",friend.chatroomId)

    
    //fetch messages
    AsyncStorage.getItem('JWT_TOKEN').then( token => 
      socket.emit('gimme messages', {token, chatroomId: friend.chatroomId}) )

    socket.on("take messages", messages => {
      console.log("received messages")
      setMessages(messages)
    })

    socket.on("is typing", ({friendId, chatroomId, bool}) => {
      
      //TODO: logic for when its a group chat

      console.log(friendId, " is typing in ", chatroomId, ": ", bool)

      //dispatch(isTyping({friendId, bool}))
    
      setIsTyping(bool)

    })

    

    //socket.on("friend seen", {chatroomId})
    
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
      AsyncStorage.getItem('JWT_TOKEN').then( token => socket.emit("am typing", {token, chatroomId: friend.chatroomId, friendId: friend.id, bool: false}))
    }

  }, []);

  useEffect(() => {

    if(!messages) return
    // if(lastSeenMessageId === messages[messages.length - 1].id) 

    // if(lastSeenMessageId === -1){

    //   const smallestUnseenMessageId = messages.reduce((min, cur) => {
    //     if(cur.id < min.id && !cur.seen && cur.userId != myUser.id) return cur
    //     return min
    //   }, messages[0])
     
    //   if(smallestUnseenMessageId) setLastSeenMessageId(smallestUnseenMessageId.id - 1)
     
    // }
    
    // const biggestUnseenMessageId = messages[messages.length - 1].id
    // console.log("BPH", biggestUnseenMessageId)

    // console.log("smallest: ", lastSeenMessageId)
    // console.log("biggest: ", biggestUnseenMessageId)
    
    // if(biggestUnseenMessageId > lastSeenMessageId){
 
    //   console.log("reporting seen messages")
      
    //   //report seen messages
    //   AsyncStorage.getItem('JWT_TOKEN').then( token => 
    //     socket.emit("seen new messages", {token, chatroomId: friend.chatroomId, friendId: friend.id, smallestMessageId: lastSeenMessageId, biggestMessageId: biggestUnseenMessageId}))

    //   setMessages(messages.map(message => {
    //     if(message.id > lastSeenMessageId && message.userId != myUser.id)
    //       message.seen = 1 
    //     return message
    //     }))
    //   console.log("upupupupup", JSON.stringify(messages,null,2))
    //   setLastSeenMessageId(biggestUnseenMessageId)

    // }

  }, [messages]);

  useEffect(() => {
    setAmTyping(newMessage != '')
  }, [newMessage])

  useEffect(() => {
    console.log("amTyping: ", amTyping)
    AsyncStorage.getItem('JWT_TOKEN').then( token => 
      socket.emit("am typing", {token, chatroomId: friend.chatroomId, friendId: friend.id, bool: amTyping}))
  }, [amTyping])


    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: "#091212"}}>

          <ScrollView ref={flatListRef} style={{flex:1}}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}>

          
            {messages ? messages.map((message, index) =>
                <Message message={message} key={index} mine={myUser.id === message.userId}/>
            ) : null}
            

          </ScrollView>

          {isTyping ? <Text style={{flex: 1, backgroundColor: "#00f"}}>typing</Text> : null}
          {console.log("FRIEND IS TYPING: ",isTyping)}

          <View style={{flexDirection: 'row', backgroundColor: "#555", paddingBottom: 5}}>
            <TextInput  onChangeText={setNewMessage} value={newMessage} style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', borderRadius: 10, margin: 5, padding: 5}}
              onPress={() => {dealWithMessageButton(); }}>
              <Text style={{fontSize: 25}}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;