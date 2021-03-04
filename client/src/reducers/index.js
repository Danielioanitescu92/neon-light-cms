import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import replyReducer from './replyReducer';
import userReducer from './userReducer';
import subReducer from './subReducer';
import ppReducer from './ppReducer';
import tcReducer from './tcReducer';
import fileReducer from './fileReducer';
import aboutReducer from './aboutReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    comment: commentReducer,
    reply: replyReducer,
    user: userReducer,
    sub: subReducer,
    privpol: ppReducer,
    termscons: tcReducer,
    file: fileReducer,
    about: aboutReducer
});