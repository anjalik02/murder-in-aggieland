import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Switch } from 'react-native';
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
    const[gamePriority, setGamePriority] = useState(null);
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const isFocused = useIsFocused();

    const getGamePriority =  async () =>
    {
      try 
      {
        const params = new URLSearchParams(
        {
          functionName: 'getCurrentGamePriority',
          game_id: game_id,
          user_id: user_id
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
        setGamePriority(data.current_priority);
        console.log("Prio: "+data.current_priority);
        console.log("SETTING CURRENT PRIORITY");
        return data; // Return the data from the API call
      } 
      catch (error) 
      {
        console.error('Error:', error);
        throw error; // Throw the error to be caught by the calling function
      }      
    }

    const rePopulateData = async () =>
    {
      console.log("user_id: " + user_id);
      console.log("game_id: " + game_id);

      getGamePriority();
    }

    useEffect(() => 
    {
      console.log("Use Effect Priority"+ gamePriority);

      if(gamePriority !== null && gamePriority !== undefined)
      {
        if(gamePriority <= 5)
        {
          console.log("Good Priority")
          updateLocation();
          getCurrentDestination();
        }
        else
        {
          navigation.navigate('Guess', 
          {
            user_id: user_id,
            username: username,
            game_id: game_id
          }); 
        }
      }
    }, [gamePriority])

    useEffect(() => {
      if(isFocused)
      {
          setGamePriority(null);
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

    const Guess = async () =>
    {
      navigation.navigate('Guess', 
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
        
        let hasReached;
        useCurrentLocation ? hasReached = data.reached_location : hasReached = true;

        if(!hasReached)
          alert("You have not reached the building's location. (Toggle the Use Current Location button to play off-campus.)")
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

      // loc.coords.latitude = 30.6200987;
      // loc.coords.longitude = -96.3420;
      setCurrentLocation(loc);
    }

    useEffect(() => 
    {
      if(currentLocation != null)
      {
        let latitude = 30.614871; 
        let longitude = -96.335065; 
        let latitudeDiff = ((currentLocation.coords.latitude- latitude) / 0.007182) * 350 
        let longitudeDiff = (((currentLocation.coords.longitude-longitude) * -1)/0.009818) * 350
        setRevLatitude(latitudeDiff);
        setRevLongitude(longitudeDiff);

        //console.log("New Rev Location: "+currentLocation.coords.latitude+" "+currentLocation.coords.longitude + " " ,latitudeDiff + " " + longitudeDiff);
        //console.log("Current Destination: "+latitudeDestination+" "+longitudeDestination);
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
        let testlong = 30.617443; 
        let testlat = -96.339138
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

    return longitudeDestination!== null && latitudeDestination !== null && currentLocation !== null && longitudeDestination !== undefined && latitudeDestination !== undefined && currentLocation !== undefined && gamePriority !== null ? 
    (
        <View style={styles.container}>
        {gamePriority === "0" &&
          <Text style={styles.subsubheader2}>
            Thank you for accepting this challenge! To begin, you must start at 
            Zachry Education Complex. Once you reach there, the story can begin. Press "I've Arrived".
          </Text>
        }
        {gamePriority === "1" &&
          <Text style={styles.subheader}>
            Walk to Zachry Education Complex.
          </Text>
        }
        {gamePriority === "2" &&
          <Text style={styles.subheader}>
            Walk to John R. Blocker.
          </Text>
        }
        {gamePriority === "3" &&
          <Text style={styles.subheader}>
            Walk to SBISA Dining Hall.
          </Text>
        } 
        {gamePriority === "4" &&
          <Text style={styles.subheader}>
            Walk to the Architecture Quad.
          </Text>
        } 
        {gamePriority === "5" &&
          <Text style={styles.subheader}>
            Walk to Sterling C. Evans Library.
          </Text>
        }
        
        {(Math.round(currentLocation.coords.latitude * 10000) / 10000) < 30.627 && currentLocation.coords.latitude > 30.60 &&  currentLocation.coords.longitude < -96.334 &&  currentLocation.coords.longitude > -96.344 && 
        <Text style={styles.subsubheader}>
          Current Location: ({Math.round(currentLocation.coords.latitude * 10000) / 10000}, {Math.round(currentLocation.coords.longitude * 10000) / 10000})
         </Text>} 

        
         {!((Math.round(currentLocation.coords.latitude * 10000) / 10000) < 30.627 && currentLocation.coords.latitude > 30.60 &&  currentLocation.coords.longitude < -96.334 &&  currentLocation.coords.longitude > -96.344) && 
        <Text style={styles.subsubheader}>
            You are not on campus.
         </Text>} 

         <Text style={styles.subsubheader}>
          Destination Latitude Range: [{Math.round(latitudeDestination * 1000) / 1000 - 0.0001}, {Math.round(latitudeDestination * 1000) / 1000 + 0.0001}]
         </Text>
         <Text style={styles.subsubheader}>
          Destination Longitude Range: [{Math.round(longitudeDestination * 1000) / 1000 + 0.0001}, {Math.round(longitudeDestination * 1000) / 1000 - 0.0001}]
         </Text>

        <TouchableOpacity style={styles.button} onPress={handleArrival}>
          <Text style={styles.buttonText}>I've Arrived</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Clues}>
          <Text style={styles.buttonText}>Clues</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Guess}>
          <Text style={styles.buttonText}>Guess the Killer</Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Use Current Location</Text>
          <Switch
            value={useCurrentLocation}
            onValueChange={(value) => setUseCurrentLocation(value)}
          />
        </View>
        
        <Image 
        source={require('./assets/Design.png')} 
        style={{width: "100%", height: 350, position: 'absolute', bottom: 50, width: 425}}
        />

        {revLongitude !== null && revLatitude !== null && (
          <Image
            source={require('./assets/rev.png')}
            style={{width: 40, height: 40, position: 'absolute', bottom: revLatitude, right: revLongitude}}
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
      justifyContent: 'top',
      paddingHorizontal: 10
    },
    header: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    subheader: {
      marginTop: 20,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    subsubheader2: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10
    },
    subsubheader: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,
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
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      borderRadius: 10,
      marginBottom: 10,
      height: 40
    },
    buttonText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    toggleLabel: {
      marginRight: 10,
      color: '#fff',
      fontWeight: 'bold',
    },
  });