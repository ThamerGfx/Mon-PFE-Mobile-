import 'firebase/firestore'
import firebase from 'firebase/app'
import firestore from '../config/firebase_config'

const addChat = (newChat) => {

   return (dispatch, getState, getFirestore ) => {
        //firestore.firestore().collection('chat').doc(id).delete();
        const idChat = firestore.firestore().collection("chat").doc().id; 
        firestore.firestore().collection("chat").doc(idChat).set({ 
          msg: newChat,  
          id: idChat,
        }) 
           .then(() => {
               console.log("chat action en action: ", newChat);
               dispatch({
                   type: "NEW_CHAT",
                   newChat
               })
           })
   }
}
 const deleteChat = (id) => {

    return (dispatch, getState,  getFirestore  ) => {

        firestore.firestore().collection('chat').doc(id).delete()
            .then(() => {
                dispatch({
                    type: "DELETE_CHAT",
                    id
                })
            })
}
}
const updateChat =(newChat)=>{ 

  return (dispatch)=>{    
    console.log("trying to update: ", newChat);
    console.log("trying to update and getting the id: ", newChat.id);
    firestore.firestore().collection("chat").doc(newChat.id)
     .update(
       {
         msg: newChat.chatInput,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_CHAT',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}
export {addChat, deleteChat, updateChat};
