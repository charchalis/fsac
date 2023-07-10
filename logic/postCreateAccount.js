import AsyncStorage from '@react-native-async-storage/async-storage';
import { sign } from 'react-native-pure-jwt'

const postCreateAccount = async (userImage, username, password, firstName, lastName, callback) => {
    
    
    console.log(userImage)
    console.log(username)
    console.log(password)
    console.log(firstName)
    console.log(lastName)

    const data = new FormData();

    data.append('username', username);
    data.append('password', password);
    data.append('firstName', firstName);
    data.append('lastName', lastName);

    data.append('fileData', {
        uri : userImage.uri,
        type: userImage.type,
        name: userImage.fileName
    });

    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data
    };

    const test = await (await fetch("http://192.168.1.254:3000/" + "createAccount", config)).json()
    
    console.log("test")
    console.log(test)

    fetch("http://192.168.1.254:3000/" + "createAccount", config)
    .then((res) => res.json()).then(async (resJson) => {
        console.log("no way")
        if(resJson.success){
            console.log("resJson success")
            try {
                await AsyncStorage.setItem('token',token)
            } catch (e) {
                console.log(e)
            }
        }
        callback(resJson.success)

    }).catch((err)=>{console.log(err)});
    
    

}
export default postCreateAccount;