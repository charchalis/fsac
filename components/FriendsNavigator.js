import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FriendListScreen from './FriendListScreen';
import AddFriendScreen from './AddFriendScreen';


const Stack = createNativeStackNavigator();


const FriendsNavigator = () => {

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="FriendListScreen" component={FriendListScreen} options={{headerShown: false}}/>
          <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} options={{headerShown: true}}/>
        </Stack.Navigator>  
      </NavigationContainer>
      );
}

export default FriendsNavigator;