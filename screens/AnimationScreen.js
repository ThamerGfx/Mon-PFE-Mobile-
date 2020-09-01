import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Image,
    Button,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import {FluidNavigator, Transition} from 'react-navigation-fluid-transitions';
import { Header, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
//import MapView from 'react-native-maps';
import firebase from 'firebase';
import { Constants, MapView } from 'expo';
import { Permissions, Notifications } from 'expo';

import getAnimations from "../src/actions/animationAction";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let arrTapBar = [{"key": "Chanel A12"}, {"key": "Dior A41"}, {"key": "LVH A45"}, {"key": "Dior A75"}, {"key": "Gucci A63"}]

export class AnimationScreen extends Component {

    // static router = Navigator.router;

    static navigationOptions = {
        header: null,
        drawerIcon: (
            <Image source={require('../assets/images/home.png')}
                style={{ height: 24, width: 24}} />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedTapBarIndex: 0,
        };

     }

     registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref('users/' + this.currentUser.uid + '/push_token')
        .set(token);
        console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

    scheduleNotification = async () => {
        let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
            title: "Aladinoo Notification",
            body: 'You have an animation to check!',
            },
            {
            repeat: 'minute',
            time: new Date().getTime() + 10000,
            },
        );
        console.log(notificationId);
    };
  async componentDidMount() {
    this.currentUser = await firebase.auth().currentUser;
    await this.registerForPushNotificationsAsync();
    await this.scheduleNotification();
    this.props.getAnimations();
  }
    
    /* componentDidMount() {
        this.props.getAnimations();
    }  */

    render() {
        const { animationsfb } = this.props
        console.log("firebase animation", animationsfb);
       /* if (!animationsfb) {
           return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
           )
       } */

       console.log("animR", JSON.stringify(this.props.animR.data.name)) ;

        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.navigationHeaderContainer}>
                    <TouchableHighlight onPress={() => this.props.navigation.openDrawer()}
                        style={{bottom: 10, position: 'absolute', left: 15,height:20,width:20,}} >
                        <Image style={{height:20,width:20,}}
                            source={require('../assets/images/ic_menu.png')}
                        />
                    </TouchableHighlight>
                    <Text style={{bottom: 15, position: 'absolute', right: 15,color: '#3842B0',}}>+ Create</Text>
                </View> 


                <ScrollView style={styles.mainContainer}>

                {/* Top Container ........ */}
                <View style={styles.topContainer}>

                    {/* <View style={styles.navigationHeaderContainer}>
                        <Image style={{bottom: 15, position: 'absolute', left: 15,height:20,width:20,}}
                               source={require('../assets/images/ic_menu.png')}/>
                        <Text style={{bottom: 15, position: 'absolute', right: 15,color: '#3842B0',}}>+ Create</Text>
                    </View> */}


                    {/* User Image ........ */}
                    <Image style={styles.userImageContainer}
                           source={{uri: 'https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80'}}/>

                    <Text style={{marginLeft: 15, marginTop: 8, color: '#6471F4'}}>
                        Hello,{"\n"}Rachel Brown
                    </Text>

                    <Text style={{
                        marginLeft: 15,
                        marginRight: 15,
                        marginTop: 30,
                        color: '#3842B0',
                        fontSize: 40,
                        fontWeight: 'bold'
                    }}>
                        Choose your Animation
                    </Text>


                    {/* Search View Container ........ */}
                    <View style={styles.topSearchContainer}>
                        <Image style={{
                            marginLeft: 5,
                            width: scaleToDimension(40),
                            backgroundColor: 'transparent',
                            height: scaleToDimension(40),
                            resizeMode: 'center'
                        }}
                               source={require('../assets/images/magnifying-glass-icon.png')}/>
                        <TextInput style={{flex: 1, marginLeft: 5, marginRight: 10, color : "#3842B0"}} placeholder={'Search'} placeholderTextColor='#3842B0' />
                    </View>


                </View>

                {/* Bottom Container ........ */}
                <View style={styles.bottomContainer}>

                    {/* Tab bar View........ */}
                    {/* <View style={styles.bottomTabBarContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={arrTapBar}
                            extraData={this.state}
                            renderItem={({item, index}) => this.renderTapBarItem(item, index)}
                        />
                    </View> */}

                    {/* Grid View........ */}
                    <View style={styles.bottomGridContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            onPress
                            horizontal={true}
                            data={animationsfb}
                            renderItem={({item, index}) => this.renderGridItem(item, index)}
                            keyExtractor={(item, index) => index.toString()} 
                        />
                    </View>


                </View>

            </ScrollView>
            </SafeAreaView>
        );
    }

    /* renderTapBarItem(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {selectedTapBarIndex: index};
                    });
                }}>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={
                        {
                            marginLeft: 10,
                            marginRight: 10,
                            color: '#6471F4',
                            fontSize: 15, //this.state.selectedTapBarIndex == index ? 20 : 15,
                            fontWeight: this.state.selectedTapBarIndex == index ? 'bold' : 'normal',
                        }}>
                        {item['key']}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    } */

    renderGridItem(item, index) {
        return (
            <TouchableOpacity
                activeOpacity = {1}
                onPress={(event) => {
                    this.props.navigation.navigate('homeDetails', {item: item['name']})
                }}>
               
                <Transition shared={item['name']}>
                    <View style={styles.bottomGridItemContainer}>
                        <Image
                            source={require('../assets/images/chanel2.jpg')}
                            fadeDuration={0}
                            style={{width: screenWidth * 300 / 375,
                                height: screenHeight / 2 - 70,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 15}}
                        />
                        <Text style={{
                            marginLeft: 15,
                            marginRight: 10,
                            position: 'absolute',
                            bottom: 20,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 35,
                        }}>{item['name']}</Text>
                         
                    </View>
                </Transition>
            </TouchableOpacity>
        );
    }

}

