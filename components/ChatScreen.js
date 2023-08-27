import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

import Message from './Message'

const ChatScreen = ({navigation}) => {
  
  const myUser = useSelector(state => state.myUser.user)
  const friend = useSelector(state => state.onChatroom.friend)

  const dispatch = useDispatch();
  
  

  useEffect(() => {
    
    // add friend image to header
    navigation.setOptions({ 
      headerTitle: (props) =>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{ width: 45, height: 45 , backgroundColor: "#fff", borderRadius: 25, marginLeft: -10, marginRight: 10}}
                source={{uri: `data:image/jpeg;base64,${friend.image}`}}
              />
              <Text style={{fontSize: 23}}>{friend.username}</Text>
            </View>
    }); 
    
    return () => {dispatch(setOnChatroom(false))}

  }, []);

    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: "#091212"}}>

          <View style={{flex:1}}>
            {}
            <Message />
            <Message/>
          </View>

          <View style={{flexDirection: 'row', backgroundColor: "#555", paddingBottom: 5}}>
            <TextInput style={{flex: 1,margin: 4, backgroundColor: "#091212", borderRadius: 25}}/>
            <TouchableOpacity style={{backgroundColor:"#383", justifyContent: 'center', borderRadius: 10, margin: 5, padding: 5}}>
              <Text style={{fontSize: 25}}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default ChatScreen;