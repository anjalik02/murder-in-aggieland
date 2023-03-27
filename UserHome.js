import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function UserHome({route, navigation}) {
  const { user_id, username } = route.params;

    return (
        <View style={styles.container}>
         <Text style={styles.header}>Welcome, {username}</Text>
         <TouchableOpacity
           style={styles.button}
         >
           <Text style={styles.buttonText}>Resume Game</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.button}
         >
           <Text style={styles.buttonText}>Start New Game</Text>
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
