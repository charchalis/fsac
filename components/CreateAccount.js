import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNBootSplash from "react-native-bootsplash";

import Home from './Home';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
 
const CreateAccount =  ({navigation}) => {

    const [imageUri, setImageUri] = useState(false);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(false);
    

    useEffect(() =>{
        RNBootSplash.hide({fade: true}) 
    }, []);

    useEffect(() =>{
        
        if(warning){
            const begone = async () => {
                console.log("going to sleep")
                await new Promise(r => setTimeout(r, 1000))
                console.log("waking up")
                setWarning(false);
            };
            begone();    
        } 
    }, [warning]);

    const signIn = () => {
        if (!imageUri || !username || !password || !firstName || !lastName){
            setWarning(true);
            return false;
        }
        navigation.navigate(Home);
    }

    const getImage = async () => {

        let options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        await launchImageLibrary(options, (response) => {
            console.log("response: ", response)
            setImageUri(response.assets[0].uri);
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: "#091212", padding: 20}}>
            <View style={{flex: 1, justifyContent: 'center',backgroundColor: '#091212'}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10}}>
                    
                    <TouchableOpacity onPress={ async () => getImage()} style={{marginRight: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#555', borderRadius: 1000}}>
                        {
                            imageUri ? <Image source={{uri: imageUri}} style={{backgroundColor: "#fff", height: 125, width: 125, borderRadius: 1000}}/>:
                            <FontAwesomeIcon icon={faPlus} color={'#555'} size={50} style={{margin: 30}}/>
                        }
                    </TouchableOpacity>
                    
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        
                        <TextInput value={username} onChangeText={setUsername} placeholder={'username'}
                            style={{flexDirection: 'row', borderWidth: 1, borderColor: "#555", marginBottom: 10, paddingLeft: 10}}/>
                        
                        <TextInput value={password} onChangeText={setPassword} placeholder={'password'} secureTextEntry={true}
                            style={{borderWidth: 1, borderColor: "#555", paddingLeft: 10}}/>
                    
                    </View>
                </View>

                <TextInput value={firstName} onChangeText={setFirstName} placeholder={'first name'}
                        style={{flexDirection: 'row', borderWidth: 1, borderColor: "#555", marginBottom: 10, paddingLeft: 10}}/>

                <TextInput value={lastName} onChangeText={setLastName} placeholder={'last name'}
                        style={{flexDirection: 'row', borderWidth: 1, borderColor: "#555", marginBottom: 10, paddingLeft: 10}}/>

                {warning? <Text style={{backgroundColor: "#f00", padding: 10, fontSize: 20}}>Fill everything, you idiot!</Text>:<></>}
            </View>

            <TouchableOpacity onPress={ () => signIn()} style={{alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#555', borderRadius: 10}}>
                <Text style={{fontSize: 30, color: "#888"}}>sign in</Text>
            </TouchableOpacity>

        </View>

       
    );
};
 
 
 
export default CreateAccount; 