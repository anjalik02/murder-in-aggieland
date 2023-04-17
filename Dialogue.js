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
    const[gamePriority, setGamePriority] = useState(null);
    const[characterDialogue, setCharacterDialogue] = useState(null);
    const[characterName, setCharacterName] = useState(null);
    const[characterImage, setCharacterImage] = useState(null);

    const intro = require('./assets/rev.png');
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
        setCharacterName(data.names[gamePriority]);
        setCharacterImage(data.image_urls[gamePriority]);

        let dialogue = data.dialogue[gamePriority];
        dialogue = dialogue.split('\\n');

        setCharacterDialogue(dialogue);
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
      if(characterDialogue !== null && characterImage !== null && characterName !== null)
      {
        console.log("Character Info"+characterName+" "+characterDialogue+" "+characterImage);
      }
    }, [characterDialogue, characterName, characterImage]);

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
    return characterDialogue !== null && characterImage !== null && characterName !== null ? 
    (
        <View style={styles.container}>
          <Image
              source={getImage(gamePriority)}
              style={{width: 200, height: 200}}
            />
            {console.log(characterImage)}
          <Text style={styles.subheader}>{characterDialogue.join('\n\n')}</Text>

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
    justifyContent: 'top',
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
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });