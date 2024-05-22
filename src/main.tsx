import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@services/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './tailwindcss.css';
import Loader from '@components/ui/Loader/Loader';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        fallbackElement={<Loader />}
        router={router}
        future={{ v7_startTransition: true }}
      />
    </QueryClientProvider>
    <ToastContainer
      stacked
      position="top-center"
      autoClose={1000}
      limit={2}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
  </React.StrictMode>
);
