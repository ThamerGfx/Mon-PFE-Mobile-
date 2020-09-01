import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  AppState,
  ActivityIndicator,
  TouchableHighlight ,
  Alert
} from 'react-native';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import haversine  from 'haversine';

import {prisePoste, finPoste} from '../src/actions/pointageAction';
import geolib from 'geolib';

const LOCATION_TASK_NAME = 'background-location-task';

class LocationScreen extends Component {
  state = {
    location: null,
    geocode: null,
    region: null,
    distance: null,
    errorMessage: null,
    isLocationModalVisible: false,
    appState: AppState.currentState,
    prise: true,
    fin: false,
    uid: ""
  };

  onPrisePoste = () => {
    const auth = this.props.auth;
    this.setState({
        uid : auth.uid
    });
    this.props.prisePoste(
        this.state.prise,
        this.state.uid
    )
    this._handlePressPrise();
    this.setState({
        prise: false,
        fin: true
    });
  }

   onFinPoste = () => {
    const auth = this.props.auth;
    this.setState({
      uid : auth.uid
    });
    this.props.finPoste(
        this.state.fin,
        this.state.uid
    );
    this._handlePressFin();
    this.setState({
        fin: false,
        prise: true
    });
   }

   _handlePressPrise = () => {
    Alert.alert(
      'Succès !',
      'Vous avez faire le prise de poste avec succès',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'OK',
        }
      ],
      { cancellable: false }
    );
  };

  _handlePressFin = () => {
    Alert.alert(
      'Succès !',
      'Vous avez faire le fin de poste avec succès',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'OK',
        }
      ],
      { cancellable: false }
    );
  };

  _handlePressAlert = () => {
    Alert.alert(
      'Alert !',
      'Vous avez pas de droit pour faire ça!!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        }
      ],
      { cancellable: false }
    );
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this._getLocationAsync();
    }
    this.setState({ appState: nextAppState });
  };

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

   componentDidMount() {
    this.onLocationUpdate();  
   }

   onLocationUpdate = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      distanceInterval:200,
      timeInterval:1000
    });
  };

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(location.coords);

      let country = geocode[0]['country'];
      let city = geocode[0]['city'];
      let street = geocode[0]['street'];
      
      console.log("current city:", city)

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      const start = region
      const end = {
        latitude: 27.950575,
        longitude: -82.457178
      }
      let distance = haversine(start, end, {unit: 'meter'});

      this.setState({ location, region, geocode, distance, country, city, street});
      console.log("distance :", this.state.distance)
      console.log("current street:", this.state.street)
      console.log("current street:", this.state.country)
      
      //this._getDistanceAsync(); 

    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };

  /* _getDistanceAsync = async () => {
    try {
      
      const distance = geolib.getDistance({ latitude: 51.5103, longitude: 7.49347 }, this.state.region)
      this.setState({ distance });
      console.log(this.state.distance)
    } catch (error) {
      console.log("error in get distance", error)
    }
  }; */

  openSetting = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    this.setState({ openSetting: false });
  };

  render() {
    let text = "Loading...";
    let textCity = "Loading...";
    let textCountry = "Loading...";
    let textDist = "Loading...";
    let distp = "Loading...";

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.geocode) {
      text = JSON.stringify(this.state.street);
      //const textStreet = JSON.stringify(this.state.street);
      textCity = JSON.stringify(this.state.city);
      textCountry = JSON.stringify(this.state.country)
      textDist = JSON.stringify(this.state.distance)
      distp = JSON.parse(textDist);
      //console.log("distance parsed", distp);
    }

    return (
      <View style={styles.container}>
        <Modal
          onModalHide={this.state.openSetting ? this.openSetting : undefined}
          isVisible={this.state.isLocationModalVisible}
        >
          <View
            style={{
              height: 300,
              width: 300,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              onPress={() =>
                this.setState({
                  isLocationModalVisible: false,
                  openSetting: true
                })
              }
              title="Enable Location Services"
            />
          </View>
        </Modal>

        <Text style={styles.title}>Vous étes maintenant dans :</Text>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>{textCity}</Text>
        <Text style={styles.paragraph}>{textCountry}</Text>

        <Text style={styles.title}>Vous étes loin de votre animation de</Text>
        <Text style={styles.paragraph}>{distp} métres</Text>

        <Button
          title="Prise de poste"
          style={styles.buttonPrise}
          onPress={ 
            this.state.prise && distp < 200
              ? this.onPrisePoste.bind(this) 
              : this._handlePressAlert.bind(this) 
          }
        />
        <Button
          title="Fin de poste"
          style={styles.buttonFin}
          onPress={ 
            this.state.fin && distp < 200
              ? this.onFinPoste.bind(this) 
              : this._handlePressAlert.bind(this) 
           }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
 return {
    pointage: state.firestore.ordered.pointage,
    auth: state.firebase.auth, 
 }
}

export default connect(mapStateToProps, {prisePoste, finPoste} )(LocationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonPrise: {
    margin: 24,
    textAlign: 'center',
    backgroundColor: 'green',
    left: 15,
  },
  buttonFin: {
    margin: 24,
    textAlign: 'center',
    backgroundColor: 'red',
    right: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
     marginBottom: 20,
  },
});