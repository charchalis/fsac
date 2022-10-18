import React, {useEffect} from 'react';
import {View} from 'react-native';
 
 
const Login = ({navigation}) => {

    useEffect(async () =>{
        
        navigation.navigate('Home');
    }, []);



    return (
        <View>
        
        </View>
    );
};
 
 
 
export default Login; 