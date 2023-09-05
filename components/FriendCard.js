import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setChatFriend, setOnChatroom } from '../reducers/navigatorOnChatroom';
import AnimatedRingExample from './AnimatedRingExample';


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


const FriendCard = (props) => {
  

  const { friend, buttonString, buttonFunction, navigation } = props;
  
  const [image, setImage] = useState(`data:image/jpeg;base64,${friend.image}`);
  
  const [buttonColor, setButtonColor] = useState("#f80");

  const [buttonStr, setButtonStr] = useState(buttonString);
  
  const dispatch = useDispatch();
  
  const goToChatScreen = (friend) => {
    dispatch(setChatFriend(friend))
    dispatch(setOnChatroom(true))
  }

  useEffect(() => {

  },[friend])

  useEffect(() => {

    console.log(friend.username, " timespan:", friend.timespan)

    if(friend.timespan && friend.timespan != 1){

      setButtonColor("#222");
      setButtonStr(showTime(friend.timespan))

    }else{

      setButtonColor("#f80");

    }

  },[friend.timespan])

  useEffect(() => {

    if(friend.timespan && friend.timespan != 1){
      
      function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      }

      async function updateButtonString() {
        await sleep(1000);
        setButtonStr(showTime(friend.timespan))
      }
      
      updateButtonString()
      
    }

  },[buttonStr])

  
  const regularCard = () => {
    return (
      <View style={styles.friendContainer}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <Image source={{ uri: image }} style={{ width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30, margin: 30, marginRight: 15}} />
          <View style={{alignSelf: 'center'}}>
            <Text style={{fontSize: 20}}>{friend.username}</Text>
            <Text style={{fontSize: 13}}>{friend.firstName + " " + friend.lastName}</Text>
          </View>
        </View>
  
        <TouchableOpacity class="friendFsacButton" style={[styles.button, {backgroundColor: buttonColor}]}
          onPress={buttonFunction}>
          <Text>{buttonStr}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const fsacCard = () => {
    return (
      <TouchableOpacity
        style={[styles.friendContainer, {paddingRight: 0}]}
        onPress={ () => goToChatScreen(friend) }
      >
        <View style={{flex:1, flexDirection: 'row' }}>


          <View>


            <View style={{width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30, margin: 30, padding: 30, marginRight: 15, backgroundColor: "#fff", position: 'absolute'}}>
              <View >
              <AnimatedRingExample />
              </View>
            </View>
            <Image source={{ uri: image }} style={{ width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30, margin: 30, marginRight: 15}} />

          </View>

          <View style={{alignSelf: 'center', justifyContent: 'space-around'}}>

            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>{friend.username}</Text>
              <Text style={{fontSize: 13, marginLeft: 10, alignSelf: 'center'}}>{friend.firstName + " " + friend.lastName}</Text>
            </View>

            <View style={{ }}>
              <Text style={{fontSize: 13, color: '#555', marginTop: 10}}>mensagem e o crl</Text>
            </View>

          </View>
            

        </View>
      </TouchableOpacity>
    )
  }

  return friend.timespan != 1 ? regularCard() : fsacCard()
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

export default FriendCard;