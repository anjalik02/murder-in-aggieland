import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function HowToPlay() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Rules</Text>

      <Text style={styles.subheader}>1. If you have not already created an account, navigate to create an account</Text>
      <Text style={styles.subheader}>2. If you have an account, log in to your existing profile</Text>
      <Text style={styles.subheader}>3. Once you are logged in, you will have the option to resume game or restart the game</Text>
      <Text style={styles.subheader}>4. Inside the game, you will be able to see the map and scope of the game</Text>
      <Text style={styles.subheader}>5. Miss Rev is the icon that portrays your current location</Text>
      <Text style={styles.subheader}>6. There are five suspects that are currently on the list for murder</Text>
      <Text style={styles.subheader}>7. Travel to their respective locations and click “I've Arrived”</Text>
      <Text style={styles.subheader}>8. This will unlock their respective alibi</Text>
      <Text style={styles.subheader}>9. The clues will reveal which clues you have already discovered and which ones are yet to be unlocked</Text>
      <Text style={styles.subheader}>10. You have two chances to determine the murderer</Text>
      <Text style={styles.subheader}>11. Guess wrong both times and the murderer will remain a mystery!</Text>

      <Text style={styles.header}>Good luck!</Text>

      <Text style={styles.credits}>Created By: Vatsal Mistry, Rohan Talluri, Ashrita Vadlapatla, and Anjali Kumar for CSCE 445</Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20, // add some padding to the top and bottom
    paddingHorizontal: 10, // add some padding to the left and right
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
    fontStyle: 'italic',
    marginBottom: 10,
    width: '80%'
  },
  credits: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
    width: '80%'
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
