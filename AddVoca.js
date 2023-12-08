import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addVocabulary, setUser } from './redux/action';

const URL_API = 'https://65443ae65a0b4b04436c2d4e.mockapi.io/jobstitle';

function AddVoca({ navigation, dispatch, dataUser }) {


    useEffect(() => {
        console.log("dataUser:", dataUser);
    }, [dispatch, dataUser]);

    const [english, setEnglish] = useState('');
    const [vietnamese, setVietnamese] = useState('');

    // add vocabulary trong redux store
    const handleAddVocabulary = () => {
        const englishToAdd = {
            voca: english,
            id: dataUser.english.length + 1
        }
        const vietnameseToAdd = {
            voca: vietnamese,
            id: dataUser.vietnamese.length + 1
        }

        dispatch(addVocabulary(english, vietnamese));
        dispatch(setUser({
            ...dataUser, english: [...dataUser.english, englishToAdd]
            , vietnamese: [...dataUser.vietnamese, vietnameseToAdd]
        }));
        console.log('add successfully!');
        // Xóa giá trị sau khi thêm vào để chuẩn bị cho lần nhập tiếp theo
        setEnglish('');
        setVietnamese('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{ borderWidth: 1, width: 350, height: 50, marginTop: 10, marginLeft: '5%' }}
                placeholder='english'
                onChangeText={(text) => setEnglish(text)}
            />
            <TextInput
                style={{ borderWidth: 1, width: 350, height: 50, marginTop: 30, marginLeft: '5%' }}
                placeholder='vietnamese'
                onChangeText={(text) => setVietnamese(text)}
            />
            <TouchableOpacity
                style={{ width: '90%', height: 50, marginLeft: '5%', borderBottomWidth: 1, marginTop: 20, backgroundColor: 'pink', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                onPress={handleAddVocabulary}
            >
                <Text>ADD</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
const mapStateToProps = (state) => ({
    dataUser: state.data,
});
export default connect(mapStateToProps)(AddVoca);