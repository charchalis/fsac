import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react';

const showTime = (unixTime) => {
  const currentDate = Date.now()
  const countdown = new Date(unixTime - currentDate);

  const hours = countdown.getHours();
  const minutes = countdown.getMinutes();
  const seconds = countdown.getSeconds();

  return (hours ? (hours < 10 ? '0' : '') + hours + ':' : '') + (hours || minutes ? (minutes < 10 ? '0' : '') + minutes + ':' : '') + (seconds < 10 ? '0' : '') + seconds 
}


const FriendCard = (props) => {
  
  const { data, buttonString, buttonFunction } = props;
  
  const [image, setImage] = useState(`data:image/jpeg;base64,${data.image}`);
  
  const [buttonColor, setButtonColor] = useState("#f80");

  const [buttonStr, setButtonStr] = useState(buttonString);
  

  useEffect(() => {

    console.log("timespan:", data.timespan)
    console.log("timespan:", data.timespan ? "yes" : "no")

    if(data.timespan){
      setButtonColor("#222");
    }else{
      setButtonColor("#f80");
    }

  },[data])

  useEffect(() => {

    if(data.timespan){
      console.log("popo")
      setButtonStr(showTime(data.timespan))
    }

  },[data.timespan])

  useEffect(() => {

    if(data.timespan){
      
      function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      }

      async function updateButtonString() {
        await sleep(1000);
        setButtonStr(showTime(data.timespan))
      }
      
      updateButtonString()
      
    }

  },[buttonStr])

  return (
    <View style={styles.friendContainer}>
      <View style={{flex:1, flexDirection: 'row' }}>
        <Image source={{ uri: image }} style={{ width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30}} />
        <View style={{alignSelf: 'center', marginLeft: 10}}>
          <Text style={{fontSize: 20}}>{data.username}</Text>
          <Text style={{fontSize: 13}}>{data.firstName + " " + data.lastName}</Text>
        </View>
      </View>
      <TouchableOpacity class="friendFsacButton" style={[styles.button, {backgroundColor: buttonColor}]}
      onPress={buttonFunction}>
        <Text>{buttonStr}</Text>
      </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
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
    color: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  }
})

export default FriendCard;