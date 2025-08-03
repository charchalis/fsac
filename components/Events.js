import {View, Text, Button, ScrollView, SafeAreaView} from 'react-native'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {setScreen} from '../reducers/tabNavigationReducer';



const Events = ({navigation}) => {

  const dispatch = useDispatch()
  
  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused)dispatch(setScreen('events'))

  }, [focused]) 

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#091212"}}>
        <ScrollView>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <Text style={{ borderColor: "#56b643", borderWidth: 3, padding: "20%"}}>fds</Text>
        <View style={{padding: "15%"}}/>
        </ScrollView>
      </SafeAreaView>
    );
  }

export default Events;