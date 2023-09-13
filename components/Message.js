import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'

const Message = React.memo(({message, mine}) => {
    
    console.log("message: ", message)
    console.log("mine: ", mine)
    
    const date = new Date(message.date)

    console.log("MESSAGE: ", Object.keys(message))

    //console.log(userId)
    //console.log(username)
  
    return (
        <View style={[{ padding: 7, borderRadius: 15, margin: 5}, mine ? {alignSelf: 'flex-end', backgroundColor: "#f00"} : {alignSelf: 'flex-start', backgroundColor: "#00f"}]}>

            <Text style={{fontSize: 15}}>{message.text}</Text>
            
            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                <Text style={{fontSize: 12, marginRight: 3}}>{date.getHours()} : {date.getMinutes()}</Text>
                <Text style={{fontSize: 12}}>{message.seen ? 'seen' : 'not seen'} </Text>
            </View>
        </View>
      );
})

export default Message;