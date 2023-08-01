import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../logic/socket'

import FriendCard from './FriendCard';


const gimmeFriends = async () => {
  
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  socket.emit("gimme friends", token)
}


const FriendListScreen = ({navigation}) => {

  const [friendList, setFriendList] = useState([]);


  useEffect(() => {
    
    socket.on("take friend list", (friendList) => {
      console.log("got friend list")
      setFriendList(friendList)
    })
    
    socket.on("new friend", (friendId) => {
      console.log("got new friend omg")
      gimmeFriends();
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
            buttonString={'fsac'}
            buttonFunction={() => {console.log("sent fsac")}}/>)) }
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          <View style={styles.friendContainer}><Text>dummy friend</Text></View>
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