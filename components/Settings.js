import {View, Text} from 'react-native'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {setScreen} from '../reducers/tabNavigationReducer';



const Settings = ({navigation}) => {
  
  const dispatch = useDispatch()
  
  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused)dispatch(setScreen('settings'))

  }, [focused]) 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color: "#000"}}>settings Screen</Text>
        </View>
      );
}

export default Settings;