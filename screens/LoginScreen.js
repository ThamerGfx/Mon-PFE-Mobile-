import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet, 
TouchableOpacity, Text, Image, keyboard, 
TouchableWithoutFeedback, KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
//import { Google } from 'expo';
import Expo from 'expo';

import { signIn } from '../src/actions/authActions'
 
 var dismissKeyboard = require('dismissKeyboard');
 
class LoginScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
    drawerLockMode : 'locked-closed',
    tabBarVisible: false,
  }
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', };
 
    this.handleEmailChange = (email) => {
      this.setState({email: email})
    }
 
    this.handlePasswordChange = (password) => {
      this.setState({password: password})
    }
 
    this.handleButtonPress = () => {
      //this.props.onButtonPress(this.state.email, this.state.password)
      this.props.signIn(this.state);
      //console.log(dispatch);
    }
  }

  static navigationOptions = {
    header: null,
  };
   isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: 736881154753-aq3k005b7vcbf0jms4uuhmfjvctvsbb9.apps.googleusercontent.com,
        //iosClientId: YOUR_CLIENT_ID_HERE,
        //behavior: 'web',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
 
  render() {
    
    const auth = this.props.auth;
    if (auth.uid) return  this.props.navigation.navigate ('Animations');

    return (
        <View
          style={styles.container}>
          <KeyboardAvoidingView behavior='padding' style={styles.container} >
            <View style={styles.welcomeContainer}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.welcomeImage}
                />
              </View>

            <TextInput
              style={styles.textInput}
              placeholder="Email"
              returnKeyType='next'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              onSubmitEditing={dismissKeyboard}
              underlineColorAndroid={'transparent'} />

            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              returnKeyType='done'
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              onSubmitEditing={dismissKeyboard}
              underlineColorAndroid={'transparent'} />
    
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleButtonPress}>
    
              <Text style={styles.buttonTitle}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonGoogle}
              onPress={() => this.signInWithGoogleAsync()}>
    
              <Text style={styles.buttonTitle}>Sign In With Google</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
    )
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    authError: state.auth.authError,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent:'center',
  },
  textInput: {
    backgroundColor: '#ffffff',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
  },
  button: {
    backgroundColor: '#000000',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonGoogle: {
    backgroundColor: '#00ffff',
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
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff7676',
    fontSize: 18,
    fontWeight: 'bold',
  },
 });