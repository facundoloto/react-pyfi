import { QueryClientProvider } from "@tanstack/react-query";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import queryClient from "./queryClient";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="50267413552-rsjitt751am63fv5spm5i1j0eis69e4t.apps.googleusercontent.com">
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
  ,
)
