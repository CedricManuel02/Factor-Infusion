import { reducerCases } from "./Constants"

export const initialState = {
    user: [],
    token: null,
}
const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_USER : {
            return {
                ...state,
                user: action.user,
                token: action.token
            }
        }
        default: 
        return state
    }
}

export default reducer