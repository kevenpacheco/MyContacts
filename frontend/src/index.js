import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

fetch('http://localhost:3333/contacts', {
  method: 'GET',
  headers: new Headers({
    'X-App-Id': '123',
  }),
})
  .then((response) => console.log('response -> ', response))
  .catch((err) => console.log('err -> ', err));
