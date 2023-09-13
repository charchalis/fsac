import {View, Text, TextInput, Image, TouchableOpacity, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import Message from './Message'
import socket from '../logic/socket'


const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const friend = useSelector(state => state.onChatroom.friend)
  
  const [messages, setMessages] = useState([])

  const [newMessage, setNewMessage] = useState('')

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

    //fetch messages
    AsyncStorage.getItem('JWT_TOKEN').then( token => 
      socket.emit('gimme messages', {token, chatroomId: friend.chatroomId}) )

    socket.on("take messages", messages => {
      console.log("received messages")
      console.log(messages)
      setMessages(messages)
    })
    
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

            <FlatList ref={flatListRef}
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Message message={item} mine={myUser.id === item.userId}/>
              )}
              onContentSizeChange={() => flatListRef.current.scrollToEnd()} // Scroll to end on content size change
            />

            

          </View>

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