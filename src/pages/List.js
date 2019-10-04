import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';


import logo from '../assets/logo.png;'

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.31:8024', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })

        })
    })

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArary = storageTechs.split(',').map(tech => tech.trim());
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <image style={styles.logo} source={logo}/>
        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/> )}
        </ScrollView>  

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    }
})