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

  function handleHome() {
    navigation.navigate('User Home', 
      {
          user_id: user_id,
          username: username
      });
  }

  function handleClues() {
    navigation.navigate('Clues', 
      {
        user_id: user_id,
        username: username,
        game_id: game_id
      });
  }

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
              alert("Congratulations, you guessed the killer! \n The builder claims to be working on the fountain at 10 PM though her hours end by 5 PM. She would also be too busy with the new Zach expansion to be working on anything else. \n\n \"I'm so sorry! I didn't mean to kill the poor Aggie. It was an accident! I was walking back home with my ladder and accidently struck the poor student! Please don't arrest me!\"");

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
        <Text style={styles.header}>Guess the Killer</Text>
        <Text style={styles.subheader}>You have two guesses.</Text>

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

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => handleHome()}>
              <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClues()}>
              <Text style={styles.buttonText}>Clues</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.placeGuessButton} onPress={() => handleGuess()}>
              <Text style={styles.placeGuessButtonText}>Place Guess</Text>
          </TouchableOpacity>
        </View>

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
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 50,
    marginLeft: 5,
    marginRight: 5
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
    marginLeft: 5,
    marginRight: 5
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
