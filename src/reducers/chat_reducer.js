const initialState = {
    thread:  [
          {msg: "Hello first chat"}
]
}
const chatReducer = (state = initialState, action) => {
    
    if (action.type === "NEW_CHAT"){

      console.log("chatReducer : ", state)

       return Object.assign({}, state, {
           thread: [
               ...state.thread,
               {
                   id: new Date().getTime(),
                   msg: action.newChat
               }
           ]
       })
   }
   /*if (action.type === "DELETE_CHAT"){

        return state.filter((thread)=>thread.id !== action.id);
  
   }*/

   return state
}
export default chatReducer;
