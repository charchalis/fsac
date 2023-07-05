import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import RNBootSplash from "react-native-bootsplash";

import CreateAccount from './CreateAccount';

import authenticate from '../logic/authenticate';
import login from '../logic/login';

const Login = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authentication = async () => await authenticate().then((res) => {
        console.log(res)
        console.log("authenticate: ", res.success);
        
        if(res.success) navigation.navigate('Home', res.user);
        else RNBootSplash.hide({fade: true});

    });

    useEffect(() =>{
        
        
        authentication();

        
    }, []);



    return (
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', backgroundColor: "#091212", padding: 30}}>
            
            <Text style={{fontSize: 20, marginBottom: 2}}>LOGIN</Text>
            
            <TextInput value={username} onChangeText={setUsername} placeholder={'username'}
                style={{flexDirection: 'row', borderWidth: 1, borderColor: "#555", marginBottom: 10, paddingLeft: 10}}/>
                    
            <TextInput value={password} onChangeText={setPassword} placeholder={'password'} secureTextEntry={true}
                style={{borderWidth: 1, borderColor: "#555", paddingLeft: 10}}/>
            
            <TouchableOpacity onPress={() => login(username, password)}
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