import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'; 
import * as Location from 'expo-location';
import {Image} from 'react-native' ;

export default function GameMap({route, navigation}){
    //const{user_id, username} = route.params; 
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const[xcoordinate, setxcoordinate] = useState(null); 
    const[ycoordinate, setycoordinate] = useState(null); 
    
  

    const update = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        /*
        const interval = setInterval(() => {
        
        }, 10000);
        */
      let location = await Location.getCurrentPositionAsync({});
      alert("hello"); 
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      let leftx = 30.621923; 
      let lefty = 96.348665; 
      let diffy = 400-((leftx - location.coords.latitude) / 0.00003557); 
      let diffx = (lefty - (location.coords.longitude * -1)) / 0.0000408; 
      
      
      setycoordinate(diffy); 
      setxcoordinate(diffx); 
      setLocation(location);

    }

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      let leftx = 30.621923; 
      let lefty = 96.348665; 
      let diffy = 400-((leftx - location.coords.latitude) / 0.00003557); 
      let diffx = (lefty - (location.coords.longitude * -1)) / 0.0000408; 
      setycoordinate(diffy); 
      setxcoordinate(diffx); 
      setLocation(location);
      })();
    }, []);

    //testing code 
    /*
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
    */
    return(
        <View style={styles.container}>
        <Text style={styles.header}> Latitude: {latitude}  </Text>
        <Text style={styles.header1}> Longitude:{longitude}  </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={update}
        >
        <Text style={styles.buttonText}>Update Location</Text>
      </TouchableOpacity>
        <Image 
        source={require('./assets/map.png')} 
        style={{width: 400, height: 400, position: 'absolute', bottom: 0}}
        />

        <Image 
        source={require('./assets/icon1.jpg')} 
        style={{width: 20, height: 20, position: 'absolute', bottom: ycoordinate, left: xcoordinate}}
        />
        </View>
    ); 
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
      top: 100,

    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });