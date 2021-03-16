import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export function shortenPos (pos) {
    // truncate pos to 4 decimal digits aka "individual street, large buildings"
    const spos = pos.toString().replace(/^(.*)\.(....).*/, "$1.$2");
    console.log("shortpos:", pos, spos);
    return spos;
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
