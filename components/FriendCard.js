import {View, Text, StyleSheet, Image} from 'react-native'
import {useEffect, useState} from 'react';


const FriendCard = (props) => {
  
  const { data } = props;
  
  const [image, setImage] = useState(`data:image/jpeg;base64,${data.image}`);
  

  useEffect(() => {


  },[])

  return (
    <View style={styles.friendContainer}>
      <View style={{flex:1, flexDirection: 'row' }}>
        <Image source={{ uri: image }} style={{ width: 60, height: 60 , backgroundColor: "#fff", borderRadius: 30}} />
        <View style={{alignSelf: 'center', marginLeft: 10}}>
          <Text style={{fontSize: 20}}>{data.username}</Text>
          <Text style={{fontSize: 13}}>{data.firstName + " " + data.lastName}</Text>
        </View>
      </View>
      <View class="friendFsacButton" style={styles.button}>
        <Text>fsac</Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
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

export default FriendCard;