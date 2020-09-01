import 'firebase/firestore'
import firebase from 'firebase/app'
import firestore from '../config/firebase_config'

const prisePoste = (prise, uid) => {

   return (dispatch, getState, getFirestore ) => {
        const idPointage = firestore.firestore().collection("pointage").doc().id; 
        firestore.firestore().collection("pointage").doc(idPointage).set({ 
          prise: prise,  
          id: idPointage,
          uid: uid,
          DatePrise: new Date()
        }) 
           .then(() => {
               console.log("prise action en action: ", prise);
               dispatch({
                   type: "NEW_PRISEPOSTE",
                   prise,
                   uid
               })
           })
   }
}

const finPoste = (fin, uid) => {

   return (dispatch, getState, getFirestore ) => {
        const idPointage = firestore.firestore().collection("pointage").doc().id; 
        firestore.firestore().collection("pointage").doc(idPointage).set({ 
          fin: fin,  
          id: idPointage,
          uid: uid,
          DateFin: new Date()
        }) 
           .then(() => {
               console.log("fin de poste action en action: ", fin);
               dispatch({
                   type: "NEW_FINPOSTE",
                   fin,
                   uid
               })
           })
   }
}

export {prisePoste, finPoste};