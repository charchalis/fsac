import {View, Text, StyleSheet, Image} from 'react-native'
import {useEffect, useState} from 'react';


const Friend = (props) => {
  
  const { data } = props;
  console.log(data)
  
  const [image, setImage] = useState(`data:image/jpeg;base64,${data.image}`);
  
  console.log(image)

  useEffect(() => {


  },[])

  return (
    <View style={styles.friendContainer}>
      <View>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 , backgroundColor: "#fff"}} />
      </View>
      <Text>dummy friend</Text>
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

export default Friend;