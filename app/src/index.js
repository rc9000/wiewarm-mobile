import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export function shortenPos (pos) {
    const spos = pos.toString().replace(/^(.*)\.(....).*/, "$1.$2");
    console.log("shortpos:", pos, spos);
    return spos;
};

export function randomArrayIndex (arr) {
    const max = arr.length;
    return Math.floor(Math.random() * Math.floor(max));
};


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
