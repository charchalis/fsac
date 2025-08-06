import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faCircleCheckRegular } from '@fortawesome/free-regular-svg-icons';

const Message = React.memo(({message, mine}) => {

    
    const date = new Date(message.date)

  
    return (
        <View style={[{ minWidth: 70, padding: 7, paddingBottom: 2, borderRadius: 12, margin: 5}, 
        mine ? {alignSelf: 'flex-end', backgroundColor: "#353"} :
        {alignSelf: 'flex-start', backgroundColor: "#222"}]}>

            <Text style={{fontSize: 15}}>{message.text}</Text>
            
            <View style={{flexDirection: 'row', alignSelf:'flex-end', alignItems: 'center', justifyItems: 'center'}}>
                <Text style={[{fontSize: 10}, mine ? {color: '#fff6'} : {color: '#fff4'}]}>
                    {(date.getHours() < 10 ? '0' : '') + date.getHours()}:
                    {(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}
                </Text>
                <View style={{marginLeft: 2, color: '#111'}}>{
                    !mine ? null :
                    message.seen ? 
                    <FontAwesomeIcon icon={faCircleCheckSolid} color={'#fff6'} size={10}/> :
                    message.delivered ? 
                    <FontAwesomeIcon icon={faCircleCheckRegular} color={'#fff6'} size={10} /> : null
                }</View>
            </View>
        </View>
      );
})

export default Message;