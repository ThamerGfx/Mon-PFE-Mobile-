const initialState = {
    user:  [
          {
            nom: "Rachel",
            prenom: "Brown",
            address: "Paris"
          }
    ],
    data: {},
}
const userReducer = (state = initialState, action) => {
    
    if (action.type === "UPDATE_USER"){

      console.log("userReducer : ", state)

       return Object.assign({}, state, {
           user: [
               ...state.user,
               {
                   id: new Date().getTime(),
                   nom: action.nom,
                   prenom: action.prenom,
                   address: action.address,
               }
           ]
       })
   }

   if (action.type === "GET_USER"){

       return {
                ...state,
                data: action.payload
            };
    }

   return state
}
export default userReducer;
