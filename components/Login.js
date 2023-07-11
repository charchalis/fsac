import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateAccount from './CreateAccount';

import authenticate from '../logic/authenticate';
import login from '../logic/login';

const Login = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authentication = async () => {

        try {
            const token = await AsyncStorage.getItem('JWT_TOKEN');
            if (token !== null) {
                console.log('Retrieved token: ', token);
                const authentication = await authenticate(token)
                
                if(authentication.success) navigation.navigate('Home', authentication.user);
                else RNBootSplash.hide({fade: true});


            } else {
                console.log('Token does not exist.');
                RNBootSplash.hide({fade: true});
            }
        }catch (error) {
            console.log('Error retrieving data: ', error);
            RNBootSplash.hide({fade: true});
        }
    }

    useEffect(() =>{
        
        //AsyncStorage.clear()
        
        authentication();
        
        
        
    }, []);



    return (
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', backgroundColor: "#091212", padding: 30}}>
            
            <Text style={{fontSize: 20, marginBottom: 2}}>LOGIN</Text>
            
            <TextInput value={username} onChangeText={setUsername} placeholder={'username'}
                style={{flexDirection: 'row', borderWidth: 1, borderColor: "#555", marginBottom: 10, paddingLeft: 10}}/>
                    
            <TextInput value={password} onChangeText={setPassword} placeholder={'password'} secureTextEntry={true}
                style={{borderWidth: 1, borderColor: "#555", paddingLeft: 10}}/>
            
            <TouchableOpacity onPress={() => login(username, password).then(res => res.success ? authentication() : res)}
            style={{borderWidth: 1, borderColor: "#555", alignItems: "center", width: 100, marginTop: 10}}>
                <Text style={{fontSize: 20, color: "#888"}}>login</Text>
            </TouchableOpacity>

            <Text style={{fontSize: 20, marginBottom: 2, marginTop: 100}}>SIGN IN</Text>
            <TouchableOpacity onPress={() => navigation.navigate(CreateAccount)}
            style={{borderWidth: 1, borderColor: "#555", alignItems: "center"}}>
                <Text style={{fontSize: 20, color: "#888"}}>sign in</Text>
            </TouchableOpacity>

        </View>
    );
};
 
 
 
export default Login; 