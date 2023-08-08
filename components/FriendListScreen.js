import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../logic/socket'
import { useSelector, useDispatch } from 'react-redux';
import { log, setFriendList, fsac } from '../reducers/friendListReducer';

import FriendCard from './FriendCard';


const gimmeFriends = async () => {
  
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit("gimme friends", token)
}


const FriendListScreen = ({navigation}) => {

  const friendList = useSelector((state) => state.friendList.list)

  const dispatch = useDispatch();

  useEffect(() => {
    
    socket.on("take friend list", (friends) => {
      console.log("got friend list")
      dispatch(setFriendList(friends))
    })
    
    socket.on("new friend", (friendId) => {
      console.log("got new friend omg")
    })

    socket.on("fsac invite successful", ({friendId, timespan}) => {
      console.log("fsac invite successfull")
      console.log(friendId)
      console.log(timespan)
      dispatch(fsac({friendId, timespan}))

      const showToast = () => {
        ToastAndroid.showWithGravity(
          'Fsac sent successfuly',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };

      showToast()

    })
    
    
    gimmeFriends();

  },[])
  
  useEffect(() => {
    
    console.log("updated friend list")
    

  }, [friendList])

    return (
      <View style={styles.window}>
        <ScrollView >
          { friendList.map((friend) => (
          <FriendCard key={friend.id}
            data={friend}
            buttonString={friend.timespan ? friend.timespan : 'fsac'}
            buttonFunction={ async () => {
              availableFsac = friend.timespan ? false : true
              if(availableFsac){
                console.log(availableFsac)
                console.log("sent fsac");
                const token = await AsyncStorage.getItem('JWT_TOKEN');
                socket.emit('fsac?', {token, friendId: friend.id})
              }else{
                const showToast = () => {
                  ToastAndroid.showWithGravity(
                    'You can send another fsac after the countdown',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                };
          
                showToast()
              }
              
            }}
          />))}
        </ScrollView>
        <TouchableOpacity class="addFriendButton" style={styles.button}
          onPress={() => navigation.navigate('AddFriendScreen')}>
          <Text>Add friend</Text>
        </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#091212',
    color: '#56b643'
  },
  friendContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 30,
    borderColor: "#56b643",
    borderBottomWidth: 1

  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f80",
    color: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  }
})

export default FriendListScreen;