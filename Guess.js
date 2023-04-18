import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Row, Image } from 'react-native';

export default function Guess({route, navigation}) {
  const{user_id, username, game_id} = route.params;
  const[currentCharacter, setCurrentCharacter] = useState(null);
  const intro = require('./assets/rev.png');
  const builder = require('./assets/Builder.png');
  const architect = require('./assets/Architect.png');
  const librarian = require('./assets/Librarian.png');
  const chef = require('./assets/Chef.png');
  const professor = require('./assets/Professor.png');

  const handleGuess = async () =>
    {
      if(currentCharacter === null || currentCharacter === undefined)
      {
        alert("Please select a character.");
        return;
      }

      console.log("GUESSING: "+(currentCharacter));
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
                functionName: "placeGuess",
                user_id: user_id,
                game_id: game_id,
                character_guess_id: currentCharacter
              })
            });
            const data = await response.json();

            const winner = data.code === 0;

            if(winner)
            {
              alert("Congratulations, you guessed the killer!");

              navigation.navigate('User Home', 
              {
                  user_id: user_id,
                  username: username
              });
            }
            else
            {
              if(data.code === 1)
                alert("Incorrect Guess");
              else
              {
                alert("You lost. Too many incorrect guesses. Feel free to play again.");

                navigation.navigate('User Home', 
                {
                    user_id: user_id,
                    username: username
                });
              }
            }
          } 
          catch (error) 
          {
            console.error('Error:', error);
          }
    }

    const selectCurrent = async (index) =>
    {
      if(index != 0)
        setCurrentCharacter(index);
      
        
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Guess the Killer
        </Text>

        <TouchableOpacity
            style={[styles.characterContainer, currentCharacter === 1 && styles.selectedCharacterContainer]}
            onPress={() => selectCurrent(1)}
        >
            <Image source={builder} style={styles.characterImage}/>
            <View style={styles.characterDetails}>
                <Text style={[styles.characterName]}>
                    Builder
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.characterContainer, currentCharacter === 2 && styles.selectedCharacterContainer]}
            onPress={() => selectCurrent(2)}
        >
            <Image source={professor} style={styles.characterImage}/>
            <View style={styles.characterDetails}>
                <Text style={[styles.characterName]}>
                    Professor
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.characterContainer, currentCharacter === 3 && styles.selectedCharacterContainer]}
            onPress={() => selectCurrent(3)}
        >
            <Image source={chef} style={styles.characterImage}/>
            <View style={styles.characterDetails}>
                <Text style={[styles.characterName]}>
                    Chef
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.characterContainer, currentCharacter === 4 && styles.selectedCharacterContainer]}
            onPress={() => selectCurrent(4)}
        >
            <Image source={architect} style={styles.characterImage}/>
            <View style={styles.characterDetails}>
                <Text style={[styles.characterName]}>
                    Architect
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.characterContainer, currentCharacter === 5 && styles.selectedCharacterContainer]}
            onPress={() => selectCurrent(5)}
        >
            <Image source={librarian} style={styles.characterImage}/>
            <View style={styles.characterDetails}>
                <Text style={[styles.characterName]}>
                    Librarian
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.placeGuessButton} onPress={() => handleGuess()}>
            <Text style={styles.placeGuessButtonText}>Place Guess</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  box: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '90%',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subheader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeGuessButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  placeGuessButtonText: {
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
  selectedCharacterContainer: {
    borderColor: 'red',
    borderWidth: 2,
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
  },
});
