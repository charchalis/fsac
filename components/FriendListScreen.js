import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../logic/socket'
import { useSelector, useDispatch } from 'react-redux';
import { log, setFriendList, fsac, NewMessage } from '../reducers/friendListReducer';

import FriendCard from './FriendCard';



const gimmeFriends = async () => {
  
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit("gimme friends", token)
}


const FriendListScreen = ({navigation}) => {

  const userId = useSelector((state) => state.myUser.user).id
  const friendList = useSelector((state) => state.friendList.list)

  const dispatch = useDispatch();

  useEffect(() => {

    
    socket.on("take friend list", (friends) => {
      console.log("got friend list")
      dispatch(setFriendList(friends))
    })

    

    socket.on("fsac invite successful", ({friendId, endDate}) => {
      console.log("fsac invite successfull")
      console.log(friendId)
      console.log(endDate)
      dispatch(fsac({friendId, endDate}))

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

    

  }, [friendList])

    return (
      <View style={styles.window}>
        <ScrollView >

          { friendList.map((friend) => (
          <FriendCard key={friend.id}
            friend={friend}
            navigation = { navigation }
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
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default FriendListScreen;