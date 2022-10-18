import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import RNBootSplash from "react-native-bootsplash";
 
const Login = ({navigation}) => {

    useEffect(() =>{
        console.log("getting tokens from backend")
        const sleep = ms => new Promise(r => setTimeout(r, 2000));
        //const wait = sleep();
        if(true) navigation.navigate('Home');
    }, []);



    return (
        <View>
        <Text>fdsa</Text>
        </View>
    );
};
 
 
 
export default Login; 