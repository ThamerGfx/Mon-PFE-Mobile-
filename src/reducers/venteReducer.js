const initialState = {
    pointage:  [
          {
            produit: '', 
            quantity: '', 
            prix: '',
            uid: ""
          }
    ],
    data: {},
}
const venteReducer = (state = initialState, action) => {
    
    if (action.type === "NEW_VENTE"){

      console.log("venteReducer : ", state)

       return Object.assign({}, state, {
           ventes: [
               ...state.ventes,
               {
                   id: new Date().getTime(),
                   produit: action.produit,
                   quantity: action.quantity,
                   prix: action.prix,
                   uid: action.uid
               }
           ]
       })
   }

   if (action.type === "GET_PRODUIT"){

       return {
            ...state,
            data: action.payload
        };
        console.log("get produit data in store: ", data);
    }

   return state
}
export default venteReducer;