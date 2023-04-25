import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';
import HowToPlay from './HowToPlay';
import UserHome from './UserHome';
import Intro from './Intro';
import GameMap from './GameMap';
import Dialogue from './Dialogue';
import Clues from './Clues';
import Guess from './Guess';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Murder in Aggieland',
          headerShown: false}}
        />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="How to Play" component={HowToPlay} />
        <Stack.Screen name="User Home" component={UserHome} options={{headerShown: false}}/>
        <Stack.Screen name="Introduction" component={Intro} />
        <Stack.Screen name ="Map" component = {GameMap} />
        <Stack.Screen name="Dialogue" component = {Dialogue} />
        <Stack.Screen name="Clues" component = {Clues} />
        <Stack.Screen name="Guess" component = {Guess} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={require('./assets/knife.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.header}>Murder in Aggieland</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Account')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Log In')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.learnButton]}
          onPress={() => navigation.navigate('How to Play')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Learn How to Play</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  learnButton: {
    backgroundColor: '#bf0e0e',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
});