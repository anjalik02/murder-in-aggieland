import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';
import HowToPlay from './HowToPlay';
import UserHome from './UserHome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Murder in Aggieland' }}
        />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="How to Play" component={HowToPlay} />
        <Stack.Screen name="User Home" component={UserHome} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
     <View style={styles.container}>
      <Text style={styles.header}>Murder in Aggieland</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Create Account')}
      >
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Log In')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('How to Play')}
      >
        <Text style={styles.buttonText}>How to Play</Text>
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
