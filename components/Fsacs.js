import {View, Text} from 'react-native'
import { setScreen } from '../reducers/tabNavigationReducer';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


const Fsacs = ({navigation}) => {

  const dispatch = useDispatch()
  
  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused)dispatch(setScreen('fsacs'))

  }, [focused])
    
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color: "#000"}}>fsacs Screen</Text>
        </View>
      );
}

export default Fsacs;