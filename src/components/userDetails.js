import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, TouchableHighlight, View, Alert, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import {updateUser, getUser} from '../actions/userAction';

class UserDetails extends Component {
  state = {
    modalVisible: false,
    displayName: "nom"
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount() {
    this.props.getUser();
    this.setState({
      displayName: JSON.stringify(this.props.userR.data.displayName),
    }) 
  }

  saveUpdate=()=>{
    this.props.updateUser({
      displayName: this.state.displayName,
    })
    this.setState({
      displayName: "",
    }) 
    console.log("state after save update : ", state) 
  }

  render() {

    return (
      <View style={styles.container}>
        <Modal
          presentationStyle= "overCurrentContext "
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Updating user has been cancelled.'); this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer} >

              <View style={styles.header}>
                <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80'}}/>
              </View>
              <View style={styles.body}>
                  <Text style={{
                    flex: 1,
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40,
                    padding: 40,
                    flexDirection: 'row',
                }} >Editer votre info!</Text>
                 
                  <TextInput
                    editable = {true}
                    maxLength = {40}
                    onChangeText={(text) => this.setState({displayName: text})}
                    value={this.state.displayName}
                    placeholder={"Nom et prénom"}
                  />
                  
              </View>

              <TouchableHighlight  
                style={styles.button}
                onPress={() => { this.saveUpdate }}>
                <Text style={styles.buttonTitle} >Save</Text>
              </TouchableHighlight>

              <TouchableHighlight  
                style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonTitle} >Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.modal}>Edit User</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
 return {
   users: state.firestore.ordered.users,
   userR: state.userR
 }
}

export default compose(
   connect(mapStateToProps, {updateUser, getUser}),
   firestoreConnect([
       { collection: 'users'},
   ]))(UserDetails);

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    //flex: 1,
    //backgroundColor: '#00000080',
    flexDirection: 'column',
    alignItems: 'center'
  },
   innerContainer: {
    //alignItems: 'center',
    width: 100, 
    height: 100,
  }, 
  modal: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  button: {
    flex: 1,
    bottom: 0,
    backgroundColor: '#ff7676',
    height: 30,
    margin: 10,
    borderRadius: 5,
    padding: 30,
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    marginTop:50,
    flexDirection: 'row',
  },
  buttonTitle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent:'center'
  },
  header:{
    backgroundColor: "#00BFFF",
    height:20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:90,
    alignSelf:'center',
    //position: 'absolute',
    justifyContent:'flex-start',
    marginTop:10,
    padding:30,
     flexDirection: 'column',
  },
  body:{
    marginTop:20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
});