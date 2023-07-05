import AsyncStorage from '@react-native-async-storage/async-storage';
import { sign } from 'react-native-pure-jwt'

const postCreateAccount = async (userImage, username, password, firstName, lastName, callback) => {
    
    

    const data = new FormData();
    const secretData = new FormData();
    
    
    secretData.append('username', username);
    secretData.append('password', password);
    

    data.append('username', username);

    var token;

    await sign(
        secretData,
        "harambe",
        {alg: "HS256"}   
    ).then((myToken) => token = myToken);
    
    console.log("token: ", token);

    data.append('token', token)
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

    fetch("http://192.168.1.95:3000/" + "createAccount", config)
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