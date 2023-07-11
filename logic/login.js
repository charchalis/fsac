import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
const URL = "http://192.168.1.254:3000/"

const myPost = async (endpoint = null , data = null) => {
    try{
        const response = await axios.post(URL + endpoint, data)
        return {success: response.status === 200, data: response.data, }
    }catch(err){
        console.log(err.response.data.message)
        return {success: false, message: err.response.data.message}
    }
}

const login = async (username, password) => {
    const result = await myPost('login', {username: username, password: password})
    const token = result.data.token;

    if(result.success){
        try {
            await AsyncStorage.setItem('JWT_TOKEN', token);
            console.log('Token stored successfully.');
            return {success:true, token: token}
        } catch (error) {
            console.log('Error storing data: ', error);
            return {success:false}
        }
    }
}

export default login;