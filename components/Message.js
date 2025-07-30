import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'

const Message = React.memo(({message, mine}) => {
//const Message = ({message, mine}) => {
    
    const date = new Date(message.date)

  
    return (
        <View style={[{ padding: 7, borderRadius: 15, margin: 5}, mine ? {alignSelf: 'flex-end', backgroundColor: "#f00"} : {alignSelf: 'flex-start', backgroundColor: "#00f"}]}>

            <Text style={{fontSize: 15}}>{message.text}</Text>
            
            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                <Text style={{fontSize: 12, marginRight: 3}}>{date.getHours()} : {date.getMinutes()}</Text>
                {
                    mine ?  
                    (<Text style={{fontSize: 12}}>{message.seen ? 'seen' : 'not seen'} </Text>): ''
                }
            </View>
        </View>
      );
})

export default Message;