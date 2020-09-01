import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

 
class WelcomeScreen extends Component {
  

  static navigationOptions = {
    header: null,
  };
 
  render() {
    return (
      <View
        style={styles.container}>

        <Text style={styles.getStartedText}>Welcome To Aladinoo</Text>

        <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.welcomeImage}
            />
          </View>
 
        <TouchableOpacity
          style={styles.button}
          onPress={
              () => this.props.navigation.navigate ('Login', {})
            }
        >
 
          <Text style={styles.buttonTitle}>Get Started</Text>
 
        </TouchableOpacity>
 
      </View>
    )
  }
}
  
export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent:'center',
  },
 
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff7676',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent:'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
     marginBottom: 20,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  }

 });