import 'firebase/firestore'
import firebase from 'firebase/app'
import firestore from '../config/firebase_config'

 const getAnimations =()=>{ 
  return (dispatch)=>{
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        firebase.firestore().collection("animations").doc(firebaseUser.uid).get().then( doc => {
        
            const { name } = doc.data()
            const { lieu } = doc.data()
            const { description } = doc.data()
            const { authorName } = doc.data()
            console.log("animation name in action: ",name)
            
            const animationsByUid = {
              name,
              lieu,
              description,
              authorName
            };
            dispatch({
              type:'GET_ANIMATION',
              payload: animationsByUid,
            });
          
        })
      }
    })
  }
}
export default getAnimations