import {View, Text, StyleSheet} from 'react-native'

const Friends = () => {
    return (
        <View style={styles.window}>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>
          <Text style={styles.friendContainer}>friends Screen</Text>

          <View class="addFriendButton" style={{justifyContent: 'center', alignItems: 'center' , backgroundColor: "#f80", color: "#fff"}}>
            <Text >friends Screen</Text>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#091212',
    color: '#56b643'
  },
  friendContainer:{
    flex: 1,
    color: '#fff'
  }
})

export default Friends;