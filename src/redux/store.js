import {createStore, combineReducers,  compose} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import { userDetails } from './reducers';

const store = createStore(
    combineReducers({
        userDetails,
        form: reduxFormReducer
    }),
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
