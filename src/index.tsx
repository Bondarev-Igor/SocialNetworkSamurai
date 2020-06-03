import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Elena'},
    {id: 3, name: 'Pavel'},
    {id: 4, name: 'Victor'},
    {id: 5, name: 'Valera'}
];

let messages = [
    {id: 1, message: 'Ku'},
    {id: 2, message: 'Hi'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Waz'},
    {id: 5, message: 'Zzz'}
];

let posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 4},
    {id: 2, message: "It's my first post", likesCount: 9}
];

ReactDOM.render(  <App
                      dialogs={dialogs}
                      messages={messages}
                      posts={posts}/>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
