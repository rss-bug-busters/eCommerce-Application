import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { hashRouter } from '@services/router/router';
import './tailwindcss.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider
      fallbackElement={<h1>Loading....</h1>}
      router={hashRouter}
      future={{ v7_startTransition: true }}
    />
  </React.StrictMode>
);
