import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'; 
import * as Location from 'expo-location';
import {Image} from 'react-native' ;

export default function GameMap({route, navigation}){
    const{user_id, username, game_id} = route.params; 
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const[xcoordinate, setxcoordinate] = useState(null); 
    const[ycoordinate, setycoordinate] = useState(null); 
    const[currentXDestination, setcurrentXDestination] = useState(null);
    const[currentYDestination, setcurrentYDestination] = useState(null);
    const[startXDestination, setstartXDestination] = useState(null);
    const[startYDestination, setstartYDestination] = useState(null);
    const[hasStarted, sethasStarted] = useState(null);
    
    const handleArrival = () => 
    {
      alert(startXDestination+" "+startYDestination+" "+hasStarted+" "+currentXDestination+" "+currentYDestination);
    }

    const update = async () => 
    {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      let leftx = 30.621923; 
      let lefty = 96.348665; 
      let diffy = 400-((leftx - location.coords.latitude) / 0.000025); 
      let diffx = (lefty - (location.coords.longitude * -1)) / 0.00009;
      
      setycoordinate(diffy); 
      setxcoordinate(diffx); 
      setLocation(location);
    }

    const getStartDestination = async () =>
    {
      try {
        const params = new URLSearchParams({
          functionName: 'getStartDestination',
          game_id: game_id
        });
    
        const response = await fetch(`https://murder-in-aggieland.herokuapp.com/API/game.php?${params}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        const data = await response.json();
        setstartXDestination(data.x_coordinate);
        setstartYDestination(data.y_coordinate);
        return data; // Return the data from the API call
      } catch (error) {
        console.error('Error:', error);
        throw error; // Throw the error to be caught by the calling function
      }
    }

    
    const getCurrentDestination = async () =>
    {
      try {
        const params = new URLSearchParams({
          functionName: 'getCurrentDestination',
          user_id: user_id,
          game_id: game_id
        });
    
        const response = await fetch(`https://murder-in-aggieland.herokuapp.com/API/game.php?${params}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        const data = await response.json();
        setcurrentXDestination(data.x_coordinate);
        setcurrentYDestination(data.y_coordinate);
        console.log("Data dest: "+data.x_coordinate);
        return data; // Return the data from the API call
      } catch (error) {
        console.error('Error:', error);
        throw error; // Throw the error to be caught by the calling function
      }
    }

    const checkHasGameStarted = async () =>
    {
      fetch('https://murder-in-aggieland.herokuapp.com/API/game.php', 
      {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(
          {
              functionName: "checkHasGameStarted",
              user_id: user_id,
              game_id: game_id
          })
      })
      .then(response => response.json())
      .then(data => 
      {
        sethasStarted(data.has_game_started);
      })
      .catch(error => {console.error('Error:', error);});
    }
    
    useEffect(() => 
    {
      let intervalId;
      const startUpdating = async () => 
      { 
        intervalId = setInterval(() => {update();}, 5000);
      };
      startUpdating();
    
      console.log("user_id: " + user_id);
      console.log("game_id: " + game_id);
      
      const runAsyncFunctions = async () => 
      {
        await getStartDestination();
        await checkHasGameStarted();
        
        if (hasStarted) 
        {
          await getCurrentDestination();
        } 
        else 
        {
          setcurrentXDestination(startXDestination);
          setcurrentYDestination(startYDestination);
        }
      };
      
      runAsyncFunctions();
    
      return () => clearInterval(intervalId);
    }, []);

    return currentXDestination!== null && currentYDestination !== null ? 
    (
        <View style={styles.container}>
        <Text style={styles.header}> Latitude: {latitude}  </Text>
        <Text style={styles.header1}> Longitude:{longitude}  </Text>
        <TouchableOpacity style={styles.button} onPress={handleArrival}>
          <Text style={styles.buttonText}>I've Arrived</Text>
        </TouchableOpacity>
        
        <Image 
        source={require('./assets/Design.png')} 
        style={{width: 400, height: 400, position: 'absolute', bottom: 0}}
        />

        {xcoordinate !== null && ycoordinate !== null && (
          <Image
            source={require('./assets/rev.png')}
            style={{width: 30, height: 30, position: 'absolute', bottom: ycoordinate, left: xcoordinate}}
          />
        )}
        </View>
    ) 
    :
    (
      // black screen with white text that says "Loading..."
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