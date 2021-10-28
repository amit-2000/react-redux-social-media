import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import { profile } from './Profile';
import friends from './friends';
export default combineReducers({ posts, auth, profile, friends });
