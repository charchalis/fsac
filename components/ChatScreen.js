import {View, Text, TextInput, Image} from 'react-native'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnChatroom } from '../reducers/navigatorOnChatroom';

const ChatScreen = ({navigation}) => {
  
  const friend = useSelector(state => state.onChatroom.friend)
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: (props) =>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{ width: 45, height: 45 , backgroundColor: "#fff", borderRadius: 25, marginLeft: -10, marginRight: 10}}
                source={{uri: `data:image/jpeg;base64,${friend.image}`}}
              />
              <Text style={{fontSize: 23}}>{friend.username}</Text>
            </View>
    }); // add header image
    
    return () => {dispatch(setOnChatroom(false))}
  }, []);

    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: "#091212"}}>
          <Text style={{color: "#fff", flex: 1 }}>chat Screen</Text>
          <View style={{backgroundColor: "#555", borderRadius: 25, marginLeft: 10, marginRight: 10}}>
            <TextInput style={{margin: 5, backgroundColor: "#091212", borderRadius: 25}}/>
          </View>
        </View>
      );
}

export default ChatScreen;