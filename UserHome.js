import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function UserHome({route, navigation}) {
  const { user_id, username } = route.params;

  const returnCurrentGames = () => {
    const params = new URLSearchParams(
      {
          functionName: 'getCurrentGames',
          user_id: user_id
      });
        
      fetch(`https://murder-in-aggieland.herokuapp.com/API/users.php?${params}`, 
      {
          method: 'GET',
          headers: 
          {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.message === "Failed to get current games"){
          alert("No game to resume.");
        }
        else{
          alert("TODO: Resume Game Page");
        }
      })
      .catch(error => {console.error('Error:', error);});
  }

  const enrollUserInGame = () => {
    const params = new URLSearchParams(
      {
          functionName: 'getCurrentGames',
          user_id: user_id
      });
        
      fetch(`https://murder-in-aggieland.herokuapp.com/API/users.php?${params}`, 
      {
          method: 'GET',
          headers: 
          {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.message === "Failed to get current games"){
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
                  functionName: "enrollUserInGame",
                  user_id: user_id,
                  game_id: 1
              })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert("Successful game creation");
          })
          .catch(error => {console.error('Error:', error);});
        }
        else{
          alert("TODO: Reset game");
        }
      })
      .catch(error => {console.error('Error:', error);});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>

      <Text style={styles.subheader}>Current Game</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={returnCurrentGames}
      >
        <Text style={styles.buttonText}>Resume Game</Text>
      </TouchableOpacity>
      <Text style={styles.subheader}>New Game</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={enrollUserInGame}
      >
        <Text style={styles.buttonText}>Create New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, {marginTop: 40}]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
