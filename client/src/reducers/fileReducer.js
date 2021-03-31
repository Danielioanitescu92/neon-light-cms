import {
    ADD_USER_FILE,
    ADD_POST_FILE,
    FILE_LOADING,
    AVATAR_FILES_LOADING,
    GO_FILE,
    DELETE_FILE,
    GET_ITEMS_FILES,
    GET_AVATARS_FILE,
    GO_ITEMS_FILE,
    GO_AVATARS_FILE,
    DELETE_ITEM_FILE,
    DELETE_AVATAR_FILE
} from '../actions/types';

const initialState = {
    files: {
        items: [],
        avatars: []
    },
    loadingIt: false,
    loadingAv: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS_FILES:
            return {
                ...state,
                files: {
                    ...state.files,
                    items: 
                        state.files.items.some((element) => element.filename === action.payload[0].filename) ? 
                            [ ...state.files.items ]
                        : [ ...state.files.items, action.payload[0] ]
                },
                loadingIt: false
            }
        case GET_AVATARS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars: 
                        state.files.avatars.some((element) => element.filename === action.payload[0].filename) ? 
                            [ ...state.files.avatars ]
                        : [ ...state.files.avatars, action.payload[0] ]
                },
                loadingAv: false
            }
        case ADD_POST_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    items:  [action.payload, ...state.files.items]
                },
                loadingIt: false
            }
        case ADD_USER_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars:  [action.payload, ...state.files.avatars]
                },
                loadingAv: false
            }
        case DELETE_FILE:
            return {
                ...state,
                files: state.files.filter(file => file._id !== action.payload)
            }
        case DELETE_AVATAR_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars: state.files.avatars.filter(file => file.filename !== action.payload)
                }
            }
        case DELETE_ITEM_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    items: state.files.items.filter(file => file._id !== action.payload)
                }
            }
        case GO_FILE:
            return {
                ...state,
                files: []
            }
        case GO_ITEMS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    items: []
                }
            }
        case GO_AVATARS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars: []
                }
            }
        case FILE_LOADING:
            return {
                ...state,
                loadingIt: true
            }
        case AVATAR_FILES_LOADING:
            return {
                ...state,
                loadingAv: true
            }
        default:
            return state;
    }
}