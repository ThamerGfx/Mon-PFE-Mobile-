const initialState = {
    pointage:  [
          {
            prise: false,
            fin: false,
            uid: ""
          }
]
}
const pointageReducer = (state = initialState, action) => {
    
    if (action.type === "NEW_PRISEPOSTE"){

      console.log("pointageReducer : ", state)

       return Object.assign({}, state, {
           pointage: [
               ...state.pointage,
               {
                   id: new Date().getTime(),
                   prise: action.prise,
                   uid: action.uid
               }
           ]
       })
   }
   if (action.type === "NEW_FINPOSTE"){

      console.log("pointageReducer : ", state)

       return Object.assign({}, state, {
           pointage: [
               ...state.pointage,
               {
                   id: new Date().getTime(),
                   fin: action.fin,
                   uid: action.uid
               }
           ]
       })
   }

   return state
}
export default pointageReducer;