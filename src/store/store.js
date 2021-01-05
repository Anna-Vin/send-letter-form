import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import formReducer from '../reducers/form.reducer';

const initialState = {
  form: formReducer
};

const rootReducer = combineReducers(initialState)

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
