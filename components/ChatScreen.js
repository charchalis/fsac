import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import Message from './Message'
import socket from '../logic/socket'


const socketEnterChatroom = async (friend) => {
  
  const token = await AsyncStorage.getItem('JWT_TOKEN');

  socket.emit("entered private chatroom", {token, friend});
}

const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const friend = useSelector(state => state.onChatroom.friend)
  
  socketEnterChatroom(friend);
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const dispatch = useDispatch();

  const dealWithMessageButton = async () => {

    const token = await AsyncStorage.getItem('JWT_TOKEN');
    console.log("-------------------sending message------------------")
    console.log("token: ", token)
    console.log("message: ", newMessage)
    console.log("sender: ", myUser.id)
    console.log("receiver: ", friend.id)

    let message = {text: newMessage, senderId: myUser.id, receiverId: friend.id, seen: false, delivered: false, date: Date.now()}

    socket.emit("sent private message", {token, message})
    
    setMessages([...messages, message])
    console.log(messages.length)
  
  } 

  useEffect(() => {
    
    socket.on("take chatroomId", ({}))
    
    // add friend image to header
    navigation.setOptions({ 
      headerTitle: (props) =>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{ width: 45, height: 45 , backgroundColor: "#fff", borderRadius: 25, marginLeft: -10, marginRight: 10}}
                source={{uri: `data:image/jpeg;base64,${friend.image}`}}
              />
              <Text style={{fontSize: 23}}>{friend.username}</Text>
            </View>
    }); 
    
    return () => {dispatch(setOnChatroom(false))}

  }, []);

    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: "#091212"}}>

          <View style={{flex:1}}>
            {              
              messages.map((message, index) => (
                <Message key={index} message={message} mine={myUser.id === message.senderId}/>
              ))
            }
          </View>

          <View style={{flexDirection: 'row', backgroundColor: "#555", paddingBottom: 5}}>
            <TextInput  onChangeText={setNewMessage} style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', borderRadius: 10, margin: 5, padding: 5}}
              onPress={() => dealWithMessageButton()}>
              <Text style={{fontSize: 25}}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;