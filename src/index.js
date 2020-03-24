import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import Reducers from './redux/reducers/index'
import ReduxThunk  from 'redux-thunk'


const isStore=createStore(Reducers, {} , applyMiddleware(ReduxThunk))

ReactDOM.render(    
        <Provider store={isStore}>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
        </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
