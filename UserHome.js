import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function UserHome({route, navigation}) {
  const { user_id, username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>

      <Text style={styles.subheader}>Current Games</Text>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Resume Game</Text>
      </TouchableOpacity>
      <Text style={styles.subheader}>New Game</Text>
      <TouchableOpacity 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>

      <Text style={styles.subheader}>Start New Game</Text>
      <TouchableOpacity 
        style={styles.button}
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
