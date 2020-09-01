import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, StatusBar, TouchableOpacity, TouchableHighlight, View} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux'
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { signOut } from '../src/actions/authActions'
import { getUser } from '../src/actions/userAction'
import UserDetails from '../src/components/userDetails'
//import ModalDetails from '../src/components/ModalDetails'

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {

    static navigationOptions = {
    header: null,
    };
    constructor(props) {
      super(props); 
      this.state = {
        displayName: "",
      };      
    }

    /* handleUpdate  = ( displayName) => {
      this.setState(
        {
          displayName: displayName,
        }
      )
    } */
     componentDidMount()
    {
      this.props.getUser();      
    }     

  render() {
     /* const auth = this.props.auth;
     */
    const auth = this.props.auth;
    if (!auth.uid) return  this.props.navigation.navigate ('Login');
    console.log("getting user id: ", auth.uid);
  
    const { user } = this.props ;
    console.log("getting user data: ", user )
    
   /*  const userData = user.map( item =>(
      item.uid === auth.uid
        ? <Text color="white" size={28} style={{ paddingBottom: 8 }}>{ item.displayName } </Text>
        : <Text color="white" size={28} style={{ paddingBottom: 8 }}> Error </Text>
      )
    ); */
   /*  userFn = () => {
      const {user} = this.props ;
      const authUser = user.filter(item => {
          return item.uid === auth.uid
      })
     if (authUser.length>1){
         return <Text>{authUser[0].displayName}</Text>
     }
     else return <Text>Error</Text>
    }
    console.log("getting user fn: ", userFn ) */

    /* const update = user
      ? <UserDetails style={styles.modal} handleUpdate={this.handleUpdate(this.state.displayName)} />
      : <UserDetails style={styles.modal} />; */

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: 'https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80'}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>

                  <Text color="white" size={28} style={{ paddingBottom: 8 }}>{ JSON.stringify(this.props.userR.data.displayName) }</Text>

                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">{ JSON.stringify(this.props.userR.data.role) }</Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>{auth.email}</Text>
                    <Text size={16} color={'#FF9800'}>
                      4.8 
                    </Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      
                      {`  `} Paris
                      </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>36</Text>
                <Text muted size={12}>Orders</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>5</Text>
                <Text muted size={12}>Bids & Offers</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>2</Text>
                <Text muted size={12}>Messages</Text>
              </Block>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Recently viewed</Text>
              <Text size={20} color={theme.COLORS.PRIMARY} onPress={
                () => { this.props.signOut() ; this.props.navigation.navigate ('Login', {})}
                }
              >Log Out</Text>
            </Block>
            <Block style={{ paddingBottom: -(theme.SIZES.BASE * 3.5 + ((StatusBar.currentHeight) || 0)) * 2 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }} >
                
                <UserDetails style={styles.modal} />
                  
              </Block>
            </Block>
            
          </ScrollView>
        </Block>
      </Block>
    ) ;
  }
}
const mapStateToProps = ( state ) => {
  console.log("state firebase",state);
  return{
    auth: state.firebase.auth,
    user: state.firestore.ordered.users,
    userR: state.userR,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getUser: () => dispatch(getUser())
  }
}

export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([
       { collection: 'users'},
   ]))(Profile)

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -(theme.SIZES.BASE * 3.5 + ((StatusBar.currentHeight) || 0)) : 0,
    marginBottom: -(theme.SIZES.BASE * 3.5 + ((StatusBar.currentHeight) || 0)) * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 1.5 ,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
    marginBottom: 20
  },
  pro: {
    backgroundColor: '#FE2472',
    paddingHorizontal: 1,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  pro2: {
    backgroundColor: '#FE2472',
    //paddingHorizontal: 10,
    //marginRight: theme.SIZES.BASE / 2,
    marginLeft: 300,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 0.5,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
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
  buttonTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
   modal: {
       alignSelf: 'center',
       color: 'lightseagreen',
       fontSize: 16,
       fontWeight: 'bold',
       padding: 20,
       position: 'absolute',
   },
});