const mapStateToProps = (state) => {
    console.log("state firebase animation",state);
 return {
   animationsfb: state.firestore.ordered.animations,
   animR: state.animR
 }
}

const AnimationScreenConnected = compose(
   connect(mapStateToProps, { getAnimations }),
   firestoreConnect([
       { collection: 'animations'},
   ]))(AnimationScreen);

class DetailsScreen extends React.Component {

    render() {
        const {navigation} = this.props;
        const item = navigation.getParam('item', '');

        const { animationsfb } = this.props
        console.log("firebase animationdetail", animationsfb);
        console.log("lieu", animationsfb[0].lieu);
        /* const mapRegion: {
            latitude: {animationsfb[0].latitude},
            longitude: {animationsfb[0].longitude},
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        } 
        
        region={this.mapRegion} // to put on Mapview
        */

        return (

            <SafeAreaView style={styles.DetailMainContainer}>
                <Transition shared={item}>
                    <View style={styles.detailTopContainer}>
                        <View style={styles.navigationHeaderContainer}>

                            <TouchableOpacity style={{bottom: 5, position: 'absolute', left: 15,height:20,width:20,}}
                                onPress={(event) => {
                                    navigation.goBack()
                                }}>

                            <Image style={{height:20, width:20}}
                                   source={require('../assets/images/ic_back.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{bottom: 5, position: 'absolute', right: 15,height:20,width:20,}}
                                onPress={(event) => {
                                    navigation.navigate ('Location')
                                }}>
                                <Image style={{height:25, width:25}}
                                   source={require('../assets/images/presence.jpg')}/>
                             </TouchableOpacity>
                        </View>

                        <View style={styles.detailTopBottomSubContainer}>
                            <Image
                                source={require('../assets/images/chanel2.jpg')}
                                fadeDuration={0}
                                style={{bottom: 10, width: screenWidth - 10, height: scaleToDimension(170) ,
                                    justifyContent: 'flex-start', position: 'absolute', marginTop: 30, marginRight: 20,
                                 }}
                            />
                            <Text style={{
                                bottom: 10,
                                color: 'white',
                                fontWeight: 'bold',
                                position: 'absolute',
                                fontSize: scaleToDimension(35),
                            }}>{item}</Text>
                            <Text style={{bottom: 15, color: 'white', position: 'absolute', fontSize: scaleToDimension(15),}}></Text>
                        </View>
                    </View>
                </Transition>

                <View style={styles.detailListCellContainer}>
                    <View style={styles.detailListCellContentViewContainer}>

                        <MapView
                            style={{ alignSelf: 'stretch', height: 200 }}
                            
                        />

                        <View style={styles.detailListCellContentViewBottomContainer}>
                            <Text style={{
                                color: '#2540a9',
                                marginLeft: 15,
                                marginTop: 15,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>{item}</Text>

                            <View style={{
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                marginLeft: 15,
                                marginTop: 12
                            }}>
                                <Text style={{color: '#2540a9', fontSize: 15}}>20/6/2019</Text>
                                <Text style={{color: '#2540a9', marginLeft: 20, fontSize: 15}}>{animationsfb[0].lieu}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={arrTapBar}
                    renderItem={({item, index}) => this.renderDetailListCell(item, index)}
                />


            </SafeAreaView>
        );
    }

    renderDetailListCell(item, index) {

        return (
            <TouchableOpacity
                activeOpacity = {1}
            >
                <View style={styles.detailListCellContainer}>
                    <View style={index == arrTapBar.length - 1 ? styles.detailListCellLastIndexContentViewContainer : styles.detailListCellContentViewContainer}>

                        <View style={styles.detailListCellContentViewBottomContainer}>
                            <Text style={{
                                color: '#2540a9',
                                marginLeft: 15,
                                marginTop: 15,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Animation</Text>

                            <View style={{
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                marginLeft: 15,
                                marginTop: 12
                            }}>
                                <Text style={{color: '#2540a9', fontSize: 15}}>20/6/2019</Text>
                                <Text style={{color: '#2540a9', marginLeft: 20, fontSize: 15}}>Addresse</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

const DetailsScreenConnected = compose(
   connect(mapStateToProps),
   firestoreConnect([
       { collection: 'animations'},
   ]))(DetailsScreen);

const Navigator = FluidNavigator({

        home: {screen: AnimationScreenConnected},
        homeDetails: {screen: DetailsScreenConnected},
},
);

class HomeTransitions extends React.Component {
    static router = Navigator.router;


    render() {
        const {navigation} = this.props;

        return (
            <Navigator navigation={navigation}/>
        );
    }
}


const scaleToDimension = (size) => {
    return screenWidth * size / 375
};


// All Styles related to design...
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    topContainer: {
        backgroundColor: 'white'

    },
    navigationHeaderContainer: {
        height: Header.HEIGHT,
        width: screenWidth,
        color: "blue",
        justifyContent: 'center',
    },
    userImageContainer: {
        marginLeft: 15,
        marginTop: 5,
        height: screenWidth * 50 / 375,
        width: screenWidth * 50 / 375,
        backgroundColor: 'lightgrey',
        borderRadius: (screenWidth * 50 / 375) / 2,
    },
    topSearchContainer: {
        height: screenWidth * 40 / 375,
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10,
        width: screenWidth - 30,
        backgroundColor: '#D2D7F3',
        flexDirection: 'row',
        borderRadius: 3,
    },
    bottomContainer: {
        alignItems: 'center',
        // height: screenHeight/2,
        backgroundColor: 'transparent'
    },
    bottomTabBarContainer: {
        height: 50.0,
        width: screenWidth,
        backgroundColor: 'transparent',
        flexDirection: 'column'
    },
    bottomGridContainer: {
        marginLeft: 5,
        width: screenWidth,
        height: screenHeight / 2 - 50,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bottomGridItemContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        width: screenWidth * 300 / 375,
        height: screenHeight / 2 - 70,
        backgroundColor: '#5677f1',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 15
    },
    detailsHeader: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FA',
    },
    DetailMainContainer: {
        flex: 1,
    },
    detailTopContainer: {
        height: scaleToDimension(250),
        width: screenWidth,
        backgroundColor: '#5677f1',
    },
    detailTopBottomSubContainer: {
        width: screenWidth - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
    },
    detailListCellContainer: {
        flex: 0,
        width: screenWidth,
        height: screenWidth,
        backgroundColor: 'transparent',
        paddingTop: 10,
        paddingBottom: 10,
    },
    detailListCellContentViewContainer: {
        width: screenWidth - 20,
        height: screenWidth - 10,
        backgroundColor: '#5677f1',
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    detailListCellLastIndexContentViewContainer: {
        width: screenWidth - 20,
        height: screenWidth - 20,
        backgroundColor: '#5677f1',
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,

    },
    detailListCellContentViewBottomContainer: {
        width: screenWidth - 22,
        minHeight: scaleToDimension(70),
        backgroundColor: 'white',
        position: 'absolute',
        paddingBottom: 15,
        bottom: 1,
        marginLeft: 1,
        marginRight: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});


export default HomeTransitions