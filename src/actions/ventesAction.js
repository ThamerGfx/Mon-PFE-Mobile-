import 'firebase/firestore'
import firebase from 'firebase/app'
import firestore from '../config/firebase_config'

const addVente = (produit, quantity, prix, uid) => {

   return (dispatch, getState, getFirestore ) => {
    const idVente = firestore.firestore().collection("ventes").doc().id; 
    firestore.firestore().collection("ventes").doc(idVente).set({ 
      produit: produit,
      quantity: quantity,
      prix: prix,
      id: idVente,
      uid: uid,
      DateVentes: new Date()
    }) 
      .then(() => {
        console.log("vente action en action: ", newChat);
        dispatch({
          type: "NEW_VENTE",
          produit, 
          quantity, 
          prix,
          uid
        })
      })
   }
}

const getProducts = () => {
  return (dispatch) => {
    
    firestore.firestore().collection("produits").doc().get().then(doc => {
      const {nom_prod} = doc.data();
      console.log("getting produits from action: ", nom_prod);
      dispatch({
        type: 'GET_PRODUIT',
        payload: nom_prod
      });
    })
      
  }
};

export {addVente, getProducts};