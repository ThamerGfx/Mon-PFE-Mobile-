import React from 'react';
import { StyleSheet, Text, View, TextInput,
       Keyboard, KeyboardAvoidingView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Header, Left, Container, Icon } from 'native-base'
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import {addChat, deleteChat, updateChat} from '../src/actions/chat_action';

class SettingsScreen extends React.Component {
  /*static navigationOptions = {
    title: 'Chat Screen',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#ff7676',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };*/
   state = {
       id: "",
       chat_input: "",
       updated: false,
   }
 
   onNewChat = () => {

       this.props.addChat(
           this.state.chat_input
       )
       this.setState({
           chat_input: ""
       });
       Keyboard.dismiss();
   }

    handleUpdate  = (id, chat_input) => {
        this.setState(
            {
                id:id,
                chat_input: chat_input,
                updated: true,
            }
        )
    }
    saveUpdate=()=>{
        this.props.updateChat({
            chatInput: this.state.chat_input,
            id: this.state.id
        })
        this.setState({
            chat_input: "",
       })  
     }

   renderItem = ( {item} ) => {
       return (
           <View style={styles.row}>
               <Text style={styles.message} >{item.msg}</Text>
               <TouchableOpacity
                    style={styles.button}
                    onPress={ () => {this.props.deleteChat(item.id)} }
                >
                  <Image
                    source={require('../assets/images/trash2.png')}
                    fadeDuration={0}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={ () => { this.handleUpdate(item.id, item.msg)/*; this.props.deleteChat(item.id)*/ } }
                >
                  <Image
                    source={require('../assets/images/edit.png')}
                    fadeDuration={0}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
           </View>
       );
   }

  render() {
    const { thread } = this.props || []

       if (!thread) {
           return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
           )
       }
    return ( 
        
       <View style={styles.container}>

       <Container>
            <Header style={styles.drawer}>
                <Icon name="md-menu" onPress={() => this.props.navigation.openDrawer() } />
            </Header>
        </Container>

               <FlatList
                   data={thread}
                   renderItem={this.renderItem}
                   inverted
                   keyExtractor={(item, index) => index.toString()}  
               />
               <KeyboardAvoidingView behavior="padding">
                   <View style={styles.footer}>
                       <TextInput
                           value={this.state.chat_input}
                           onChangeText={text => this.setState({ chat_input: text })}
                           style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Type something nice"
                       />
                       <TouchableOpacity onPress={
                            this.state.updated
                                ? this.saveUpdate
                                : this.onNewChat.bind(this)
                            }
                        >
                           <Text style={styles.send}>Send</Text>
                       </TouchableOpacity>
                   </View>
               </KeyboardAvoidingView>
           </View>
    );
  }
}
const mapStateToProps = (state) => {
 return {
   thread: state.firestore.ordered.chat 
 }
}

export default compose(
   connect(mapStateToProps, {addChat, deleteChat, updateChat}),
   firestoreConnect([
       { collection: 'chat'},
   ]))(SettingsScreen);

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#fff',
   },
   row: {
       padding: 20,
       borderBottomWidth: 1,
       borderBottomColor: '#eee',
       flexDirection: 'row',
       justifyContent: 'flex-end',
   },
   message: {
       fontSize: 18,
       flex: 1,
   },
   sender: {
       fontWeight: 'bold',
       paddingRight: 10,
   },
   footer: {
       flexDirection: 'row',
       backgroundColor: '#eee',
   },
   input: {
       paddingHorizontal: 20,
       paddingVertical: 10,
       fontSize: 18,
       flex: 1,
   },
   send: {
       alignSelf: 'center',
       color: 'lightseagreen',
       fontSize: 16,
       fontWeight: 'bold',
       padding: 20,
   },
    button: {
    height: 20,
    borderRadius: 30,
    padding: 5,
    //marginLeft:100,
    marginRight:10,
  },
  buttonEdit: {
    height: 20,
    borderRadius: 30,
    padding: 5,
  },
  drawer: {
    height: 50,
    paddingRight: 250,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 30,
    justifyContent: 'flex-start',
    //marginLeft:30,
    //marginRight:10,
  },
});
