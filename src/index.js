import React from 'react';
import ReactDOM from 'react-dom';

// import Login from './Login';
import Quiz from './Quiz';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Quiz />, document.getElementById('root'));

// Uses Service Worker
serviceWorker.unregister();
