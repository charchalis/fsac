import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import {useEffect} from 'react'

const Message = (props) => {
    
    //const {userId, username} = props

    //console.log(userId)
    //console.log(username)
  
    return (
        <View style={{ backgroundColor: "#f00", alignSelf: 'flex-start', padding: 7, borderRadius: 15, margin: 5}}>

            <Text style={{fontSize: 15}}>lorem ipsum yo ass in the ppsum</Text>
            
            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                <Text style={{fontSize: 12, marginRight: 3}}>4:20</Text>
                <Text style={{fontSize: 12}}>seen</Text>
            </View>
        </View>
      );
}

export default Message;