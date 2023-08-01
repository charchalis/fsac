import {View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../logic/socket'

import FriendCard from './FriendCard';


const AddFriendScreen = ({navigation}) => {
    
    const [usernameSearch, setUsernameSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [justArrived, setJustArrived] = useState(true);
    const [possibleFriends, setPossibleFriends] = useState([]);
    const [noFriends, setNoFriends] = useState(false);

  useEffect(() => {
      
    socket.on('take possible friends', (friends) => {
        console.log("taking possible frineds-,")
        setPossibleFriends(friends)
    })

  },[])


  useEffect(() => {
      
    setIsLoading(false)
      
    console.log("no friends")
    console.log(possibleFriends)
    console.log(possibleFriends.length)
    console.log(!possibleFriends.length)
      
    if(!possibleFriends.length) setNoFriends(true)
      

  },[possibleFriends])
  
    return (
      <View style={[styles.window, {justifyContent: 'space-between'}]}>
        
        {justArrived ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: "#ffffff55"}}>Find yourself a friend 🍻</Text>
            </View>
        ) : isLoading ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#56b643" />
            </View>
        ) : noFriends ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: "#ffffff55"}}>No one was found 🥺</Text>
                <Text style={{fontSize: 20, color: "#ffffff55"}}>Don't worry. I'll be your friend 💪🏿🗿</Text>
            </View>
        ) : (
            <ScrollView>
                { possibleFriends.map((friend) => (<FriendCard key={friend.id} data={friend}/>)) }
            </ScrollView>
        )}

        <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center'}}>

            <TextInput value={usernameSearch} onChangeText={setUsernameSearch} placeholder={'friend'}
                style={{flex: 1, borderWidth: 1, borderColor: "#555", paddingLeft: 10, borderRadius: 10, margin: 10}}/>

            <TouchableOpacity class="searchFriendButton" style={[styles.button, {margin: 10}]} 
            onPress={async () => {
                setIsLoading(true);
                setJustArrived(false);
                setNoFriends(false);
                const token = await AsyncStorage.getItem('JWT_TOKEN');
                socket.emit('search friend', {token, usernameSearch})}}>
                <Text>search</Text>
            </TouchableOpacity> 

        </View>
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

export default AddFriendScreen;