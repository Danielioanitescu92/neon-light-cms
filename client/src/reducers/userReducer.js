import {
    GET_USERS,
    DELETE_USERS,
    USERS_LOADING,
    GO_USERS,
    UPDATE_USER,
    ADD_USER,
    GET_THIS_USER
} from '../actions/types';

const initialState = {
    users: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_THIS_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case UPDATE_USER:
            return {
                ...state,
                users: 
                    state.users.results ?
                        {
                            ...state.users,
                            results: state.users.results.map(user => user._id !== action.payload._id ? user : action.payload )
                        }                        
                    : state.users.map(user => user._id !== action.payload._id ? user : action.payload )
            } 
        case DELETE_USERS:
            return {
                ...state,
                users: state.users.results ?
                    {
                        ...state.users,
                        results: state.users.results.filter(user => user._id !== action.payload)
                    }
                    : state.users.filter(user => user._id !== action.payload)
            }
        case ADD_USER:
            return {
                ...state,
                users: state.users.results ? 
                    {
                        ...state.users,
                        results: [ action.payload, ...state.users.results ]
                    }
                    : [action.payload, ...state.users]
            }   

        // for paginated(in /users)
        
        // case UPDATE_USER:
        //     return {
        //         ...state,
        //         users: state.users.results.map(user => user._id !== action.payload._id ? user : action.payload )
        //     }      
        // case DELETE_USERS:
        //     return {
        //         ...state,
        //         users: {
        //             ...state.users,
        //             results: state.users.results.filter(user => user._id !== action.payload)
        //         }
        //     }
        // case ADD_USER:
        //     return {
        //         ...state,
        //         users: {
        //             ...state.users,
        //             results: [
        //                 action.payload,
        //                 ...state.users.results
        //             ]
        //         }
        //     }


        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_USERS:
            return {
                ...state,
                users: []
            }
        default:
            return state;
    }
}