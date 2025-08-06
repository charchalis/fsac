import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faCircleCheckRegular } from '@fortawesome/free-regular-svg-icons';

const Message = React.memo(({message, mine}) => {
//const Message = ({message, mine}) => {
    
    const date = new Date(message.date)

  
    return (
        <View style={[{ minWidth: 70, padding: 7, paddingBottom: 2, borderRadius: 15, margin: 5}, mine ? {alignSelf: 'flex-end', backgroundColor: "#f00"} : {alignSelf: 'flex-start', backgroundColor: "#00f"}]}>

            <Text style={{fontSize: 15}}>{message.text}</Text>
            
            <View style={{flexDirection: 'row', alignSelf:'flex-end', alignItems: 'center', justifyItems: 'center'}}>
                <Text style={{fontSize: 10, marginRight: 3}}>
                    {(date.getHours() < 10 ? '0' : '') + date.getHours()}:
                    {(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}
                </Text>
                {
                    mine ?
                    message.seen ? 
                    <FontAwesomeIcon icon={faCircleCheckSolid} color={'#ffffffaa'} size={10} /> :
                    message.delivered ? 
                    <FontAwesomeIcon icon={faCircleCheckRegular} color={'#ffffffaa'} size={10} /> : null : null
                }
            </View>
        </View>
      );
})

export default Message;