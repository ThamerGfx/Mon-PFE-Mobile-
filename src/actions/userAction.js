import 'firebase/firestore'
import firebase from 'firebase/app'
import firestore from '../config/firebase_config'

const updateUser =(displayName)=>{

  return (dispatch)=>{
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        firebase.firestore().collection("users").doc(firebaseUser.uid)
        .update(
          {
            displayName: firebaseUser.displayName,
          }
          )
        .then(() =>{
          dispatch({
            type:'UPDATE_USER',  
          })  
          })
          .catch(function(error) {
            console.error("Error updating document: ", error);
        })
      }
    })
  }
}
const getUser =()=>{ 
  return (dispatch)=>{
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( doc => {
        
            const { displayName } = doc.data()
            const { role } = doc.data()
            console.log("display name in action: ",displayName)
            
            const currentUser = {
              displayName,
              role
            };
            dispatch({
              type:'GET_USER',
              payload: currentUser,
            });
          
        })
      }
    })
  }
}

export  {updateUser, getUser} ;
