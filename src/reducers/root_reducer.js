import { combineReducers } from 'redux';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import chatReducer from './chat_reducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import pointageReducer from './pointageReducer'
import venteReducer from './venteReducer'
import animationReducer from './animationReducer'

const rootReducer = combineReducers({
   chatReducer,
   userR: userReducer,
   animR: animationReducer,
   pointageReducer,
   venteP: venteReducer,
   auth: authReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer
});

export default rootReducer;
