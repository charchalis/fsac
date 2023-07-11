import AsyncStorage from '@react-native-async-storage/async-storage';


const postCreateAccount = async (userImage, username, password, firstName, lastName) => {
    
    
    console.log(userImage)
    console.log(username)
    console.log(password)
    console.log(firstName)
    console.log(lastName)

    const data = new FormData();

    data.append('username', username);
    data.append('password', password);
    data.append('firstName', firstName);
    data.append('lastName', lastName);

    data.append('fileData', {
        uri : userImage.uri,
        type: userImage.type,
        name: userImage.fileName
    });

    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data
    };

    const test = await fetch("http://192.168.1.254:3000/" + "createAccount", config)
    
    console.log("test")
    console.log(test)
    console.log("test.status")
    console.log(test.status)
    console.log("test.json()")
    
    const testJson = await test.json()
    console.log(testJson)

    const token = testJson.token
    
    console.log(token)

    
    try {
        await AsyncStorage.setItem('JWT_TOKEN', token);
        console.log('Token stored successfully.');
    } catch (error) {
        console.log('Error storing data: ', error);
    }
    
    return test.status === 200

    
    

}
export default postCreateAccount;