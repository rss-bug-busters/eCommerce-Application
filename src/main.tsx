import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@services/router/router';
import './tailwindcss.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        fallbackElement={<h1>Loading....</h1>}
        router={router}
        future={{ v7_startTransition: true }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
