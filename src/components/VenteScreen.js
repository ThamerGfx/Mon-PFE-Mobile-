import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator, 
  Text, 
  Image, 
  FlatList, 
  Card, 
  TouchableNativeFeedback, 
  TouchableOpacity, 
  keyboard, 
  TouchableWithoutFeedback, 
  Alert 
  } from 'react-native'
import { connect } from 'react-redux'
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import {addVente, getProducts} from '../actions/ventesAction';

var dismissKeyboard = require('dismissKeyboard');
 
class VenteScreen extends Component {

  static navigationOptions = {
    header: "Les ventes",
  };
 
  state = {
    produit: '', 
    quantity: '', 
    prix: '',
    uid: ''
  };
  componentDidMount() {
    this.props.getProducts();
  }

  onAddVentes = () => {
    const auth = this.props.auth;
    this.setState({
      uid : auth.uid
    });
    this.props.addVente(
      this.state.produit,
      this.state.quantity,
      this.state.prix,
      this.state.uid
    )
    this._handlePress();
    this.setState({
      produit: "", 
      quantity: "", 
      prix: "",
    });
  }

   _handlePress = () => {
    Alert.alert(
      'Succès !',
      'Vous avez envoyer les ventes avec succès',
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
 
  render() {

    const { produits } = this.props || []
    console.log("getting produits: ", produits);
    if (!produits) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <Text>Loading ...</Text>
            </View>
        )
    }

    return (
        <View
          style={styles.container}>

          <View style={styles.welcomeContainer}>
            <Text style={styles.topText}>Saisie les ventes :</Text>
          </View>

          

          <TextInput
            style={styles.textInput}
            placeholder="Produit"
            returnKeyType='next'
            value={this.state.produit}
            onChangeText={(produit) => this.setState({produit})}
            onSubmitEditing={dismissKeyboard}
            underlineColorAndroid={'transparent'} />

          <TextInput
            style={styles.textInput}
            placeholder="Quantity"
            keyboardType='numeric'
            returnKeyType='next'
            value={this.state.quantity}
            onChangeText={(quantity) => this.setState({quantity})}
            onSubmitEditing={dismissKeyboard}
            underlineColorAndroid={'transparent'} />

            <TextInput
            style={styles.textInput}
            placeholder="Prix"
            returnKeyType='done'
            keyboardType='numeric'
            value={this.state.prix}
            onChangeText={(prix) => this.setState({prix})}
            onSubmitEditing={dismissKeyboard}
            underlineColorAndroid={'transparent'} />
  
          <TouchableOpacity
            style={styles.button}
            onPress={this.onAddVentes.bind(this)}
            > 
  
            <Text style={styles.buttonTitle}>Send</Text>
  
          </TouchableOpacity>
          
        </View>
    )
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return{
    produits: state.firestore.ordered.produits,
    auth: state.firebase.auth,
    products: state.vente
  }
}

export default compose(
   connect(mapStateToProps, { addVente, getProducts }),
   firestoreConnect([
       { collection: 'produits'},
   ]))(VenteScreen);

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
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
 });

  /* renderItem = ( {item} ) => {
    return (
      <View style={styles.row}>
      <TouchableOpacity
        onPress={ () => { this.setState({produit}) } }
        style={{ backgroundColor: item.selected ? 'orange' : 'white' }}
      >
        <Card containerStyle={{  borderRadius: 5 }} >
          <Text style={styles.message} >{item.nom_prod}</Text>
        </Card>
      </TouchableOpacity>
      </View>
    );
  } */ 

  

 {/* <ActivityIndicator size="large" /> */} 

      {/* <FlatList
          data={produits}
          renderItem={this.renderItem}
          inverted
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* background={TouchableNativeFeedback.Ripple('#FFF')} */}