import {View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Animated, Easing} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import {newMessage, isTyping} from '../reducers/friendListReducer'


import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";


import Message from './Message'
import socket from '../logic/socket'
import AnimatedDot from './AnimatedDot';
import { addMessageToChat } from '../reducers/chatroomsReducer';


const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const chatroomId = useSelector(state => state.onChatroom.chatroomId)
  const chatroom = useSelector(state => state.chatrooms.list).find(room => room.id === chatroomId);
  const friend = useSelector(state => state.friendList.list).find(friend  => friend.chatroom_id === chatroomId)

  const dispatch = useDispatch();

  const [newMessageText, setNewMessageText] = useState('')
  
  const [lastSeenMessageId, setLastSeenMessageId] = useState(-1)

  const [amTyping, setAmTyping] = useState(false)
  

  const flatListRef = useRef();

  const dealWithMessageButton = async () => {

    console.log("dealing with message")

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

    //TODO:
    // socket.on("friend seen", ({chatroomId, userId, smallestMessageId, biggestMessageId}) => {
    //   if(chatroomId !== friend.chatroomId) return 
    //   console.log("friend seen")
    //   //setMessages(messages)
    // })

    socket.on("backend received message successfully", messageId => {
      console.log("sent message successfully")
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

  /*
  useEffect(() => {

    if(!messages) return

    if(lastSeenMessageId === -1){

      const unseenMessages = messages.filter(
        msg => !msg.seen && msg.userId !== myUser.id
      );
      
      const smallestUnseenMessageId = unseenMessages.length > 0
        ? unseenMessages.reduce((min, cur) => (cur.id < min.id ? cur : min))
        : null;

      console.log(messages)
      console.log("smallest: " + smallestUnseenMessageId)
     
      if(smallestUnseenMessageId) setLastSeenMessageId(smallestUnseenMessageId - 1)
      else return
     
    }
    
    const biggestUnseenMessageId = messages[messages.length - 1].id
    console.log("BPH", messages[messages.length - 1])

    console.log("smallest: ", lastSeenMessageId)
    console.log("biggest: ", biggestUnseenMessageId)
    
    if(biggestUnseenMessageId > lastSeenMessageId){
 
      console.log("reporting seen messages")
      
      //report seen messages
      AsyncStorage.getItem('JWT_TOKEN').then( token => 
        socket.emit("seen new messages", {token, chatroomId: friend.chatroomId, friendId: friend.id, smallestMessageId: lastSeenMessageId, biggestMessageId: biggestUnseenMessageId}))
      setLastSeenMessageId(biggestUnseenMessageId)

    }

  }, [messages]);
*/

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
            <View style={{ minHeight: 50, padding: 7, borderRadius: 15, margin: 5, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: "#00f", flexDirection: 'row'}}>
              <AnimatedDot key={1} delay={0}    color='white'/>
              <AnimatedDot key={2} delay={200}  color='white'/>
              <AnimatedDot key={3} delay={400}  color='white'/>
            </View>
          : null}

          </ScrollView>

          

          <View style={{flexDirection: 'row', backgroundColor: "#555", paddingBottom: 5}}>
            <TextInput  onChangeText={setNewMessageText} value={newMessageText} style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', borderRadius: 10, margin: 5, padding: 5}}
              onPress={() => {dealWithMessageButton() }}>
              <Text style={{fontSize: 25}}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;