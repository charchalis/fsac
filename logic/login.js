import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const login = async (username, password) => { 
   
    let fetched;

    console.log("posting user data")
    console.log("username:", username, "password:", password)

    const url = "http://192.168.1.95:3000/login";
    const data = {username: username, password: password};
   
    
    try{
        const response = await axios.post(url, data)
        console.log("response success:", response.status === 200)
        return {success: response.status === 200}
    }catch(err){return {success: false}}
}

export default login;