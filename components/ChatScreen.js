import {View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Animated, Easing} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";


import Message from './Message'
import socket from '../logic/socket'
import AnimatedDot from './AnimatedDot';


const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const friendId = useSelector(state => state.onChatroom.friendId)
  const friend = useSelector(state => state.friendList.list).find(friend  => friend.id === friendId)

  const dispatch = useDispatch();

  
  //const [messages, setMessages] = useState(friend.messages)
  //const [messages, setMessages] = useState([])

  const messages = friend.messages

  const [newMessageText, setNewMessageText] = useState('')
  
  const [lastSeenMessageId, setLastSeenMessageId] = useState(-1)

  const [isTyping, setIsTyping] = useState(false)
  const [amTyping, setAmTyping] = useState(false)
  

  

  const flatListRef = useRef();

  const dealWithMessageButton = async () => {

    const token = await AsyncStorage.getItem('JWT_TOKEN');
    console.log("-------------------sending message------------------")
    console.log("token: ", token)
    console.log("message: ", newMessageText)
    console.log("sender: ", myUser.id)
    console.log("receiver: ", friend.id)

    const message = {text: newMessageText, userId: myUser.id, receiverId: friend.id, chatroomId: friend.chatroomId, seen: false, delivered: false, date: Date.now()}

    console.log(message)

    //socket.emit("sent private message", {token, message})
    
    setNewMessageText('')

    dispatch(newMessage({friendId: myUser.id, message: message}))
    console.log(message)

  
  } 

  useEffect(() => {

    console.log("friend.chatroomId",friend.chatroomId)

    
    //fetch messages
    AsyncStorage.getItem('JWT_TOKEN').then( token => 
      socket.emit('gimme messages', {token, chatroomId: friend.chatroomId}) )

    socket.on("take messages", messages => {
      console.log("received messages")
      //setMessages(messages)
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
    setAmTyping(newMessageText != '')
  }, [newMessageText])

  useEffect(() => {
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
            
          {friend.typing ? <Text style={{flex: 1, backgroundColor: "#00f"}}>typing</Text> : null}
          {console.log("FRIEND IS TYPING: ",isTyping)}
          <Message message={{text: "typing", date: -1}} key={-1} mine={false}/>
          
          <View style={{ minHeight: 50, padding: 7, borderRadius: 15, margin: 5, alignSelf: 'flex-start', alignItems: 'center', backgroundColor: "#00f", flexDirection: 'row'}}>
            <AnimatedDot key={1} delay={0}/>
            <AnimatedDot key={2} delay={200}/>
            <AnimatedDot key={3} delay={400}/>
            
          </View>

          <Message message={{text: "typing", date: -1}} key={-2} mine={false}/>

          </ScrollView>

          

          <View style={{flexDirection: 'row', backgroundColor: "#555", paddingBottom: 5}}>
            <TextInput  onChangeText={setNewMessageText} value={newMessageText} style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', borderRadius: 10, margin: 5, padding: 5}}
              onPress={() => {dealWithMessageButton(); }}>
              <Text style={{fontSize: 25}}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;