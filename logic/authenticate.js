import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    
    const url = "http://192.168.1.95:3000/authenticate";
    const data = {token: token};
    
    try{
        const response = await axios.post(url, data)
        console.log("response success:", response.status === 200)
        return {success: response.status === 200}
    }catch(err){return {success: false}}
}


export default authenticate;