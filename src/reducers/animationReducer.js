const initialState = {
    data: {},
}

const animationReducer = (state = initialState, action) => {

   if (action.type === "GET_ANIMATION"){

       return {
            ...state,
            data: action.payload
        };
    }

   return state
}
export default animationReducer;