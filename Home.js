import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteVocabulary } from './redux/action';

const URL_API = 'https://65443ae65a0b4b04436c2d4e.mockapi.io/jobstitle';

function Home({ navigation, dispatch, dataUser }) {


    useEffect(() => {
        console.log("dataUser:", dataUser);
    }, [dispatch, dataUser]);

    const dataEnglish = dataUser.english
    const dataVietnamese = dataUser.vietnamese
    const dataToRender = dataEnglish.map((item, index) => ({
        id: index.toString(), // Sử dụng index làm id (hoặc sử dụng id nếu có)
        content: item,
        translation: dataVietnamese[index] // Lấy từ mảng tiếng Việt tương ứng
    }));

    console.log(dataToRender);

    // đồng bộ với api
    const handlePushDataToAPI = () => {
        fetch(`${URL_API}/${dataUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUser),
        })
            .then(response => response.json())
            .then(updatedData => {

                console.log('Data successfully pushed to API:', updatedData);
            })
            .catch(error => {
                console.error('Error pushing data to API:', error);
            });
    }


    const renderItem = ({ item }) => {
        console.log("Rendering item:", item);
        return (
            <View style={{ width: '90%', height: 50, marginLeft: '5%', borderBottomWidth: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text>{item.content.voca}</Text>
                <Text>{item.translation.voca}</Text>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(deleteVocabulary(item.content.id))
                    }}
                >
                    <Text>delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '90%', height: 50, marginLeft: '5%', borderBottomWidth: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text>English</Text>
                <Text>Vietnamese</Text>
            </View>
            <View style={{ width: '90%', height: 200, marginLeft: '5%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <FlatList
                    data={dataToRender}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <TouchableOpacity
                style={{ width: '90%', height: 50, marginLeft: '5%', borderBottomWidth: 1, marginTop: 20, backgroundColor: 'pink', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('AddVoca');
                }}
            >
                <Text>ADD VOCABULARY</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: '90%', height: 50, marginLeft: '5%', borderBottomWidth: 1, marginTop: 20, backgroundColor: 'pink', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                onPress={handlePushDataToAPI}
            >
                <Text>Đồng bộ với api</Text>
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
export default connect(mapStateToProps)(Home);