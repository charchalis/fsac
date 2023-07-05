import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (username, password) => { 
   
    let fetched;

    console.log("posting user data")
    console.log("user:", username, " ", password)

    await fetch("http://192.168.1.95:3000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then((res) => {console.log("made it here: ", res.body); return res.json()}).then((resJson) => fetched = resJson
    ).catch((err)=>{console.log(err)});

    console.log("fetched", fetched)
    return fetched; 

}

export default login;