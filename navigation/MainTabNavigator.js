import React from 'react';
import { Platform, View, SafeAreaView, Button, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import {DrawerItems} from 'react-navigation';
import { connect } from 'react-redux'
import firebase from 'firebase';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Welcome2Screen from '../screens/Welcome2Screen';
import ProfileScreen from '../screens/ProfileScreen';
import SignatureScreen from '../screens/SignatureScreen'; 
import PresenceScreen from '../screens/PresenceScreen'; 
import LocationScreen from '../screens/LocationScreen'; 
import AnimationScreen from '../screens/AnimationScreen'; 
import TimeLineScreen from '../screens/TimeLineScreen'; 
import VenteScreen from '../src/components/VenteScreen'; 

//import logout from '../src/components/logout'; 
import { signOut } from '../src/actions/authActions'

/*const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};*/

const WelcomeStack = createStackNavigator({
  Welcome: WelcomeScreen,
});

WelcomeStack.navigationOptions = {
  tabBarLabel: 'Welcome',
  tabBarVisible: false,
  visible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const Welcome2Stack = createStackNavigator({
  Welcome2: Welcome2Screen,
});

Welcome2Stack.navigationOptions = {
  tabBarLabel: 'Welcome2',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AnimationStack = createStackNavigator({
  Animations: AnimationScreen,
},
{
    defaultNavigationOptions: {
      header: null
    },
});

AnimationStack.navigationOptions = {
  tabBarLabel: 'Animations',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
  drawerIcon: (
    <Image source={require('../assets/images/home.png')}
        style={{ height: 24, width: 24}} />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
},
{
    defaultNavigationOptions: {
      header: null
    },
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SignatureStack = createStackNavigator({
  Signature: SignatureScreen,
});

SignatureStack.navigationOptions = {
  tabBarLabel: 'Signature',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-close-circle'}
    />
  ),
};

const PresenceStack = createStackNavigator({
  Presence: PresenceScreen,
});

PresenceStack.navigationOptions = {
  tabBarLabel: 'Presence',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
    />
  ),
};

const LocationStack = createStackNavigator({
  Location: LocationScreen,
},
{
    defaultNavigationOptions: {
      header: null
    },
});

LocationStack.navigationOptions = {
  tabBarLabel: 'Location',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-location' : 'md-location'}
    />
  ),
};

const VenteStack = createStackNavigator({
  Vente: VenteScreen,
  }
  );

VenteStack.navigationOptions = {
  tabBarLabel: 'Vente',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-price' : 'md-price'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  },
  
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Chat',
  title: 'Chat Screen',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-chatboxes'}
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
},
{
    defaultNavigationOptions: {
      tabBarVisible: false,
      visible: false,
    },
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  drawerLabel: () => null,
  tabBarVisible: false,
  visible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-log-in'}
    />
  ),
};

const AppBottomTabNavigator = createBottomTabNavigator({
  //Home: {screen: WelcomeScreen},
  ProfileStack,
  SignatureStack,
  SettingsStack,
  TimeLine: {screen: TimeLineScreen},
  SignatureStack,
  LocationStack
  //Login: {screen: LoginStack},
  //Logout: {screen: logout},
},
/* {
    navigationOptions: ({ navigation }) => {
      
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      
    }
  } */);

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(createDrawerNavigator({
  //WelcomeStack,
  Animations: {screen: AnimationScreen},
  //ProfileStack,
  //SignatureStack,
  Presence: {screen: PresenceScreen},
  // Location: {screen: LocationScreen},
  Vente: {screen: VenteStack},
  Profile: {screen: AppBottomTabNavigator},
  //LoginStack,
  
},
{
  contentComponent:(props) => (
    <View style={{flex:1}}>
      <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../assets/images/logo.png')} style={{ height: 120, width: 120, borderRaduis: 60}}/>
      </View>
        <SafeAreaView forceInset={{ horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button title="Logout" onPress={ () => firebase.auth().signOut() }/>
            {/* { signOut(); this.props.navigation.navigate ('Login', {}) } */}
        </SafeAreaView>
    </View>
  ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
}
));
