import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';


import logo from '../assets/logo.png;'

export default function List() {
    const [techs, setTechs] = useState([]);

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