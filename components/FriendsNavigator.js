import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';


import FriendListScreen from './FriendListScreen';
import AddFriendScreen from './AddFriendScreen';
import {setScreen} from '../reducers/tabNavigationReducer';

const Stack = createNativeStackNavigator();



const FriendsNavigator = ({navigation}) => {


  const dispatch = useDispatch()
  
  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused)dispatch(setScreen('friends'))

  }, [focused]) 

  return (
    <View style={{flex: 1,backgroundColor: "#091212"}}>
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="FriendListScreen" component={FriendListScreen} options={{headerShown: false }}/>
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} options={{title: "Add a friend", headerStyle: {backgroundColor: '#091212'}, headerTintColor: '#fff'}} />
      </Stack.Navigator>  
    </NavigationContainer>
    </View>
    );
}

export default FriendsNavigator;headerMode='float'