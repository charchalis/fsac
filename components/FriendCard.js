import {View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid} from 'react-native'
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatroomId, setOnChatroom } from '../reducers/navigatorOnChatroom';
import AnimatedRingExample from './AnimatedRingExample';
import socket from '../logic/socket'
import AsyncStorage from '@react-native-async-storage/async-storage';


import BouncingDots from './BouncingDots';



const showTime = (expireDate) => {
  const currentDate = Date.now()
  const countdown = expireDate - currentDate;

  let seconds = Math.floor(countdown / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60
  minutes = minutes % 60

  return (hours ? (hours < 10 ? '0' : '') + hours + ':' : '') + (hours || minutes ? (minutes < 10 ? '0' : '') + minutes + ':' : '') + (seconds < 10 ? '0' : '') + seconds
}

const renderDeclineButton = (friend) => {
  
  
  return (
    <TouchableOpacity class="friendFsacButton" style={[styles.button, {backgroundColor: "#f00"}]}
          onPress={() => sendDeclineFsacRequest(friend)}>
          <Text>no</Text>
        </TouchableOpacity>
  )
  
}


const sendFsac = async (userId, friend) => {
  
    console.log("FriendCard.js: sending fsac to ", userId)

    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit('fsac?', {token, userId, friendId: friend.id})
}

const showAuthoritarianToast = () => {
  ToastAndroid.showWithGravity(
    'You can send another fsac after the countdown',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
}

const sendAcceptFsacRequest = async (friend) => {
  console.log("FriendCard.js: emmiting back: accepted fsac with ", friend.id)

  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit('accepted fsac', {token, friendId: friend.id})
}

const sendDeclineFsacRequest = async (friend) => {
  console.log("FriendCard.js: emmiting back: declined fsac with ", friend.id)
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit('declined fsac', {token, friendId: friend.id})
  
}

const joinSocketRoom = async (friend) => {
  console.log("FriendCard.js: emmiting back: add me to socketroom ", friend.id)
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit("add me to socketroom", {token, chatroomId: friend.chatroomId})
  
}




const FriendCard = (props) => {
  

  const { friend, navigation } = props;
  
  const userId = useSelector((state) => state.myUser.user).id
  
  const chatroom = useSelector((state) => state.chatrooms.list).find(room => room.id === friend.chatroom_id)

  const [image, setImage] = useState(`data:image/jpeg;base64,${friend.image}`);

  const [isTyping, setIsTyping] = useState(false)

  
  const dispatch = useDispatch();

  
  
  const goToChatScreen = (chatroomId) => {
    console.log("going to chatroom " + chatroomId)
    dispatch(setChatroomId(chatroomId))
    dispatch(setOnChatroom(true))
  }
  
  return (
    <TouchableOpacity
      style={[styles.friendContainer, {paddingRight: 0}]}
      onPress={ () => goToChatScreen(friend.chatroom_id) }
    >
      <View style={{flex:1, flexDirection: 'row' }}>


        <View style={{backgroundColor: null, margin: 5, marginRight: 15, justifyContent: "center", alignItems: "center"}}>
          <AnimatedRingExample active={friend.fsacoso}/>
          <Image source={{ uri: image }} style={{ width: 55, height: 55,borderRadius: 30}} />
        </View>


        <View style={{alignSelf: 'stretch', justifyContent: 'space-between', marginTop: 2}}>

          <View style={{flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#363'}}>{friend.username}</Text>
            <Text style={{fontSize: 13, marginLeft: 10, alignSelf: 'center', color: '#555'}}>{friend.firstName + " " + friend.lastName}</Text>
          </View>

          <View style={{marginBottom: 8, minHeight: 20}}>
            {
              friend.typing ?
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <BouncingDots color={'#555'} size={7}/>
              </View>
              : 
              chatroom && chatroom.messages.length > 0 ?  
                <Text style={{fontSize: 13, color: '#555', maxWidth: '85%' }} numberOfLines={1}>{
                  (chatroom.messages[chatroom.messages.length - 1].userId === userId ? "You: " : "") + 
                  chatroom.messages[chatroom.messages.length - 1].text
                }</Text> :
                <Text style={{fontSize: 13, color: '#555'}}>no messages</Text>
            }
          </View>

        </View>
          

      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  friendContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingRight: 30,
    borderColor: "#222",
    borderBottomWidth: 1,
  },
  friendContainerFsacing:{
    backgroundColor: '#f00'
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    color: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  }
})

export default FriendCard;