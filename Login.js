import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { setUser } from './redux/action';
import { connect } from 'react-redux';

const URL_API = 'https://65443ae65a0b4b04436c2d4e.mockapi.io/jobstitle';

function Login({ navigation, dispatch, dataUser }) {




    const [data, setData] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // get api
    useEffect(() => {
        fetch(URL_API, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            setData(data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleLogin = () => {
        const user = data.find((user) => user.username === username && user.password === password);
        console.log(user);
        if (user) {
            console.log("Login Successful");
            dispatch(setUser(user))
            navigation.navigate('Home')
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>login</Text>
            <TextInput
                style={{ borderWidth: 1, width: 350, height: 50, marginTop: 10 }}
                placeholder='input your username'
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={{ borderWidth: 1, width: 350, height: 50, marginTop: 30 }}
                placeholder='input your password'
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
                style={{ borderWidth: 1, width: 350, height: 50, marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink' }}
                onPress={handleLogin}
            >
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
const mapStateToProps = (state) => ({
    dataUser: state.data,
});
export default connect(mapStateToProps)(Login);