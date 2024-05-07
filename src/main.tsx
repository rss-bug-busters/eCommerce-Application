import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from '@services/router/router';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider
      fallbackElement={<h1>Loading....</h1>}
      router={router}
      future={{ v7_startTransition: true }}
    />
  </React.StrictMode>
);
