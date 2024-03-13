import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

fetch('http://localhost:3333/contacts')
  .then(async (response) => {
    const json = await response.json();
    console.log('response -> ', response);
    console.log('json -> ', json);
  })
  .catch((err) => console.log('err -> ', err));
