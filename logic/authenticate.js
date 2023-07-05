import AsyncStorage from '@react-native-async-storage/async-storage';

const authenticate = async () => { 
    
        //AsyncStorage.clear();

        console.log("authenticating")
        let token = await AsyncStorage.getItem('token');
        console.log("token: ", token);

        if(!token) return {success: false};
        console.log("theres token")
        
        //token has a space in the beggining for some reason
        token = token.replace(/\s/g, '');

        const success = await postToken(token)
    
        return success;
        
    
}

const postToken = async (token) => {
    
    let fetched;

    console.log("posting token")
    console.log("token:", token)
    console.log("jsonToken: ", JSON.stringify({token: token}))

    await fetch("http://192.168.1.95:3000/authenticate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        token: token,
        body: JSON.stringify({token: token})
    })
    .then((res) => {console.log("made it here: ", res.body); return res.json()}).then((resJson) => fetched = resJson
    ).catch((err)=>{console.log(err)});

    console.log("fetched", fetched)
    return fetched;
}


export default authenticate;