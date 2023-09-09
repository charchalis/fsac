import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setChatFriend, setOnChatroom } from '../reducers/navigatorOnChatroom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../logic/socket'


const PossibleFriendCard = (props) => {
  

  const { friend, navigation } = props;
  
  const image = `data:image/jpeg;base64,${friend.image}`;
  
  const buttonColor = "#f80";

  const buttonStr = "add friend";

  const buttonFunction = async () => {
    const token = await AsyncStorage.getItem('JWT_TOKEN');
    socket.emit('add friend', {token, friend: friend})
  }

  return (
    <View style={styles.friendContainer}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image source={{ uri: image }} style={{ width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30, margin: 30, marginRight: 15}} />
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 20}}>{friend.username}</Text>
          <Text style={{fontSize: 13}}>{friend.firstName + " " + friend.lastName}</Text>
        </View>
      </View>

      {friend.timespan === 1 ? renderDeclineButton(friend) : null}

      <TouchableOpacity class="friendFsacButton" style={[styles.button, {backgroundColor: buttonColor}]}
        onPress={buttonFunction}>
        <Text>{buttonStr}</Text>
      </TouchableOpacity>
    </View>
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
    borderColor: "#56b643",
    borderBottomWidth: 1
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

export default PossibleFriendCard;