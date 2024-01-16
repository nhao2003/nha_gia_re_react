import React from 'react';
import ReactDOM from 'react-dom/client';
import './templates/classic/assets/styles/index.css';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './stores/store';
import ClassicApp from './templates/classic/index.';
import ModernApp from './templates/modern/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<ModernApp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
