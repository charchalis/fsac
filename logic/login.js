import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import {API_URL} from '../constants'

const myPost = async (endpoint = null , data = null) => {

    try{
        const response = await axios.post(API_URL + endpoint, data)
        console.log("response: ", response)
        return {success: response.status === 200, data: response.data, }
    }catch(err){
        console.log("error: ", err.response.data.message)
        console.log("error: ", err)
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