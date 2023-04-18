import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

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
          navigation.navigate('Introduction', {
            user_id: user_id,
            username: username,
            game_id: data.game_ids[0]
          });        
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
            alert("Successful game creation. Press Resume Game.");
          })
          .catch(error => {console.error('Error:', error);});
        }
        else{
          Alert.alert(
            "End Current Game",
            "Are you sure you want to end the current game and start a new one?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Yes", onPress: () => {
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
                        functionName: "unenrollUserFromGame",
                        user_id: user_id,
                        game_id: 1
                    })
                })
                .then(response => response.json())
                .then(data => {console.log(data);
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
                    alert("Successful game creation. Press Resume Game.");
                  })
                  .catch(error => {console.error('Error:', error);});
                })
                .catch(error => {console.error('Error:', error);});
              } }
            ]
          );
        }
      })
      .catch(error => {console.error('Error:', error);});
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.box}>

        <Text style={styles.header}>Welcome, {username}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={returnCurrentGames}
        >
          <Text style={styles.buttonText}>Resume Game</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={enrollUserInGame}
        >
          <Text style={styles.buttonText}>Create/Restart Game</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, {marginTop: 40, backgroundColor: '#ff0000'}]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '90%',
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
    width: '90%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',

  },
});
