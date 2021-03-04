import {
    GET_COMMENTS,
    ADD_COMMENTS,
    DELETE_COMMENTS,
    COMMENTS_LOADING,
    GO_COMMENTS,
    GET_THIS_COMMS
} from '../actions/types';

const initialState = {
    comments: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }        
        case GET_THIS_COMMS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        case DELETE_COMMENTS:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        case ADD_COMMENTS:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        case COMMENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_COMMENTS:
            return {
                ...state,
                comments: []
            }
        default:
            return state;
    }
}