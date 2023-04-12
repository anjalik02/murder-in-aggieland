import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'; 
import * as Location from 'expo-location';
import {Image} from 'react-native' ;

export default function Dialogue({route, navigation})
{
    const{user_id, username, game_id} = route.params; 
    const[errorMsg, setErrorMsg] = useState(null);
    const[characterText, setCharacterText] = useState(null);

    const goBack = async () => 
    {
        navigation.navigate('Map', 
        {
            user_id: user_id,
            username: username,
            game_id: game_id,
        });
    }
    
    useEffect(() => 
    {
      
    }, []);

    // give the view a back button
    return true ? 
    (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </View>
    ) 
    :
    (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    )
    ; 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      position: 'absolute', 
      top: 40,
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    header1: {
      position: 'absolute', 
      top: 60,
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    header2: {
      position: 'absolute',
      top: 80,
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    header3: {
      position: 'absolute',
      top: 100,
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      width: '80%',
    },
    button: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      position: 'absolute', 
      top: 140,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });