import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faJoint } from "@fortawesome/free-solid-svg-icons";
import FriendCard from './FriendCard';
import { useIsFocused } from '@react-navigation/native';
import {setScreen} from '../reducers/tabNavigationReducer';





const FsacsScreen = ({navigation}) => {

  const dispatch = useDispatch()
  
  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused)dispatch(setScreen('fsacs'))

  }, [focused]) 
  
  const events = []
  const individualFsacs = useSelector((state) => state.friendList.list).filter(friend => friend.fsacoso)

  useEffect(() => {

  }, [])
    
  return (
        <View style={styles.window}>
          {events.length === 0 && individualFsacs.length === 0 ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faJoint} color={'#ffffff19'} size={100} style={{marginBottom: 20}} />
              <Text style={{fontSize: 20, color: "#ffffff19"}}>No one wants to fsac 🥺</Text>
              <Text style={{fontSize: 20, color: "#ffffff19"}}>Press the BIG BUTTON </Text>
              <Text style={{fontSize: 20, color: "#ffffff19"}}>And wait for someone to respond 🗿</Text>
            </View>
          :
            <ScrollView >

              {/*TODO: event list map*/}

              { individualFsacs.map((friend) => (
              <FriendCard key={friend.id}
                friend={friend}
                navigation = { navigation }
              />))} 

            </ScrollView>
          }
        </View>
      );

    
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#091212',
    color: '#56b643'
  },
  friendContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 30,
    borderColor: "#56b643",
    borderBottomWidth: 1

  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f80",
    color: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default FsacsScreen;