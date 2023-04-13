import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import axios from 'axios'; 
import * as Location from 'expo-location';
import {Image} from 'react-native' ;

export default function Clues({route, navigation})
{
    const{user_id, username, game_id} = route.params; 
    const[errorMsg, setErrorMsg] = useState(null);
    const[gamePriority, setGamePriority] = useState(null);
    const[unlockedCharactersData, setUnlockedCharactersData] = useState(null);

    const intro = require('./assets/Chef.png');
    const builder = require('./assets/Builder.png');
    const architect = require('./assets/Architect.png');
    const librarian = require('./assets/Librarian.png');
    const chef = require('./assets/Chef.png');
    const professor = require('./assets/Professor.png');

    const goBack = async () => 
    {
        navigation.navigate('Map', 
        {
            user_id: user_id,
            username: username,
            game_id: game_id,
        });
    }

    const populateCharacter = async () =>
    {
      try 
      {
        const params = new URLSearchParams(
        {
          functionName: 'getCharacterDisplayData',
          game_id: game_id,
        });
      
        const response = await fetch(`https://murder-in-aggieland.herokuapp.com/API/character.php?${params}`, 
        {
          method: 'GET',
          headers: 
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      
        const data = await response.json();
        
        setUnlockedCharactersData(data);

        return data; // Return the data from the API call
      } 
      catch (error) 
      {
        console.error('Error:', error);
        throw error; // Throw the error to be caught by the calling function
      }      
    }

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
        setGamePriority(data.current_priority - 1);
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
      getGamePriority();
    }, []);

    useEffect(() => 
    {
      if(gamePriority !== null)
      {
        console.log("GAME PRIORITY: "+ gamePriority);
        populateCharacter();
      }
    }, [gamePriority]);

    useEffect(() => 
    {
      if(unlockedCharactersData !== null)
      {
        console.log(unlockedCharactersData);
      }
    }, [unlockedCharactersData]);

    const getImage = (index) =>
    {
        if(index===0)
            return intro;
        else if(index===1)
          return builder
        else if(index===2)
          return professor
        else if(index===3)
          return chef;
        else if(index===4)
          return architect;
        else
          return librarian;
    }

    // give the view a back button
    return unlockedCharactersData !== null ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={goBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            {unlockedCharactersData.descriptions.map((description, index) => {
            if (index <= gamePriority) {
              return (
                <View key={index} style={styles.characterContainer}>
                  <Image source={getImage(index)} style={styles.characterImage} />
                  <View style={styles.characterDetails}>
                    <Text style={styles.characterName}>
                      {unlockedCharactersData.names[index]}
                    </Text>
                    <Text style={styles.characterDescription}>{description}</Text>
                    <Text style={styles.characterDialogue}>
                      {unlockedCharactersData.dialogue[index]}
                    </Text>
                  </View>
                </View>
              );
            } else {
              return null;
            }
          })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Loading...</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 50,
    },
    header: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: "#000",
      fontSize: 18,
      fontWeight: "bold",
    },
    characterContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#222",
      borderRadius: 10,
      padding: 10,
      margin: 10,
      width: "90%",
    },
    characterImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 10,
    },
    characterDetails: {
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    characterName: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    characterDescription: {
      color: "#fff",
      fontSize: 14,
      marginBottom: 5,
    },
    characterDialogue: {
      color: "#fff",
      fontSize: 12,
      fontStyle: "italic",
    },
  });