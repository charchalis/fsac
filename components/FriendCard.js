import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react';

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
  
  const { data, buttonString, buttonFunction } = props;
  
  const [image, setImage] = useState(`data:image/jpeg;base64,${data.image}`);
  
  const [buttonColor, setButtonColor] = useState("#f80");

  const [buttonStr, setButtonStr] = useState(buttonString);
  

  useEffect(() => {

    const {image, ...friendo} = data;
    console.log("HEREEEEEEEEEEE")
    console.log(friendo)

    console.log(data.username, " timespan:", data.timespan)
    if(data.timespan && data.timespan != 1){
      setButtonColor("#222");
    }else{
      setButtonColor("#f80");
    }

  },[data])

  useEffect(() => {

    if(data.timespan && data.timespan != 1){
      setButtonStr(showTime(data.timespan))
    }

  },[data.timespan])

  useEffect(() => {

    if(data.timespan && data.timespan != 1){
      
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