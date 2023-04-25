import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Intro({route, navigation}) {
  const{user_id, username, game_id} = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Image source={require('./assets/blood-splatter.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.subheader}>Welcome to Aggieland, home of the 12th man! 
        We're glad you came because we really need your help.
        </Text>

        <Text style={styles.subheader}>
            Recently, we had a horrific accident on campus. An aggie was killed at 
            10:10 PM on Tuesday and the body was found by the Chem fountain. It is 
            truly a tragedy and we mourn the lost aggie. Your job, should you choose 
            to accept it, will be to find the killer before the day ends. 
            If not, the killer could strike again. It's up to you to save Aggieland.
        </Text>

        <Text style={styles.subheader}>
            Will you accept the mission?
        </Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            <TouchableOpacity 
                style={[styles.button, {marginTop: 40, backgroundColor: '#ff0000', width: '45%', marginRight: 10}]}
                onPress={() =>  navigation.navigate('User Home', {
                    user_id: user_id,
                    username: username,
                    game_id: game_id
                })}
            >
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, {marginTop: 40, backgroundColor: '#ff0000', width: '45%', marginLeft: 10}]}
                onPress={() =>  navigation.navigate('Map', {
                    user_id: user_id,
                    username: username,
                    game_id: game_id
                })}
            >
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            </View>


        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
  image: {
    height: 150,
    width: 150,
  },
});
