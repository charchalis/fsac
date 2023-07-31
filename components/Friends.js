import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {useEffect} from 'react';

const Friends = () => {

  useEffect(() => {
    
    

  },[])

    return (
        <View style={styles.window}>
          <ScrollView >
            <View style={styles.friendContainer}>
              <View>
                <Text>pic goes here</Text>
              </View>
              <Text>dummy friend</Text>
              <View class="friendFsacButton" style={styles.button}>
                <Text>fsac</Text>
              </View>
            </View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
            <View style={styles.friendContainer}><Text>dummy friend</Text></View>
          </ScrollView>
          <View class="addFriendButton" style={styles.button}>
            <Text >Add friend</Text>
          </View>
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
  }
})

export default Friends;