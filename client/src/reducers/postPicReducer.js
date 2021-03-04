// import {
//     ADD_POSTPIC,
//     GET_POSTPIC,
//     // UPDATE_POSTPIC,
//     POSTPIC_LOADING,
//     GO_POSTPIC,
//     DELETE_POSTPIC
// } from '../actions/types';

// const initialState = {
//     files: [],
//     loading: false
// }

// export default function(state = initialState, action) {
//     switch(action.type) {
//         case GET_POSTPIC:
//             return {
//                 ...state,
//                 files: action.payload,
//                 loading: false
//             }
//         case DELETE_POSTPIC:
//             return {
//                 ...state,
//                 files: state.files.filter(file => file._id !== action.payload)
//             }
//         case ADD_POSTPIC:
//             return {
//                 ...state,
//                 files: [action.payload, ...state.files]
//             }
//         // case UPDATE_POSTPIC:
//         //     return {
//         //         ...state,
//         //         files: state.files.map(file => file._id !== action.payload._id ? file : action.payload )
//         //     }
//         case POSTPIC_LOADING:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case GO_POSTPIC:
//             return {
//                 ...state,
//                 files: []
//             }
//         default:
//             return state;
//     }
// }