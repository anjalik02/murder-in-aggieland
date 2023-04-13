import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'; 
import * as Location from 'expo-location';
import {Image} from 'react-native' ;
import { useIsFocused } from '@react-navigation/native'

export default function GameMap({route, navigation}){
    const{user_id, username, game_id} = route.params; 
    const[currentLocation, setCurrentLocation] = useState(null);
    const[errorMsg, setErrorMsg] = useState(null);
    const[revLongitude, setRevLongitude] = useState(null); 
    const[revLatitude, setRevLatitude] = useState(null); 
    const[longitudeDestination, setLongitudeDestination] = useState(null);
    const[latitudeDestination, setLatitudeDestination] = useState(null);
    const isFocused = useIsFocused()

    const rePopulateData = async () =>
    {
      console.log("user_id: " + user_id);
      console.log("game_id: " + game_id);
      
      updateLocation();
      getCurrentDestination();
    }

    useEffect(() => {
      if(isFocused)
      {
          setCurrentLocation(null);
          setErrorMsg(null);
          setRevLongitude(null);
          setRevLatitude(null);
          setLongitudeDestination(null);
          setLatitudeDestination(null);
        
          rePopulateData();
      }
    }, [isFocused])

    const Clues = async () =>
    {
      navigation.navigate('Clues', 
      {
        user_id: user_id,
        username: username,
        game_id: game_id
      }); 
    }

    const handleArrival = async () => 
    {
      try 
      {
        const response = await fetch('https://murder-in-aggieland.herokuapp.com/API/game.php', 
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(
          {
            functionName: "checkUserReachedLocation",
            user_id: user_id,
            game_id: game_id,
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
          })
        });
        const data = await response.json();
        
        let hasReached = true;

        if(!hasReached)
          alert("You have not reached the building's location.")
        else
        {
          try 
          {
            const response = await fetch('https://murder-in-aggieland.herokuapp.com/API/game.php', 
            {
              method: 'POST',
              headers: 
              {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify(
              {
                functionName: "updateUserGamePriority",
                user_id: user_id,
                game_id: game_id
              })
            });
            const data = await response.json();

            navigation.navigate('Dialogue', 
            {
              user_id: user_id,
              username: username,
              game_id: game_id
            });    
          } 
          catch (error) 
          {
            console.error('Error:', error);
          }
        }
      } 
      catch (error) 
      {
        console.error('Error:', error);
      }
    }

    function sleep(ms) 
    {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updateLocation = async () => 
    {
      await sleep(2000);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getLastKnownPositionAsync({});

      loc.coords.latitude = parseFloat(loc.coords.latitude.toFixed(6));
      loc.coords.longitude = parseFloat(loc.coords.longitude.toFixed(6));
      setCurrentLocation(loc);
    }

    useEffect(() => 
    {
      if(currentLocation != null)
      {
        let latitude = 30.621923; 
        let longitude = 96.348665; 
        let latitudeDiff = 400-((latitude - currentLocation.coords.latitude) / 0.000025); 
        let longitudeDiff = (longitude - (currentLocation.coords.longitude * -1)) / 0.00009;
        setRevLatitude(latitudeDiff);
        setRevLongitude(longitudeDiff);

        console.log("New Rev Location: "+currentLocation.coords.latitude+" "+currentLocation.coords.longitude);
        console.log("Current Destination: "+latitudeDestination+" "+longitudeDestination);
        updateLocation();
      }
    }, [currentLocation]);

    const getCurrentDestination = async () =>
    {
      try 
      {
        const params = new URLSearchParams(
        {
          functionName: 'getCurrentDestination',
          user_id: user_id,
          game_id: game_id
        });
    
        const response = await fetch(`https://murder-in-aggieland.herokuapp.com/API/game.php?${params}`, 
        {
          method: 'GET',
          headers: 
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        const data = await response.json();
        setLongitudeDestination(data.longitude);
        setLatitudeDestination(data.latitude);
        return data; // Return the data from the API call
      } 
      catch (error) 
      {
        console.error('Error:', error);
        throw error; // Throw the error to be caught by the calling function
      }
    }

    useEffect(() => 
    {
      if(longitudeDestination != null && latitudeDestination != null)
      {
        console.log("Current dest "+longitudeDestination + " " + latitudeDestination);
      }
    }, [longitudeDestination, latitudeDestination]);

    return longitudeDestination!== null && latitudeDestination !== null && currentLocation !== null && longitudeDestination !== undefined && latitudeDestination !== undefined && currentLocation !== undefined ? 
    (
        <View style={styles.container}>
        <Text style={styles.header}>Current  Latitude: {currentLocation.coords.latitude}  </Text>
        <Text style={styles.header1}>Current Longitude:{currentLocation.coords.longitude}  </Text>
        <Text style={styles.header2}>Destination  Latitude: {longitudeDestination}  </Text>
        <Text style={styles.header3}>Destination  Longitude: {latitudeDestination}  </Text>

        <TouchableOpacity style={styles.button} onPress={handleArrival}>
          <Text style={styles.buttonText}>I've Arrived</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={Clues}>
          <Text style={styles.buttonText}>Clues</Text>
        </TouchableOpacity>
        
        <Image 
        source={require('./assets/Design.png')} 
        style={{width: 400, height: 400, position: 'absolute', bottom: 0}}
        />

        {revLongitude !== null && revLatitude !== null && (
          <Image
            source={require('./assets/rev.png')}
            style={{width: 30, height: 30, position: 'absolute', bottom: revLatitude, left: revLongitude}}
          />
        )}
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
    button2: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      position: 'absolute', 
      top: 200,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });